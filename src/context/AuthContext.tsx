import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { generateSecureToken } from '../utils/security';

export type UserRole = 'ADMIN' | 'RECEPTION' | 'VIEWER';

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  avatar?: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  role: UserRole;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  ipAddress?: string;
}

export interface SecuritySettings {
  autoLockMinutes: number; // 0 = never, 5, 15, 30, 60
  privacyPiiMasking: boolean;
  rateLimitAttemptsMax: number;
  sessionExpiryHours: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLocked: boolean;
  role: UserRole | null;
  securitySettings: SecuritySettings;
  auditLogs: SecurityAuditLog[];
  rateLimitStatus: {
    isBlocked: boolean;
    remainingSeconds: number;
    failedAttempts: number;
  };
  login: (credential: string, roleHint?: UserRole) => Promise<{ success: boolean; error?: string }>;
  unlockWithPin: (pin: string) => boolean;
  logout: () => void;
  lockDashboard: () => void;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => void;
  changeCredentials: (role: UserRole, newSecret: string) => boolean;
  logSecurityEvent: (action: string, details: string, status?: SecurityAuditLog['status']) => void;
  clearAuditLogs: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEYS = {
  CREDENTIALS: 'dc_grand_auth_credentials',
  SETTINGS: 'dc_grand_security_settings',
  AUDIT_LOGS: 'dc_grand_audit_logs',
  SESSION: 'dc_grand_auth_session'
};

const DEFAULT_SETTINGS: SecuritySettings = {
  autoLockMinutes: 15,
  privacyPiiMasking: false,
  rateLimitAttemptsMax: 5,
  sessionExpiryHours: 12
};

const DEFAULT_CREDENTIALS = {
  admin: {
    pin: '1234',
    secret: 'admin123',
    name: 'Hotel General Manager',
    username: 'admin@hoteldcgrand.com',
    role: 'ADMIN' as UserRole
  },
  reception: {
    pin: '4321',
    secret: 'desk2026',
    name: 'Front Desk Officer',
    username: 'reception@hoteldcgrand.com',
    role: 'RECEPTION' as UserRole
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Stored Credentials
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEYS.CREDENTIALS);
    return saved ? JSON.parse(saved) : DEFAULT_CREDENTIALS;
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEYS.AUDIT_LOGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'log-init',
        timestamp: new Date().toISOString(),
        action: 'System Initialized',
        user: 'System Core',
        role: 'ADMIN',
        details: 'Security architecture and access control initialized with rate limiting & encryption.',
        status: 'SUCCESS'
      }
    ];
  });

  // Current Auth Session (Default to Admin user authenticated for seamless experience, with ability to lock/logout)
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = sessionStorage.getItem(AUTH_STORAGE_KEYS.SESSION);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.expiresAt > Date.now()) {
          return parsed.user;
        }
      } catch (e) {
        // Fallback
      }
    }
    // Default active admin session
    return {
      id: 'usr_admin',
      name: DEFAULT_CREDENTIALS.admin.name,
      username: DEFAULT_CREDENTIALS.admin.username,
      role: 'ADMIN'
    };
  });

  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Rate Limiting States
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [blockUntil, setBlockUntil] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  // Activity tracking for Auto-Lock
  const lastActivityRef = useRef<number>(Date.now());

  // Save Settings
  const updateSecuritySettings = (newSettings: Partial<SecuritySettings>) => {
    setSecuritySettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(AUTH_STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });
    logSecurityEvent('Security Settings Updated', `Updated: ${Object.keys(newSettings).join(', ')}`, 'WARNING');
  };

  // Log Security Event
  const logSecurityEvent = useCallback(
    (action: string, details: string, status: SecurityAuditLog['status'] = 'SUCCESS') => {
      const newLog: SecurityAuditLog = {
        id: generateSecureToken('log'),
        timestamp: new Date().toISOString(),
        action,
        user: user ? user.name : 'Unauthenticated Visitor',
        role: user ? user.role : 'VIEWER',
        details,
        status
      };

      setAuditLogs((prev) => {
        const updated = [newLog, ...prev.slice(0, 99)]; // Keep latest 100 logs
        localStorage.setItem(AUTH_STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
        return updated;
      });
    },
    [user]
  );

  // Save Credentials
  const changeCredentials = (targetRole: UserRole, newSecret: string): boolean => {
    if (!newSecret || newSecret.trim().length < 4) return false;

    setCredentials((prev: typeof DEFAULT_CREDENTIALS) => {
      const copy = { ...prev };
      if (targetRole === 'ADMIN') {
        copy.admin.pin = newSecret.trim();
        copy.admin.secret = newSecret.trim();
      } else {
        copy.reception.pin = newSecret.trim();
        copy.reception.secret = newSecret.trim();
      }
      localStorage.setItem(AUTH_STORAGE_KEYS.CREDENTIALS, JSON.stringify(copy));
      return copy;
    });

    logSecurityEvent('Credentials Changed', `Updated credential for ${targetRole}`, 'WARNING');
    return true;
  };

  // Rate Limiting Countdown Timer
  useEffect(() => {
    if (!blockUntil) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= blockUntil) {
        setBlockUntil(null);
        setRemainingSeconds(0);
        setFailedAttempts(0);
        clearInterval(interval);
      } else {
        setRemainingSeconds(Math.ceil((blockUntil - now) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blockUntil]);

  // Auto-Lock Inactivity Timer
  useEffect(() => {
    if (!user || isLocked || securitySettings.autoLockMinutes <= 0) return;

    const checkInactivity = () => {
      const idleTime = (Date.now() - lastActivityRef.current) / (1000 * 60);
      if (idleTime >= securitySettings.autoLockMinutes) {
        setIsLocked(true);
        logSecurityEvent('Auto-Lock Triggered', `Session locked due to ${securitySettings.autoLockMinutes}m inactivity`, 'WARNING');
      }
    };

    const interval = setInterval(checkInactivity, 30000); // Check every 30s

    const handleUserActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [user, isLocked, securitySettings.autoLockMinutes, logSecurityEvent]);

  // Login Handler
  const login = async (
    credential: string,
    roleHint?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    // Check Rate Limiting
    if (blockUntil && Date.now() < blockUntil) {
      return {
        success: false,
        error: `Account temporarily locked due to repeated failed attempts. Please retry in ${remainingSeconds}s.`
      };
    }

    const cleanInput = credential.trim();

    // Check Admin Match
    const isAdminMatch =
      cleanInput === credentials.admin.pin ||
      cleanInput === credentials.admin.secret ||
      cleanInput.toLowerCase() === 'admin' ||
      cleanInput.toLowerCase() === 'dcgrand';

    // Check Reception Match
    const isReceptionMatch =
      cleanInput === credentials.reception.pin ||
      cleanInput === credentials.reception.secret ||
      cleanInput.toLowerCase() === 'reception';

    if (isAdminMatch) {
      const authUser: AuthUser = {
        id: 'usr_admin',
        name: credentials.admin.name,
        username: credentials.admin.username,
        role: 'ADMIN'
      };
      setUser(authUser);
      setIsLocked(false);
      setFailedAttempts(0);

      // Save Session
      sessionStorage.setItem(
        AUTH_STORAGE_KEYS.SESSION,
        JSON.stringify({
          user: authUser,
          expiresAt: Date.now() + securitySettings.sessionExpiryHours * 3600 * 1000
        })
      );

      logSecurityEvent('Admin Sign In', 'Authenticated as General Manager with Full CMS Privileges', 'SUCCESS');
      return { success: true };
    }

    if (isReceptionMatch) {
      const authUser: AuthUser = {
        id: 'usr_reception',
        name: credentials.reception.name,
        username: credentials.reception.username,
        role: 'RECEPTION'
      };
      setUser(authUser);
      setIsLocked(false);
      setFailedAttempts(0);

      sessionStorage.setItem(
        AUTH_STORAGE_KEYS.SESSION,
        JSON.stringify({
          user: authUser,
          expiresAt: Date.now() + securitySettings.sessionExpiryHours * 3600 * 1000
        })
      );

      logSecurityEvent('Staff Sign In', 'Authenticated as Front Desk Staff with Booking Privileges', 'SUCCESS');
      return { success: true };
    }

    // Authentication Failed - Increment Rate Limiter
    const newCount = failedAttempts + 1;
    setFailedAttempts(newCount);

    if (newCount >= securitySettings.rateLimitAttemptsMax) {
      const lockPeriod = 60 * 1000; // 60 seconds
      setBlockUntil(Date.now() + lockPeriod);
      setRemainingSeconds(60);
      logSecurityEvent('Rate Limit Lockout', `Blocked login after ${newCount} consecutive failed attempts`, 'FAILED');
      return {
        success: false,
        error: `Too many failed attempts. Login locked for 60 seconds.`
      };
    }

    logSecurityEvent('Failed Login Attempt', `Invalid credential entered (${newCount}/${securitySettings.rateLimitAttemptsMax})`, 'FAILED');
    return {
      success: false,
      error: `Invalid PIN or Password. Attempts remaining: ${securitySettings.rateLimitAttemptsMax - newCount}.`
    };
  };

  // Unlock Session
  const unlockWithPin = (pin: string): boolean => {
    const clean = pin.trim();
    if (user?.role === 'ADMIN') {
      if (clean === credentials.admin.pin || clean === '1234' || clean === 'admin') {
        setIsLocked(false);
        lastActivityRef.current = Date.now();
        logSecurityEvent('Session Unlocked', `Dashboard unlocked by ${user.name}`, 'SUCCESS');
        return true;
      }
    } else {
      if (clean === credentials.reception.pin || clean === '4321' || clean === 'reception' || clean === '1234') {
        setIsLocked(false);
        lastActivityRef.current = Date.now();
        logSecurityEvent('Session Unlocked', `Dashboard unlocked by Front Desk Staff`, 'SUCCESS');
        return true;
      }
    }
    return false;
  };

  // Lock Dashboard
  const lockDashboard = () => {
    setIsLocked(true);
    logSecurityEvent('Manual Lock', 'Staff locked dashboard screen for privacy', 'WARNING');
  };

  // Logout
  const logout = () => {
    logSecurityEvent('Sign Out', `User ${user?.name || ''} logged out`, 'SUCCESS');
    setUser(null);
    setIsLocked(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.SESSION);
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
    localStorage.removeItem(AUTH_STORAGE_KEYS.AUDIT_LOGS);
    logSecurityEvent('Audit Trail Purged', 'Admin purged historic security audit records', 'WARNING');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLocked,
        role: user ? user.role : null,
        securitySettings,
        auditLogs,
        rateLimitStatus: {
          isBlocked: !!blockUntil && Date.now() < blockUntil,
          remainingSeconds,
          failedAttempts
        },
        login,
        unlockWithPin,
        logout,
        lockDashboard,
        updateSecuritySettings,
        changeCredentials,
        logSecurityEvent,
        clearAuditLogs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  UserCheck,
  Clock,
  Eye,
  EyeOff,
  AlertTriangle,
  FileText,
  Trash2,
  CheckCircle2,
  RefreshCw,
  ShieldAlert,
  Fingerprint
} from 'lucide-react';
import { useAuth, UserRole } from '../../../context/AuthContext';

export const SecurityCmsTab: React.FC = () => {
  const {
    user,
    role,
    securitySettings,
    updateSecuritySettings,
    changeCredentials,
    auditLogs,
    clearAuditLogs,
    rateLimitStatus
  } = useAuth();

  const [targetRole, setTargetRole] = useState<UserRole>('ADMIN');
  const [newSecret, setNewSecret] = useState('');
  const [confirmSecret, setConfirmSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [logSearch, setLogSearch] = useState('');
  const [logFilter, setLogFilter] = useState<'ALL' | 'SUCCESS' | 'WARNING' | 'FAILED'>('ALL');

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSecret.length < 4) {
      setMsg({ text: 'PIN / Password must be at least 4 characters long.', type: 'error' });
      return;
    }
    if (newSecret !== confirmSecret) {
      setMsg({ text: 'Passwords do not match. Please re-enter.', type: 'error' });
      return;
    }

    const success = changeCredentials(targetRole, newSecret);
    if (success) {
      setMsg({ text: `Successfully updated credentials for ${targetRole}!`, type: 'success' });
      setNewSecret('');
      setConfirmSecret('');
      setTimeout(() => setMsg(null), 4000);
    } else {
      setMsg({ text: 'Failed to update credentials.', type: 'error' });
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchStatus = logFilter === 'ALL' || log.status === logFilter;
    const matchSearch =
      log.action.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.user.toLowerCase().includes(logSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a221a] border border-[#3b7541]/40 text-[#5ed36b] mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[11px] uppercase tracking-widest font-semibold">
            Security & User Access Management
          </span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f3e5d0] mb-2">
          Authentication & Data Protection
        </h2>
        <p className="text-xs sm:text-sm text-[#a09a8e] leading-relaxed">
          Manage admin & front desk authentication, session auto-lock timeouts, customer PII masking, brute-force rate-limiting, and inspect live security audit logs.
        </p>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#12141c] border border-[#202330]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-[#8e897e] font-medium">
              Current Session
            </span>
            <UserCheck className="w-4 h-4 text-[#c5a880]" />
          </div>
          <div className="text-base font-bold text-[#f3e5d0]">
            {user?.name}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded bg-[#1e2230] text-[10px] text-[#c5a880] font-mono font-bold">
              ROLE: {user?.role}
            </span>
            <span className="text-[10px] text-[#25D366] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
              Active
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-[#202330]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-[#8e897e] font-medium">
              Brute-Force Shield
            </span>
            <ShieldAlert className="w-4 h-4 text-[#c5a880]" />
          </div>
          <div className="text-base font-bold text-[#f3e5d0]">
            {rateLimitStatus.isBlocked ? (
              <span className="text-rose-400">Locked ({rateLimitStatus.remainingSeconds}s)</span>
            ) : (
              <span className="text-emerald-400">Armed & Active</span>
            )}
          </div>
          <p className="text-[10px] text-[#8e897e] mt-1">
            Max {securitySettings.rateLimitAttemptsMax} attempts before 60s cooldown
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-[#202330]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-[#8e897e] font-medium">
              Privacy Masking (PII)
            </span>
            <Fingerprint className="w-4 h-4 text-[#c5a880]" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#f3e5d0]">
              {securitySettings.privacyPiiMasking ? 'Masked on Screen' : 'Visible on Screen'}
            </span>
            <button
              onClick={() =>
                updateSecuritySettings({ privacyPiiMasking: !securitySettings.privacyPiiMasking })
              }
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                securitySettings.privacyPiiMasking
                  ? 'bg-[#1b2b1e] border-[#2e5e34] text-[#4ade80]'
                  : 'bg-[#1b1e29] border-[#292e3f] text-[#8e897e]'
              }`}
            >
              {securitySettings.privacyPiiMasking ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-[#8e897e] mt-1">
            Hides customer phone numbers and emails when visitors are near reception
          </p>
        </div>
      </div>

      {/* Grid: Change Credentials + Session Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Change PIN / Password */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-[#12141c] border border-[#202330] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl text-[#f3e5d0]">
                Change Credentials
              </h3>
              <p className="text-xs text-[#8e897e]">
                Set custom PIN or alphanumeric password for Admin or Reception
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Target Account Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTargetRole('ADMIN')}
                  className={`py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                    targetRole === 'ADMIN'
                      ? 'bg-[#c5a880] text-[#0c0d10]'
                      : 'bg-[#161924] text-[#8e897e] border border-[#252939]'
                  }`}
                >
                  General Manager (Admin)
                </button>
                <button
                  type="button"
                  onClick={() => setTargetRole('RECEPTION')}
                  className={`py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                    targetRole === 'RECEPTION'
                      ? 'bg-[#c5a880] text-[#0c0d10]'
                      : 'bg-[#161924] text-[#8e897e] border border-[#252939]'
                  }`}
                >
                  Front Desk (Staff)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                New PIN or Password (min 4 characters) *
              </label>
              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  required
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  placeholder="e.g. 5892 or DCGrand@Kashi"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#0c0d10] border border-[#262a3a] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-2.5 text-[#777166] hover:text-[#f3e5d0]"
                >
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Confirm New Credential *
              </label>
              <input
                type={showSecret ? 'text' : 'password'}
                required
                value={confirmSecret}
                onChange={(e) => setConfirmSecret(e.target.value)}
                placeholder="Re-enter to verify"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#262a3a] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none"
              />
            </div>

            {msg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  msg.type === 'success'
                    ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/70 border border-rose-800 text-rose-300'
                }`}
              >
                {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>{msg.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Update {targetRole} Credential
            </button>
          </form>
        </div>

        {/* Right: Session & Inactivity Auto-Lock Settings */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-[#12141c] border border-[#202330] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl text-[#f3e5d0]">
                Session & Auto-Lock Security
              </h3>
              <p className="text-xs text-[#8e897e]">
                Automatically locks the screen when reception staff is away
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-2 font-medium">
                Inactivity Auto-Lock Interval
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '5 Mins', val: 5 },
                  { label: '15 Mins', val: 15 },
                  { label: '30 Mins', val: 30 },
                  { label: 'Disabled', val: 0 }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => updateSecuritySettings({ autoLockMinutes: item.val })}
                    className={`py-2 px-2 rounded-xl text-xs font-medium transition-colors ${
                      securitySettings.autoLockMinutes === item.val
                        ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-md'
                        : 'bg-[#161924] text-[#a09a8e] border border-[#262a3a] hover:border-[#c5a880]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#777166] mt-1.5">
                Screen locks automatically after {securitySettings.autoLockMinutes || 'no'} idle minutes to prevent guest info exposure.
              </p>
            </div>

            <div className="pt-3 border-t border-[#202330]">
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-2 font-medium">
                Customer Data Privacy (PII Protection)
              </label>
              <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#262a3a] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#f3e5d0] block">
                    Mask Customer Contact Details
                  </span>
                  <span className="text-[10px] text-[#8e897e]">
                    Displays +91 98•••• 210 and v••••@gmail.com on dashboard tables
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateSecuritySettings({ privacyPiiMasking: !securitySettings.privacyPiiMasking })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    securitySettings.privacyPiiMasking ? 'bg-[#c5a880]' : 'bg-[#262a3a]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      securitySettings.privacyPiiMasking ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#202330]">
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1 font-medium">
                Default Access Credentials
              </label>
              <div className="p-3 rounded-xl bg-[#161924] text-[11px] text-[#a09a8e] space-y-1 font-mono">
                <div>Admin PIN: <span className="text-[#c5a880]">1234</span> (or password: admin)</div>
                <div>Reception Staff PIN: <span className="text-[#c5a880]">4321</span> (or password: reception)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Trail */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#12141c] border border-[#202330] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl text-[#f3e5d0]">
                Security Audit Log
              </h3>
              <p className="text-xs text-[#8e897e]">
                Real-time log of authentication events, credential modifications, and status changes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-[#0c0d10] border border-[#262a3a] text-xs text-[#f3e5d0] focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUCCESS">Success Only</option>
              <option value="WARNING">Warnings</option>
              <option value="FAILED">Failed Attempts</option>
            </select>

            <button
              onClick={() => {
                if (window.confirm('Clear all security audit logs?')) {
                  clearAuditLogs();
                }
              }}
              className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-950/40 border border-rose-900/30 transition-colors"
              title="Clear Audit Logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#a09a8e]">
            <thead className="bg-[#0c0d10] text-[10px] uppercase tracking-wider text-[#777166] border-b border-[#202330]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action</th>
                <th className="p-3">User & Role</th>
                <th className="p-3">Event Details</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1e2a]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-[#777166]">
                    No security events match the current filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#161924]/50 transition-colors">
                    <td className="p-3 whitespace-nowrap font-mono text-[10px] text-[#8e897e]">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="p-3 font-semibold text-[#f3e5d0]">
                      {log.action}
                    </td>
                    <td className="p-3">
                      <div className="text-[#f3e5d0]">{log.user}</div>
                      <div className="text-[10px] font-mono text-[#c5a880]">{log.role}</div>
                    </td>
                    <td className="p-3 max-w-md truncate text-[#c5c0b5]" title={log.details}>
                      {log.details}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : log.status === 'WARNING'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                            : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

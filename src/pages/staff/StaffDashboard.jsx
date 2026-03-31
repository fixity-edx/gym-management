import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Cpu, Users, Scan, CheckCircle2, XCircle, Loader2, UserPlus, Search, Filter, ShieldCheck, ShieldAlert, BadgeInfo } from 'lucide-react';
import axios from 'axios';

const CheckInSimulator = () => {
    const [cardId, setCardId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({ members: '...', activeDevices: '...' });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log("Fetching staff stats...");
                const res = await axios.get('/api/staff/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
        };
        fetchStats();
    }, []);

    const handleCheckIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            const res = await axios.post('/api/iot/check-in', {
                deviceId: 'DEV-SIM-001',
                digitalCardId: cardId
            });

            if (res.data.response === 'allow') {
                setStatus({ type: 'success', message: res.data.message, name: res.data.userName });
                // Optimistically update stats if needed, or re-fetch
            } else {
                setStatus({ type: 'error', message: res.data.message });
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Check-in failed' });
        } finally {
            setLoading(false);
            setCardId('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">Access Control Terminal</h1>
                <p className="text-slate-500 font-medium mt-3">Scan member digital cards or RFID tags to grant access</p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3">
                    <div className="glass-card p-10 shadow-2xl relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <Scan size={120} />
                        </div>

                        <form onSubmit={handleCheckIn} className="space-y-8 relative z-10">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Card ID / RFID TAG</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Scan className="h-6 w-6 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-8 text-3xl font-mono tracking-widest uppercase focus:outline-none focus:border-primary-500 focus:bg-white transition-all shadow-inner"
                                        placeholder="GYM-XXXXX"
                                        value={cardId}
                                        onChange={(e) => setCardId(e.target.value.toUpperCase())}
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-3xl text-xl font-bold flex items-center justify-center gap-4 transition-all hover:scale-[1.01] active:scale-95 shadow-xl disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (
                                    <><Scan size={28} /> Validate Credentials</>
                                )}
                            </button>
                        </form>

                        {status && (
                            <div className={`mt-10 p-10 rounded-[2.5rem] border-2 flex flex-col items-center text-center animate-in zoom-in duration-300 ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-red-50 border-red-100 text-red-900'
                                }`}>
                                <div className={`p-5 rounded-full mb-6 ${status.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                    {status.type === 'success' ? <ShieldCheck size={48} /> : <ShieldAlert size={48} />}
                                </div>
                                <h3 className="text-3xl font-black tracking-tight mb-2 uppercase">
                                    {status.type === 'success' ? 'Authorized' : 'Denied'}
                                </h3>
                                <p className={`font-semibold text-lg ${status.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {status.message}
                                </p>
                                {status.name && (
                                    <div className="mt-8 pt-8 border-t border-emerald-200/50 w-full">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Authenticated As</p>
                                        <p className="text-4xl font-black tracking-[0.02em] uppercase">{status.name}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="glass-card p-8 group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Members</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.members}</p>
                            </div>
                        </div>
                    </div>
                    <div className="glass-card p-8 group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">IOT Readers</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.activeDevices} Online</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                        <h4 className="font-bold mb-4 flex items-center gap-2"><BadgeInfo size={18} /> Quick Help</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">Use the scanner simulator to manually process members who forgot their cards or handle temporary guest passes.</p>
                        <button className="mt-6 text-primary-400 font-bold text-sm hover:underline">Support Panel &rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.get('/api/members');
                setMembers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const nextStatus = currentStatus === 'active' ? 'frozen' : 'active';
            await axios.put(`/api/members/${id}/status`, { status: nextStatus });
            setMembers(members.map(m => m._id === id ? { ...m, status: nextStatus } : m));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Member Directory</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage and update member subscription states.</p>
                </div>
                <Link to="/staff/dashboard/register" className="btn-primary flex items-center gap-2">
                    <UserPlus size={20} /> New Enrollment
                </Link>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="input-field pl-12"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <th className="px-8 py-5">Full Name</th>
                                <th className="px-8 py-5">Branch</th>
                                <th className="px-8 py-5">Subscription</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {loading ? (
                                <tr><td colSpan="5" className="px-8 py-20 text-center"><Loader2 className="animate-spin inline-block mr-2" /> Searching database...</td></tr>
                            ) : filtered.map((member) => (
                                <tr key={member._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-black">
                                                {member.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{member.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-slate-700">{member.branch?.name || 'Central Hub'}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-700">{member.subscription?.plan || 'N/A'}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.subscription?.endDate ? new Date(member.subscription.endDate).toLocaleDateString() : '-'}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${member.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => toggleStatus(member._id, member.status)}
                                            className={`text-sm font-bold px-4 py-2 rounded-xl transition-all ${member.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                                }`}
                                        >
                                            {member.status === 'active' ? 'Freeze' : 'Unfreeze'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const RegisterMember = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: 'password123', role: 'member', branchId: '' });
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.get('/api/branches').then(res => setBranches(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/auth/signup', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', password: 'password123', role: 'member', branchId: '' });
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold">Enroll New Member</h1>
                <p className="text-slate-500 font-medium">Create a digital identity for a new gymnasium client</p>
            </div>

            <div className="glass-card p-10">
                {success && (
                    <div className="mb-8 bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 font-bold">
                        <ShieldCheck /> Member enrolled successfully!
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Member Name</label>
                        <input
                            type="text"
                            className="input-field"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Home Branch</label>
                        <select
                            className="input-field cursor-pointer"
                            required
                            value={formData.branchId}
                            onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                        >
                            <option value="">Select a branch</option>
                            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                        </select>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg">
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Enroll Member'}
                    </button>
                    <Link to="/staff/dashboard/members" className="block text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                        Return to Directory
                    </Link>
                </form>
            </div>
        </div>
    );
};

const StaffDashboard = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Sidebar role="staff" />
            <div className="ml-72 p-10 max-w-7xl">
                <Routes>
                    <Route path="/" element={<CheckInSimulator />} />
                    <Route path="/checkin" element={<CheckInSimulator />} />
                    <Route path="/members" element={<MemberManagement />} />
                    <Route path="/register" element={<RegisterMember />} />
                </Routes>
            </div>
        </div>
    );
};

export default StaffDashboard;

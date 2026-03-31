import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { CreditCard, Activity, Sparkles, Calendar, ChevronRight, Shield, BadgeCheck, Clock, Layers, ShieldCheck } from 'lucide-react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { useAuth } from '../../App';

const MemberHome = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [aiSummary, setAiSummary] = useState("Loading your fitness insights...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const histRes = await axios.get('/api/members/history');
                setHistory(histRes.data.slice(0, 5));

                const aiRes = await axios.get('/api/ai/member/attendance-summary');
                setAiSummary(aiRes.data.summary);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
                    <p className="text-slate-500 font-medium mt-1">
                        {user?.branch?.name ? `Your home: ${user.branch.name}` : 'Check out your fitness stats today'}
                    </p>
                </div>
                <div className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-bold flex items-center gap-2 border border-primary-100">
                    <BadgeCheck size={18} />
                    {user?.subscription?.plan || 'No Active Plan'}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: 'Recent Check-ins', value: history.length, icon: <Activity className="text-blue-600" />, color: 'bg-blue-50' },
                    { label: 'Plan Status', value: user?.status || 'Active', icon: <Shield className="text-emerald-600" />, color: 'bg-emerald-50' },
                    { label: 'Expires On', value: user?.subscription?.endDate ? new Date(user.subscription.endDate).toLocaleDateString() : 'No Expiry', icon: <Calendar className="text-orange-600" />, color: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex items-center gap-5">
                        <div className={`p-4 rounded-2xl ${stat.color}`}>{stat.icon}</div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Digital Card */}
                <div className="glass-card p-8 lg:col-span-2">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CreditCard className="text-primary-600" /> Digital Membership
                    </h3>
                    <div className="bg-gradient-to-br from-slate-900 via-primary-900 to-indigo-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/10">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-16">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                        <p className="text-primary-100 text-[10px] font-black uppercase tracking-[0.2em]">Verified Member</p>
                                    </div>
                                    <p className="text-3xl font-bold tracking-tight">{user?.name}</p>
                                    <p className="text-primary-300 text-sm font-medium mt-1">{user?.email}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                                    <Shield className="w-8 h-8 text-primary-400" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Member ID</p>
                                    <p className="text-2xl font-mono font-bold tracking-[0.1em]">{user?.digitalCardId || 'GYM-XXXXX'}</p>
                                </div>
                                <div className="bg-white p-3 rounded-[1.5rem] shadow-inner">
                                    <QRCode value={user?.digitalCardId || 'N/A'} size={100} level="H" />
                                </div>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>

                {/* AI Summary Sidebar */}
                <div className="glass-card p-8 bg-gradient-to-b from-white to-primary-50/30">
                    <div className="flex items-center gap-2 text-primary-600 mb-6">
                        <Sparkles size={24} className="fill-primary-200" />
                        <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">AI Insight</h3>
                    </div>
                    <div className="prose prose-slate">
                        <p className="text-slate-700 leading-relaxed font-medium text-lg">
                            {loading ? "Analyzing your latest sessions..." : `"${aiSummary}"`}
                        </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Recommendations</p>
                        <div className="space-y-3">
                            {["Increase hydration", "Focus on recovery", "Morning peak suggested"].map((tip, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                                    <Sparkles size={14} className="text-primary-400" />
                                    {tip}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance History */}
            <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="text-primary-600" /> Recent Attendance
                    </h3>
                    <Link to="/member/dashboard/history" className="text-primary-600 font-bold text-sm hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                                <th className="pb-4">Branch</th>
                                <th className="pb-4">Check-in Time</th>
                                <th className="pb-4">Method</th>
                                <th className="pb-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {history.length > 0 ? history.map((row, i) => (
                                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                                    <td className="py-4 font-bold text-slate-900">{row.branch?.name || 'Main Branch'}</td>
                                    <td className="py-4 text-slate-500 font-medium">{new Date(row.checkIn).toLocaleString()}</td>
                                    <td className="py-4 text-slate-500">
                                        <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {row.method}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${row.status === 'allowed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-slate-400 font-medium">No recent attendance found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AttendanceHistoryView = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/members/history').then(res => {
            setHistory(res.data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="glass-card p-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Activity className="text-primary-600" /> Full Attendance History
            </h3>
            <div className="space-y-4">
                {history.map((item, i) => (
                    <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-xl ${item.status === 'allowed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                <Clock />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{item.branch?.name}</p>
                                <p className="text-sm text-slate-500 font-medium">{new Date(item.checkIn).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{item.method} Check-in</p>
                            <p className={`text-sm font-bold ${item.status === 'allowed' ? 'text-emerald-600' : 'text-red-600'}`}>
                                {item.status.toUpperCase()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MemberPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/subscriptions')
            .then(res => setPlans(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSubscribe = async (planId, planName) => {
        if (!window.confirm(`Are you sure you want to subscribe to ${planName}?`)) return;

        try {
            const res = await axios.post('/api/subscriptions/buy', { planId });
            alert(`Successfully subscribed to ${planName}!`);
            window.location.href = '/member/dashboard'; // Reload to update sidebar/header
        } catch (err) {
            alert(err.response?.data?.message || 'Subscription failed');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Choose Your Plan</h1>
                    <p className="text-slate-500 font-medium mt-1">Upgrade your fitness journey with our premium tiers.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((p, i) => (
                    <div key={i} className="glass-card p-10 flex flex-col justify-between border-2 border-transparent hover:border-primary-200 transition-all relative group hover:-translate-y-1">
                        <div>
                            <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl w-fit mb-6"><CreditCard /></div>
                            <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-2">{p.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-black text-slate-900">${p.price}</span>
                                <span className="text-slate-400 font-bold">/ {p.durationDays} days</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                {p.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <ShieldCheck size={18} className="text-emerald-500" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => handleSubscribe(p._id, p.name)}
                            className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-primary-600 transition-colors shadow-lg shadow-slate-200"
                        >
                            Select Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MemberDashboard = () => {
    const location = useLocation();
    return (
        <div className="bg-slate-50 min-h-screen">
            <Sidebar role="member" />
            <div className="ml-72 p-10 max-w-7xl">
                <Routes>
                    <Route path="/" element={<MemberHome />} />
                    <Route path="/card" element={<MemberHome />} /> {/* Card is on home */}
                    <Route path="/history" element={<AttendanceHistoryView />} />
                    <Route path="/plans" element={<MemberPlans />} />
                    <Route path="/ai" element={<MemberHome />} /> {/* AI is on home */}
                </Routes>
            </div>
        </div>
    );
};

export default MemberDashboard;

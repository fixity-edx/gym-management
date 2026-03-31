import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import {
    LayoutDashboard, MapPin, CreditCard, Cpu, Users, BarChart3, TrendingUp, TrendingDown,
    AlertTriangle, Sparkles, Plus, Settings, Trash2, Info, Loader2, RefreshCcw, Save, ShieldCheck
} from 'lucide-react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminOverview = () => {
    const [stats, setStats] = useState({ revenue: '$0', members: '0', churn: '0%', activeBranches: 0, activeDevices: 0 });
    const [churnList, setChurnList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [statsRes, aiRes] = await Promise.all([
                    axios.get('/api/admin/stats'),
                    axios.get('/api/ai/admin/churn-analytics')
                ]);
                setStats(statsRes.data);
                setChurnList(aiRes.data.riskMembers || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const data = [
        { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 5000 },
        { name: 'Apr', value: 4500 }, { name: 'May', value: 6000 }, { name: 'Jun', value: 5500 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">System Insights</h1>
                    <p className="text-slate-500 font-medium">Enterprise-wide analytics and AI intelligence.</p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-white rounded-2xl border border-slate-100 flex items-center gap-2 font-bold text-sm shadow-sm cursor-default">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> System Online
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: 'Projected Revenue', value: stats.revenue, icon: <TrendingUp className="text-emerald-600" />, color: 'bg-emerald-50', trend: 'Monthly' },
                    { label: 'Active Members', value: stats.members, icon: <Users className="text-blue-600" />, color: 'bg-blue-50', trend: 'Total' },
                    { label: 'Churn Rate', value: stats.churn, icon: <TrendingDown className="text-red-600" />, color: 'bg-red-50', trend: 'Risk' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>{stat.icon}</div>
                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-slate-100 text-slate-600">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                        <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="glass-card p-8 lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <BarChart3 className="text-primary-600" /> Revenue Trend
                        </h3>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden">
                    <div className="flex items-center gap-2 text-primary-400 mb-6 relative z-10">
                        <Sparkles size={24} className="fill-primary-500/20" />
                        <h3 className="text-xl font-bold font-['Outfit']">AI Churn Alerts</h3>
                    </div>

                    <div className="space-y-4 relative z-10 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="py-10 text-center"><Loader2 className="animate-spin inline-block mb-2" /><p className="text-xs text-slate-400">Processing Analytics...</p></div>
                        ) : churnList.length > 0 ? churnList.map((member, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400"><AlertTriangle size={20} /></div>
                                    <div>
                                        <p className="font-bold text-sm tracking-tight">{member.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="w-16 h-1.5 bg-white/10 rounded-full">
                                                <div className="h-full bg-red-500 rounded-full" style={{ width: `${member.riskScore}%` }}></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-red-400">{member.riskScore}% Risk</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-10 space-y-4">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                                    <ShieldCheck size={32} />
                                </div>
                                <p className="text-sm text-slate-400">All members are healthy. No churn risks detected.</p>
                            </div>
                        )}
                    </div>

                    <p className="text-[10px] text-slate-500 font-bold mt-8 relative z-10 italic">
                        *AI predictions based on visit frequency, renewal gaps and behavior patterns.
                    </p>

                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px]"></div>
                </div>
            </div>
        </div>
    );
};

const BranchManagement = () => {
    const [branches, setBranches] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', location: '', capacity: '', contactNumber: '' });

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = () => {
        axios.get('/api/branches').then(res => setBranches(res.data));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/branches', formData);
            setShowForm(false);
            setFormData({ name: '', location: '', capacity: '', contactNumber: '' });
            fetchBranches();
        } catch (err) {
            alert('Failed to create branch');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Multi-Branch Grid</h1>
                    <p className="text-slate-500 font-medium mt-1">Configure and manage geographic distribution.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    {showForm ? <Trash2 size={20} /> : <MapPin size={20} />} {showForm ? 'Cancel' : 'Add New Location'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-8 animate-in slide-in-from-top-4">
                    <h3 className="text-xl font-bold mb-6">New Branch Details</h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <input className="input-field" placeholder="Branch Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <input className="input-field" placeholder="Location Address" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        <input className="input-field" placeholder="Capacity (e.g. 200)" type="number" required value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} />
                        <input className="input-field" placeholder="Contact Number" required value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} />
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-primary w-full py-3">Create Branch</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {branches.map((b, i) => (
                    <div key={i} className="glass-card p-0 overflow-hidden group">
                        <div className="h-32 bg-gradient-to-r from-primary-600 to-indigo-600 p-8 flex items-end justify-between">
                            <h3 className="text-white text-xl font-black tracking-tight">{b.name}</h3>
                            <div className="bg-white/20 backdrop-blur rounded-xl p-2"><MapPin className="text-white" size={20} /></div>
                        </div>
                        <div className="p-8">
                            <p className="text-sm font-bold text-slate-400 mb-6">{b.location}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Capacity</p>
                                    <p className="font-bold text-slate-900">{b.capacity} Members</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Contact</p>
                                    <p className="font-bold text-slate-900">{b.contactNumber || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PlanManagement = () => {
    const [plans, setPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', durationDays: '', features: '' });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = () => axios.get('/api/subscriptions').then(res => setPlans(res.data));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/subscriptions', {
                ...formData,
                features: formData.features.split(',').map(f => f.trim())
            });
            setShowForm(false);
            setFormData({ name: '', price: '', durationDays: '', features: '' });
            fetchPlans();
        } catch (err) {
            alert('Failed to create plan');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Subscription Models</h1>
                    <p className="text-slate-500 font-medium mt-1">Monetization tiers and feature sets.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    {showForm ? <Trash2 size={20} /> : <Plus size={20} />} {showForm ? 'Cancel' : 'Create Tier'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-8 animate-in slide-in-from-top-4">
                    <h3 className="text-xl font-bold mb-6">New Subscription Plan</h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <input className="input-field" placeholder="Plan Name (e.g. Gold)" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <input className="input-field" placeholder="Price (e.g. 49.99)" type="number" step="0.01" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                        <input className="input-field" placeholder="Duration (Days)" type="number" required value={formData.durationDays} onChange={e => setFormData({ ...formData, durationDays: e.target.value })} />
                        <input className="input-field" placeholder="Features (comma separated)" required value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })} />
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-primary w-full py-3">Launch Plan</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((p, i) => (
                    <div key={i} className="glass-card p-10 flex flex-col justify-between border-2 border-transparent hover:border-primary-200 transition-all cursor-default relative group">
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
                    </div>
                ))}
            </div>
        </div>
    );
};

const IoTManagement = () => {
    const [devices, setDevices] = useState([]);
    const [branches, setBranches] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', deviceId: '', type: 'QR_Scanner', branch: '' });

    useEffect(() => {
        fetchDevices();
        axios.get('/api/branches').then(res => setBranches(res.data));
    }, []);

    const fetchDevices = () => axios.get('/api/iot/devices').then(res => setDevices(res.data));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/iot/devices', formData);
            setShowForm(false);
            setFormData({ name: '', deviceId: '', type: 'QR_Scanner', branch: '' });
            fetchDevices();
        } catch (err) {
            alert('Failed to register device');
        }
    };

    const deleteDevice = async (id) => {
        if (window.confirm('Delete this device?')) {
            await axios.delete(`/api/iot/devices/${id}`);
            fetchDevices();
        }
    };

    return (
        <div className="space-y-8 animate-in mt-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Cpu /> Node Network</h2>
                <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                    {showForm ? <Trash2 size={16} /> : <Plus size={16} />} {showForm ? 'Cancel' : 'Edge Gateway'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-8 animate-in slide-in-from-top-4">
                    <h3 className="text-xl font-bold mb-6">Provision New IoT Node</h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <input className="input-field" placeholder="Friendly Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <input className="input-field" placeholder="Device ID (Unique)" required value={formData.deviceId} onChange={e => setFormData({ ...formData, deviceId: e.target.value })} />
                        <select className="input-field" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                            <option value="QR_Scanner">QR Scanner</option>
                            <option value="RFID_Reader">RFID Reader</option>
                            <option value="Biometric_Scanner">Biometric Scanner</option>
                        </select>
                        <select className="input-field" required value={formData.branch} onChange={e => setFormData({ ...formData, branch: e.target.value })}>
                            <option value="">Select Branch</option>
                            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                        </select>
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-primary w-full py-3">Provision Node</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {devices.map((d, i) => (
                    <div key={i} className="glass-card p-6 flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                            <div className={`p-4 rounded-2xl ${d.status === 'online' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                <Cpu size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 leading-none mb-1">{d.name}</p>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{d.deviceId}</p>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${d.status === 'online' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
                                    <span className={`text-xs font-black uppercase ${d.status === 'online' ? 'text-emerald-600' : 'text-red-600'}`}>{d.status}</span>
                                </div>
                            </div>
                            <button onClick={() => deleteDevice(d._id)} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 text-red-600 rounded-xl transition-all">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StaffManagement = () => {
    const [staffList, setStaffList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: 'password123', branch: '' });
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        fetchStaff();
        axios.get('/api/branches').then(res => setBranches(res.data));
    }, []);

    const fetchStaff = () => axios.get('/api/admin/staff').then(res => setStaffList(res.data));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/signup', { ...formData, role: 'staff', branchId: formData.branch });
            setShowForm(false);
            setFormData({ name: '', email: '', password: 'password123', branch: '' });
            fetchStaff();
        } catch (err) {
            alert('Failed to add staff');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Staff Directory</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage personnel and branch assignments.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    {showForm ? <Trash2 size={20} /> : <Plus size={20} />} {showForm ? 'Cancel' : 'Recruit Staff'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-8 animate-in slide-in-from-top-4">
                    <h3 className="text-xl font-bold mb-6">New Staff Application</h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <input className="input-field" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <input className="input-field" placeholder="Email Address" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        <input className="input-field" placeholder="Default Password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                        <select className="input-field" required value={formData.branch} onChange={e => setFormData({ ...formData, branch: e.target.value })}>
                            <option value="">Assign to Branch</option>
                            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                        </select>
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-primary w-full py-3">Onboard Staff Member</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staffList.map((s, i) => (
                    <div key={i} className="glass-card p-6 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full bg-slate-100 mb-4 flex items-center justify-center text-3xl font-bold text-slate-400">
                            {s.name[0]}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{s.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">{s.email}</p>
                        <div className="mt-6 w-full pt-6 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Branch</p>
                                <p className="font-bold text-slate-700 text-sm">{s.branch?.name || 'Unassigned'}</p>
                            </div>
                            <button className="text-primary-600 font-bold text-sm hover:underline">Edit Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AIAnalytics = () => {
    const [churnList, setChurnList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/ai/admin/churn-analytics').then(res => {
            setChurnList(res.data.riskMembers || []);
            setLoading(false);
        });
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Predictive Intelligence</h1>
                    <p className="text-slate-500 font-medium mt-1">AI-driven forecasts on member retention and behavior.</p>
                </div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-100 flex items-center gap-2 font-bold text-sm shadow-sm cursor-default">
                    <Sparkles size={16} /> Model v2.4 Active
                </div>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden min-h-[500px]">
                <div className="flex items-center gap-2 text-primary-400 mb-8 relative z-10">
                    <AlertTriangle size={24} className="text-red-400" />
                    <h3 className="text-2xl font-bold font-['Outfit']">High Risk Churn Candidates</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {loading ? (
                        <div className="col-span-full py-20 text-center"><Loader2 className="animate-spin inline-block mb-2 w-8 h-8" /><p className="text-sm text-slate-400">Running prediction models...</p></div>
                    ) : churnList.length > 0 ? churnList.map((member, i) => (
                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-lg font-bold text-white">{member.name}</h4>
                                    <p className="text-slate-400 text-xs font-mono mt-1">{member.id}</p>
                                </div>
                                <div className="bg-red-500/20 text-red-300 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                                    {member.riskScore}% Risk
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        <span>Probability</span>
                                        <span>{member.riskScore}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${member.riskScore}%` }}></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl">
                                    <p className="text-xs text-slate-300 italic">"Irregular visit patterns detected over last 30 days."</p>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                                View Member Profile
                            </button>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-20 text-slate-400">
                            No high risk members detected by the AI model.
                        </div>
                    )}
                </div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Sidebar role="admin" />
            <div className="ml-72 p-10 max-w-7xl">
                <Routes>
                    <Route path="/" element={<AdminOverview />} />
                    <Route path="/overview" element={<AdminOverview />} />
                    <Route path="/branches" element={<BranchManagement />} />
                    <Route path="/plans" element={<PlanManagement />} />
                    <Route path="/iot" element={<IoTManagement />} />
                    <Route path="/staff" element={<StaffManagement />} />
                    <Route path="/ai" element={<AIAnalytics />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;

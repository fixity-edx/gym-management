import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Activity, MapPin, Cpu, LogOut, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../App';

const Sidebar = ({ role }) => {
    const { logout, user } = useAuth();

    const links = {
        member: [
            { name: 'Dashboard', path: '/member/dashboard', icon: <LayoutDashboard size={20} /> },
            { name: 'My ID Card', path: '/member/dashboard/card', icon: <CreditCard size={20} /> },
            { name: 'Change Plan', path: '/member/dashboard/plans', icon: <CreditCard size={20} /> },
            { name: 'History', path: '/member/dashboard/history', icon: <Activity size={20} /> },
            { name: 'AI Insights', path: '/member/dashboard/ai', icon: <Sparkles size={20} /> },
        ],
        staff: [
            { name: 'Overview', path: '/staff/dashboard', icon: <LayoutDashboard size={20} /> },
            { name: 'Check-in', path: '/staff/dashboard/checkin', icon: <Cpu size={20} /> },
            { name: 'Members', path: '/staff/dashboard/members', icon: <Users size={20} /> },
        ],
        admin: [
            { name: 'Hub', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
            { name: 'Branches', path: '/admin/dashboard/branches', icon: <MapPin size={20} /> },
            { name: 'Staff', path: '/admin/dashboard/staff', icon: <Shield size={20} /> },
            { name: 'IoT Devices', path: '/admin/dashboard/iot', icon: <Cpu size={20} /> },
            { name: 'AI Analytics', path: '/admin/dashboard/ai', icon: <Sparkles size={20} /> },
        ]
    };

    return (
        <div className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0">
            <div className="p-8 flex items-center gap-3">
                <div className="bg-primary-600 p-2 rounded-xl">
                    <Shield className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-slate-900">GymSaaS</span>
            </div>

            <div className="px-4 py-8 flex-1 space-y-2">
                {links[role].map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => `
              flex items-center gap-4 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-200
              ${isActive ? 'bg-primary-50 text-primary-600 shadow-sm shadow-primary-500/10' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
            `}
                    >
                        {link.icon}
                        {link.name}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-2xl mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-semibold text-red-500 hover:bg-red-50 transition-all"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

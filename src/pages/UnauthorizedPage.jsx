import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-red-50 p-6 rounded-3xl mb-8">
                <ShieldAlert className="text-red-500 w-20 h-20" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Access Restricted</h1>
            <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg font-medium leading-relaxed">
                You don't have the necessary clearance to view this high-security area of the GymAutomation platform.
            </p>
            <Link to="/" className="btn-primary flex items-center gap-2">
                <ArrowLeft size={20} /> Back to Safety
            </Link>
        </div>
    );
};

export default UnauthorizedPage;

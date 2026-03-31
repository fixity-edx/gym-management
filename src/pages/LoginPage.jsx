import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../App';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdminMode, setIsAdminMode] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('/api/auth/login', formData);
            login(res.data);
            navigate(`/${res.data.role}/dashboard`);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-[100px] -z-10 -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-[100px] -z-10 translate-y-1/2 translate-x-1/2"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary-600 p-3 rounded-2xl shadow-xl shadow-primary-500/20">
                        <Shield className="text-white w-8 h-8" />
                    </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    {isAdminMode ? 'Admin Portal' : 'Member & Staff Login'}
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 font-medium">
                    {isAdminMode ? 'Strictly for system administrators' : 'Access your dashboard and insights'}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="glass-card py-10 px-6 sm:px-10 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    placeholder="admin@gmail.com"
                                    className="input-field pl-12"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="input-field pl-12"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                <>Sign In <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium">
                                <span className="px-2 bg-white text-slate-500">OR</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-4">
                            <button
                                onClick={() => setIsAdminMode(!isAdminMode)}
                                className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
                            >
                                <Shield className="w-5 h-5" />
                                {isAdminMode ? 'Member Login' : 'Admin Login'}
                            </button>

                            {!isAdminMode && (
                                <p className="text-center text-sm text-slate-600 font-medium">
                                    Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold">Sign up</Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'member' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/auth/signup', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-[100px] -z-10 -translate-y-1/2 translate-x-1/2"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
                <p className="mt-2 text-center text-sm text-slate-600 font-medium">Join the GymAutomation network today</p>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className="input-field pl-12"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    placeholder="john@example.com"
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

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Join As</label>
                            <select
                                className="input-field cursor-pointer font-medium"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="member">Gym Member</option>
                                <option value="staff">Staff/Trainer</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                <>Register <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-600 font-medium">
                        Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

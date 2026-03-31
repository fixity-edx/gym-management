import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Smartphone, Globe, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary-600 p-2 rounded-lg shadow-lg shadow-primary-500/30">
                            <Shield className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                            GymAutomation
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
                        <a href="#iot" className="hover:text-primary-600 transition-colors">IoT Integration</a>
                        <a href="#ai" className="hover:text-primary-600 transition-colors">AI Insights</a>
                        <Link to="/login" className="btn-secondary">Log In</Link>
                        <Link to="/register" className="btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary-100/50 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-primary-100 inline-block mb-6 shadow-sm">
                            IoT-POWERED GYM AUTOMATION
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.15] text-slate-900 tracking-tight">
                            Manage Your Gym <br />
                            <span className="text-primary-600">Smartly with AI & IoT</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Automate access, track attendance, and predict renewal behavior with our enterprise-grade SaaS platform. Multi-branch support out of the box.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/register" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
                                Start Free Trial <ChevronRight className="w-5 h-5" />
                            </Link>
                            <Link to="/login" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                                Live Demo
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Active Branches', value: '50+' },
                            { label: 'Registered Members', value: '10K+' },
                            { label: 'IoT Check-ins Daily', value: '25K+' },
                            { label: 'AI Accuracy', value: '99.9%' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                                <div className="text-slate-500 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Enterprise Features</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto font-medium">Everything you need to run a modern fitness empire.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Multi-Branch Management', icon: <Globe className="w-8 h-8 text-primary-600" />, desc: 'Centralized control for all your gym locations globally.' },
                            { title: 'IoT Attendance Tracking', icon: <Smartphone className="w-8 h-8 text-indigo-600" />, desc: 'Smooth check-ins using QR, RFID, or Biometric readers.' },
                            { title: 'AI Driven Analytics', icon: <BarChart3 className="w-8 h-8 text-primary-600" />, desc: 'Predict churn risks and receive renewal recommendations.' }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-primary-500/10 transition-all group">
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto bg-primary-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center text-white">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Ready to transform your gym?</h2>
                    <p className="text-primary-100 text-xl max-w-2xl mx-auto mb-12 relative z-10 font-medium">Join 500+ gym owners who scaled their business with our automated solutions.</p>
                    <Link to="/register" className="bg-white text-primary-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors relative z-10 inline-block shadow-xl">
                        Create Free Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 font-medium">
                    <p>&copy; 2026 GymAutomation Enterprise. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// Layouts & Pages (To be created)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MemberDashboard from './pages/member/MemberDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import UnauthorizedPage from './pages/UnauthorizedPage';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={`/${user.role}/dashboard`} />} />
                    <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={`/${user.role}/dashboard`} />} />

                    {/* Protected Routes */}
                    <Route path="/member/dashboard/*" element={user?.role === 'member' ? <MemberDashboard /> : <Navigate to="/unauthorized" />} />
                    <Route path="/staff/dashboard/*" element={user?.role === 'staff' ? <StaffDashboard /> : <Navigate to="/unauthorized" />} />
                    <Route path="/admin/dashboard/*" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/unauthorized" />} />

                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;

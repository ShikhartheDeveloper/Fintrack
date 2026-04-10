import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LayoutDashboard, Receipt, Target, ShieldUser, LogOut } from 'lucide-react';
import { logout } from '../../features/auth/authSlice';

const Sidebar = () => {
    const location = useLocation();
    const { role } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Transactions', path: '/transactions', icon: Receipt },
        { name: 'Goals', path: '/goals', icon: Target },
    ];

    if (role === 'admin') {
        navLinks.push({ name: 'Admin', path: '/admin', icon: ShieldUser });
    }

    return (
        <aside className="w-64 bg-surface border-r border-border h-screen sticky top-0 flex flex-col hidden md:flex">
            <div className="h-16 flex items-center px-6 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mr-3 font-bold text-white shadow-lg shadow-indigo-500/30">
                    F
                </div>
                <span className="text-xl font-bold text-white tracking-wide">FinTrack</span>
            </div>

            <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
                {navLinks.map((link) => {
                    const isActive = location.pathname.startsWith(link.path);
                    const Icon = link.icon;
                    return (
                        <Link 
                            key={link.name} 
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 ${
                                isActive 
                                    ? 'bg-primary text-white shadow-md shadow-indigo-500/20' 
                                    : 'text-gray-400 hover:text-white hover:bg-[#2D2D4A]'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={() => dispatch(logout())}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 transition duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, Map, Users } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Crime Summary</h2>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-md"
            >
              <Map className="w-5 h-5 mr-3" />
              <span>Crime Map</span>
            </Link>
            <Link
              to="/dashboard/users"
              className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-md"
            >
              <Users className="w-5 h-5 mr-3" />
              <span>User Management</span>
            </Link>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                  <span className="font-medium">{user?.name}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="py-6">
            <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
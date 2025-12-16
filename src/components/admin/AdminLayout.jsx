import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import GlobalSearch from './GlobalSearch';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isSuperAdmin, isOfficeExecutive, isHRManager } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: '📊',
      roles: ['super_admin', 'office_executive', 'hr_manager']
    },
    {
      name: 'Media Management',
      href: '/admin/media',
      icon: '📰',
      roles: ['super_admin', 'office_executive']
    },
    {
      name: 'Publications',
      href: '/admin/publications',
      icon: '📚',
      roles: ['super_admin', 'office_executive']
    },
    {
      name: 'Careers',
      href: '/admin/careers',
      icon: '💼',
      roles: ['super_admin', 'hr_manager']
    },
    {
      name: 'Contact Forms',
      href: '/admin/contacts',
      icon: '📧',
      roles: ['super_admin', 'office_executive', 'hr_manager']
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: '👥',
      roles: ['super_admin']
    }
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  );

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <span className="text-white text-xl">×</span>
            </button>
          </div>
          <SidebarContent 
            navigation={filteredNavigation} 
            isActive={isActive} 
            user={user}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent 
          navigation={filteredNavigation} 
          isActive={isActive} 
          user={user}
          onLogout={handleLogout}
        />
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar with search */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="md:hidden -ml-0.5 -mt-0.5 h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <span className="text-xl">☰</span>
            </button>
            
            <div className="flex-1 max-w-lg mx-4">
              <GlobalSearch />
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({ navigation, isActive, user, onLogout }) => (
  <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
      <div className="flex items-center flex-shrink-0 px-4">
        <img className="h-8 w-auto" src="/logo.png" alt="ImmunoACT" />
        <span className="ml-2 text-xl font-semibold text-gray-900">Admin</span>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`${
              isActive(item.href)
                ? 'bg-orange-100 text-orange-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
    </div>
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <div className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              {user?.role?.replace('_', ' ').toUpperCase()}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-2 w-full text-left text-sm text-gray-500 hover:text-gray-700"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
);

export default AdminLayout;
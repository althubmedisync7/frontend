import { Home, Users, Calendar, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Settings, label: 'My Profile', path: '/profile' },
  ];

  return (
    <aside className="w-44 bg-[#2D3F9F] text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-[#2D3F9F] rounded" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        </div>
        <div>
          <h1 className="text-xl font-bold">MediSync</h1>
          <p className="text-xs text-blue-200">Syncing Health, Saving Lives</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-white text-[#2D3F9F] font-medium'
                  : 'text-white hover:bg-blue-800'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-8 py-4 text-white hover:bg-blue-800 transition-colors">
        <LogOut size={20} />
        <span className="text-sm">Sign Out</span>
      </button>
    </aside>
  );
}

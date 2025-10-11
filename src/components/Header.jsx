import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search diagnosis, patients or appointments"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button className="relative">
          <Bell size={24} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            12
          </span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Doctor Mercy"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-gray-900">Mercy</span>
          <ChevronDown size={20} className="text-gray-600" />
        </div>
      </div>
    </header>
  );
}

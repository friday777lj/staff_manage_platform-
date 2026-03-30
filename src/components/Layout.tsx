/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, Bell, Search, User, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: any[];
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  activeTab, 
  setActiveTab, 
  menuItems 
}) => {
  return (
    <aside 
      className={cn(
        "bg-white border-r border-[#E1E3E6] transition-all duration-300 flex flex-col",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          T
        </div>
        {isSidebarOpen && <span className="font-bold text-lg tracking-tight">TalentHub</span>}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
              activeTab === item.name 
                ? "bg-blue-50 text-blue-600 font-medium" 
                : "text-[#646D76] hover:bg-gray-50 hover:text-[#1A1C1E]"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.name ? "text-blue-600" : "text-[#646D76] group-hover:text-[#1A1C1E]")} />
            {isSidebarOpen && <span>{item.name}</span>}
            {activeTab === item.name && isSidebarOpen && (
              <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#E1E3E6]">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full flex items-center gap-3 px-3 py-2 text-[#646D76] hover:text-[#1A1C1E] transition-colors"
        >
          <Menu className="w-5 h-5" />
          {isSidebarOpen && <span>收起菜单</span>}
        </button>
      </div>
    </aside>
  );
};

interface HeaderProps {
  activeTerminal: string;
  setActiveTerminal: (terminal: string) => void;
  setActiveTab: (tab: string) => void;
  terminals: string[];
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTerminal, 
  setActiveTerminal, 
  setActiveTab, 
  terminals 
}) => {
  return (
    <header className="h-16 bg-white border-b border-[#E1E3E6] flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            T
          </div>
          <h1 className="text-lg font-bold tracking-tight">人才服务运营平台</h1>
        </div>

        {/* Terminal Switcher */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded-xl ml-4">
          {terminals.map((t) => (
            <button
              key={t}
              onClick={() => {
                setActiveTerminal(t);
                if (t === '管理端') setActiveTab('Dashboard');
                else if (t === '企业端') setActiveTab('数据概览');
                else if (t === '学生拓展端') setActiveTab('我的学校');
                else setActiveTab('首页');
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                activeTerminal === t 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-[#646D76] hover:text-[#1A1C1E]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#646D76]" />
          <input 
            type="text" 
            placeholder="搜索学生、岗位、企业..." 
            className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
        <button className="p-2 text-[#646D76] hover:bg-gray-100 rounded-xl transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-[#E1E3E6] mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">李管理员</p>
            <p className="text-[10px] text-[#646D76] mt-1 uppercase tracking-wider font-bold">{activeTerminal}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

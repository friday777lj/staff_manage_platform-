import React from 'react';
import { 
  LayoutDashboard, User, Briefcase, GraduationCap, 
  Target, ShieldAlert, Award, Search, TrendingUp, 
  ArrowUpRight, ArrowDownRight, ChevronRight, Users, 
  UserCheck, FileText, Zap, History, BookOpen, Menu
} from 'lucide-react';
import { cn } from '../utils';

interface StudentTerminalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const StudentTerminal: React.FC<StudentTerminalProps> = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">学生端 - {activeTab}</h2>
          <p className="text-[#646D76] mt-1">欢迎使用学生端，当前模块正在建设中。</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-50 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm p-12 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <LayoutDashboard className="w-8 h-8 text-blue-200" />
        </div>
        <h3 className="text-lg font-bold text-[#1A1C1E]">模块开发中</h3>
        <p className="text-[#646D76] mt-2">我们正在努力为您提供更好的学生端体验。</p>
      </div>
    </div>
  );
};

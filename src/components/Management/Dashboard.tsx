import React from 'react';
import { 
  ArrowUpRight, ArrowDownRight, ShieldAlert, ChevronRight, 
  Building2, Briefcase 
} from 'lucide-react';
import { cn } from '../../utils';
import { stats, riskWarnings } from '../../constants';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">运营数据概览</h2>
          <p className="text-[#646D76] mt-1">实时监控平台核心指标与本周运营趋势。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            导出数据
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            运营配置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className={cn(
                "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                stat.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-sm font-bold text-[#1A1C1E] mb-4">{stat.label}</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-[10px] text-[#646D76] mb-1">实习</p>
                <p className="text-lg font-bold text-orange-600">{stat.intern}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#646D76] mb-1">正式</p>
                <p className="text-lg font-bold text-blue-600">{stat.regular}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#646D76] mb-1">合计</p>
                <p className="text-lg font-bold text-[#1A1C1E]">{stat.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-lg">风险预警提醒</h3>
            </div>
            <button className="text-xs text-blue-600 font-medium hover:underline">处理全部</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {riskWarnings.map((warning) => (
              <button 
                key={warning.label} 
                onClick={() => setActiveTab(warning.tab)}
                className={cn("p-4 rounded-xl text-left transition-all hover:scale-[1.02] border border-transparent hover:border-gray-200", warning.bg)}
              >
                <p className="text-[11px] font-semibold opacity-70 mb-1">{warning.label}</p>
                <p className={cn("text-2xl font-bold", warning.color)}>{warning.count}</p>
                <div className="mt-2 flex items-center text-[10px] font-medium opacity-60">
                  立即前往 <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <h3 className="font-bold text-lg mb-4">运营快捷入口</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: '审核企业', count: 12, icon: Building2, color: 'text-blue-600', bg: 'hover:bg-blue-50' },
              { label: '审核岗位', count: 45, icon: Briefcase, color: 'text-emerald-600', bg: 'hover:bg-emerald-50' },
            ].map((action) => (
              <button key={action.label} className={cn("w-full flex items-center justify-between p-3 rounded-xl transition-colors border border-gray-100", action.bg)}>
                <div className="flex items-center gap-3">
                  <action.icon className={cn("w-4 h-4", action.color)} />
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#646D76] bg-gray-100 px-2 py-0.5 rounded-full">{action.count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

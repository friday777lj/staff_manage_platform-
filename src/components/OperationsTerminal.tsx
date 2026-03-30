import React from 'react';
import { 
  LayoutDashboard, Database, ShieldAlert, Clock, 
  CheckCircle2, AlertCircle, Filter, Download, 
  Plus, MoreHorizontal, Settings, Trash2, 
  Edit, ExternalLink, PieChart, LineChart, 
  Calendar, MapPin, Mail, Phone, Lock, 
  Unlock, RefreshCw, CheckCircle, XCircle,
  TrendingUp, BarChart3, Users, Briefcase, Building2
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, PieChart as RePieChart, 
  Pie, Cell, LineChart as ReLineChart, Line, Legend
} from 'recharts';
import { cn } from '../utils';
import { OperationLog, HealthMetric } from '../types';
import { operationsData, healthMetricsData, platformLoadData } from '../constants';

interface OperationsTerminalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  opSubTab: string;
  setOpSubTab: (v: string) => void;
}

export const OperationsTerminal: React.FC<OperationsTerminalProps> = ({
  activeTab,
  setActiveTab,
  opSubTab,
  setOpSubTab
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">运营管理终端</h2>
          <p className="text-[#646D76] mt-1">监控平台运行状态、处理系统告警及管理基础数据。</p>
        </div>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setOpSubTab('运营日志')}
          className={cn("px-4 py-1.5 text-sm font-medium rounded-lg transition-all", opSubTab === '运营日志' ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700")}
        >
          运营日志
        </button>
        <button 
          onClick={() => setOpSubTab('系统健康度')}
          className={cn("px-4 py-1.5 text-sm font-medium rounded-lg transition-all", opSubTab === '系统健康度' ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700")}
        >
          系统健康度
        </button>
      </div>

      {opSubTab === '运营日志' ? (
        <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold">系统操作日志</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-50 rounded-lg border border-gray-100">
                <Filter className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-50 rounded-lg border border-gray-100">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[#646D76] text-[10px] uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">时间</th>
                  <th className="px-6 py-4 font-bold">操作员</th>
                  <th className="px-6 py-4 font-bold">模块</th>
                  <th className="px-6 py-4 font-bold">操作内容</th>
                  <th className="px-6 py-4 font-bold">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E3E6]">
                {operationsData.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-[#646D76]">{log.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">{log.operator}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{log.module}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{log.action}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", log.status === '成功' ? "bg-emerald-500" : "bg-red-500")} />
                        <span className="text-xs font-medium">{log.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthMetricsData.map((metric) => (
              <div key={metric.label} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <metric.icon className={cn("w-5 h-5", metric.status === '正常' ? "text-emerald-500" : "text-amber-500")} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    metric.status === '正常' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {metric.status}
                  </span>
                </div>
                <p className="text-xs text-[#646D76] font-medium mb-1">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E1E3E6] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold">平台负载与并发趋势</h3>
                <p className="text-sm text-[#646D76]">实时监控系统资源占用与用户访问量</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={platformLoadData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="load" name="系统负载 (%)" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="concurrency" name="并发用户" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

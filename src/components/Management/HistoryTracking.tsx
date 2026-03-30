import React from 'react';
import { Search } from 'lucide-react';
import { Intern } from '../../types';
import { cn } from '../../utils';

interface HistoryTrackingProps {
  interns: Intern[];
  historySearchStudent: string;
  setHistorySearchStudent: (v: string) => void;
  historyStatusFilter: string;
  setHistoryStatusFilter: (v: string) => void;
}

const HistoryTracking: React.FC<HistoryTrackingProps> = ({
  interns,
  historySearchStudent,
  setHistorySearchStudent,
  historyStatusFilter,
  setHistoryStatusFilter
}) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">全流程履历追溯</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索学生姓名..."
              value={historySearchStudent}
              onChange={(e) => setHistorySearchStudent(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <select 
            value={historyStatusFilter}
            onChange={(e) => setHistoryStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm outline-none"
          >
            <option>全部状态</option>
            <option>已转正</option>
            <option>已离职</option>
            <option>实习中</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">学生 ID / 姓名</th>
                <th className="px-6 py-4 font-semibold">当前/最后企业</th>
                <th className="px-6 py-4 font-semibold">入职日期</th>
                <th className="px-6 py-4 font-semibold">履历状态</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E3E6]">
              {interns
                .filter(i => !historySearchStudent || i.name.includes(historySearchStudent))
                .filter(i => historyStatusFilter === '全部状态' || i.status === historyStatusFilter)
                .map((intern) => (
                <tr key={intern.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#646D76] font-mono">{intern.studentId}</span>
                      <span className="text-sm font-semibold">{intern.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{intern.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#646D76]">{intern.startDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-medium px-2.5 py-1 rounded-full",
                      intern.status === '已转正' ? "bg-emerald-50 text-emerald-600" : 
                      intern.status === '已离职' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {intern.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-blue-600 hover:underline">查看全流程</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTracking;

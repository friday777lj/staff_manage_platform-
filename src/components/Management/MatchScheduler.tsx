import React from 'react';
import { Match } from '../../types';
import { cn } from '../../utils';

interface MatchSchedulerProps {
  matches: Match[];
  matchStatusFilter: string;
  setMatchStatusFilter: (v: string) => void;
  matchLaggingFilter: boolean;
  setMatchLaggingFilter: (v: boolean) => void;
  setSelectedMatch: (m: Match | null) => void;
}

const MatchScheduler: React.FC<MatchSchedulerProps> = ({
  matches,
  matchStatusFilter,
  setMatchStatusFilter,
  matchLaggingFilter,
  setMatchLaggingFilter,
  setSelectedMatch
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">人岗匹配与锁定调度</h2>
          <p className="text-[#646D76] mt-1">核心调度模块：管理学生与岗位的匹配、锁定及状态流转。</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          手动匹配
        </button>
      </div>

      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#646D76]">匹配状态:</span>
          <select 
            value={matchStatusFilter}
            onChange={(e) => setMatchStatusFilter(e.target.value)}
            className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
          >
            <option>全部</option>
            <option>待匹配</option>
            <option>已锁定</option>
            <option>已绑定</option>
            <option>已释放</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="lagging" 
            checked={matchLaggingFilter}
            onChange={(e) => setMatchLaggingFilter(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label htmlFor="lagging" className="text-sm text-[#646D76]">滞后匹配</label>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">匹配 ID</th>
                <th className="px-6 py-4 font-semibold">学生姓名</th>
                <th className="px-6 py-4 font-semibold">岗位名称</th>
                <th className="px-6 py-4 font-semibold">匹配状态</th>
                <th className="px-6 py-4 font-semibold">面试状态</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E3E6]">
              {matches
                .filter(m => matchStatusFilter === '全部' || m.matchStatus === matchStatusFilter)
                .map((match) => (
                <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-[#646D76]">{match.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold">{match.studentName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{match.jobTitle}</p>
                    <p className="text-xs text-[#646D76]">{match.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-medium px-2.5 py-1 rounded-full",
                      match.matchStatus === '待匹配' ? "bg-gray-100 text-gray-600" : 
                      match.matchStatus === '已锁定' ? "bg-amber-50 text-amber-600" : 
                      match.matchStatus === '已绑定' ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                    )}>
                      {match.matchStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{match.interviewStatus}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedMatch(match)}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      详情
                    </button>
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

export default MatchScheduler;

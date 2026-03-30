import React from 'react';
import { Student } from '../../types';
import { cn } from '../../utils';

interface SchoolPoolProps {
  students: Student[];
  stuJobTypeFilter: string;
  setStuJobTypeFilter: (v: string) => void;
  stuStatusFilter: string;
  setStuStatusFilter: (v: string) => void;
  setSelectedStudent: (s: Student | null) => void;
}

const SchoolPool: React.FC<SchoolPoolProps> = ({
  students,
  stuJobTypeFilter,
  setStuJobTypeFilter,
  stuStatusFilter,
  setStuStatusFilter,
  setSelectedStudent
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">院校资源池</h2>
          <p className="text-[#646D76] mt-1">管理合作院校、学生分布及就业状态。</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          新增学生
        </button>
      </div>

      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#646D76]">岗位类型:</span>
          <select 
            value={stuJobTypeFilter}
            onChange={(e) => setStuJobTypeFilter(e.target.value)}
            className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
          >
            <option>全部</option>
            <option>实习</option>
            <option>正式</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#646D76]">学生状态:</span>
          <select 
            value={stuStatusFilter}
            onChange={(e) => setStuStatusFilter(e.target.value)}
            className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
          >
            <option>全部</option>
            <option>待推荐</option>
            <option>已推荐</option>
            <option>已入岗</option>
            <option>已转正</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">学生 ID / 姓名</th>
                <th className="px-6 py-4 font-semibold">学校 / 专业</th>
                <th className="px-6 py-4 font-semibold">行为评分 / 风险</th>
                <th className="px-6 py-4 font-semibold">学生状态</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E3E6]">
              {students
                .filter(stu => stuJobTypeFilter === '全部' || stu.jobType === stuJobTypeFilter)
                .filter(stu => stuStatusFilter === '全部' || stu.status === stuStatusFilter)
                .map((stu) => (
                <tr key={stu.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#646D76] font-mono">{stu.id}</span>
                      <span className="text-sm font-semibold">{stu.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{stu.school}</p>
                    <p className="text-xs text-[#646D76] mt-0.5">{stu.major}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{stu.behaviorScore}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                        stu.riskLevel === '高' ? "bg-red-50 text-red-600" : 
                        stu.riskLevel === '中' ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {stu.riskLevel}风险
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-medium px-2.5 py-1 rounded-full",
                      stu.status === '待推荐' ? "bg-gray-100 text-gray-600" : 
                      stu.status === '已推荐' ? "bg-blue-50 text-blue-600" : 
                      stu.status === '已入岗' ? "bg-emerald-50 text-emerald-600" : "bg-purple-50 text-purple-600"
                    )}>
                      {stu.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedStudent(stu)}
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

export default SchoolPool;

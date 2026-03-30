import React from 'react';
import { Job } from '../../types';
import { cn } from '../../utils';

interface JobPoolProps {
  jobs: Job[];
  jobKeyFilter: string;
  setJobKeyFilter: (v: string) => void;
  setSelectedJob: (j: Job | null) => void;
}

const JobPool: React.FC<JobPoolProps> = ({
  jobs,
  jobKeyFilter,
  setJobKeyFilter,
  setSelectedJob
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">岗位资源池</h2>
          <p className="text-[#646D76] mt-1">管理所有企业发布的实习及正式岗位。</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          发布岗位
        </button>
      </div>

      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#646D76]">重点岗位:</span>
          <select 
            value={jobKeyFilter}
            onChange={(e) => setJobKeyFilter(e.target.value)}
            className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
          >
            <option>全部</option>
            <option>是</option>
            <option>否</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">岗位 ID / 名称</th>
                <th className="px-6 py-4 font-semibold">所属企业</th>
                <th className="px-6 py-4 font-semibold">岗位评分 / 风险</th>
                <th className="px-6 py-4 font-semibold">岗位类型</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E3E6]">
              {jobs
                .filter(job => jobKeyFilter === '全部' || job.isKeyJob === (jobKeyFilter === '是'))
                .map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#646D76] font-mono">{job.id}</span>
                      <span className="text-sm font-semibold">{job.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{job.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{job.score}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                        job.riskLevel === '高' ? "bg-red-50 text-red-600" : 
                        job.riskLevel === '中' ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {job.riskLevel}风险
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      job.roleType === '实习' ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {job.roleType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedJob(job)}
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

export default JobPool;

import React from 'react';
import { Building2, Search, TrendingUp, Briefcase } from 'lucide-react';
import { cn } from '../../utils';
import { Enterprise } from '../../types';

interface EnterprisePoolProps {
  enterprises: Enterprise[];
  entInternDemandFilter: string;
  setEntInternDemandFilter: (v: string) => void;
  setSelectedEnterprise: (e: Enterprise | null) => void;
}

const EnterprisePool: React.FC<EnterprisePoolProps> = ({
  enterprises,
  entInternDemandFilter,
  setEntInternDemandFilter,
  setSelectedEnterprise
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">企业资源池</h2>
          <p className="text-[#646D76] mt-1">管理合作企业信息、行业分布及合作状态。</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          新增企业
        </button>
      </div>

      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#646D76]">实习岗位需求:</span>
          <select 
            value={entInternDemandFilter}
            onChange={(e) => setEntInternDemandFilter(e.target.value)}
            className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
          >
            <option>全部</option>
            <option>是</option>
            <option>否</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '企业总数', value: '1,284', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '覆盖地域', value: '24个城市', icon: Search, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '核心行业', value: '互联网/金融', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '合作进度', value: '85% 已激活', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                <p className="text-xs text-[#646D76] font-medium">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">企业 ID / 名称</th>
                <th className="px-6 py-4 font-semibold">所属行业</th>
                <th className="px-6 py-4 font-semibold">合作评分 / 风险</th>
                <th className="px-6 py-4 font-semibold">实习需求</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E3E6]">
              {enterprises
                .filter(ent => entInternDemandFilter === '全部' || ent.hasInternDemand === (entInternDemandFilter === '是'))
                .map((ent) => (
                <tr key={ent.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#646D76] font-mono">{ent.id}</span>
                      <span className="text-sm font-semibold">{ent.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{ent.industry}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{ent.score}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                        ent.riskLevel === '高' ? "bg-red-50 text-red-600" : 
                        ent.riskLevel === '中' ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {ent.riskLevel}风险
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      ent.hasInternDemand ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400"
                    )}>
                      {ent.hasInternDemand ? '有需求' : '无需求'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedEnterprise(ent)}
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

export default EnterprisePool;

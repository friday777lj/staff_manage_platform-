import React from 'react';
import { 
  Users, 
  Award, 
  ShieldAlert, 
  Download, 
  TrendingUp, 
  ChevronRight,
  Edit3,
  Building2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../../utils';
import { RoleTag } from '../common/RoleTag';

interface InternManagementProps {
  interns: any[];
  entInternJobFilter: string;
  setEntInternJobFilter: (filter: string) => void;
  entInternPerfFilter: string;
  setEntInternPerfFilter: (filter: string) => void;
  selectedInternDetail: any;
  setSelectedInternDetail: (intern: any) => void;
}

const InternManagement: React.FC<InternManagementProps> = ({
  interns,
  entInternJobFilter,
  setEntInternJobFilter,
  entInternPerfFilter,
  setEntInternPerfFilter,
  selectedInternDetail,
  setSelectedInternDetail,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">我的实习生管理</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-[#E1E3E6] text-[#1A1C1E] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            批量导出名单
          </button>
          <select 
            value={entInternJobFilter}
            onChange={(e) => setEntInternJobFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E1E3E6] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option>全部岗位</option>
            <option>后端开发</option>
            <option>前端开发</option>
            <option>UI/UX设计</option>
          </select>
          <select 
            value={entInternPerfFilter}
            onChange={(e) => setEntInternPerfFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E1E3E6] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option>全部表现</option>
            <option>优秀</option>
            <option>良好</option>
            <option>需改进</option>
          </select>
        </div>
      </div>

      {!selectedInternDetail && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: '在岗人数', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: '表现优秀', value: '4', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: '需改进', value: '1', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
            { label: '平均进度', value: '82%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
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
      )}

      {selectedInternDetail ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setSelectedInternDetail(null)}
            className="flex items-center gap-2 text-sm text-[#646D76] hover:text-[#1A1C1E] transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            返回实习生列表
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-[#E1E3E6] shadow-sm">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-100">
                      {selectedInternDetail.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-bold">{selectedInternDetail.name}</h3>
                        <RoleTag type={selectedInternDetail.position.includes('实习') ? '实习' : '正式'} />
                      </div>
                      <p className="text-[#646D76] flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {selectedInternDetail.company} · {selectedInternDetail.position}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                          入职日期：{selectedInternDetail.joinDate}
                        </div>
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">
                          实习周期：3个月
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#646D76] mb-1">综合表现评分</p>
                    <p className="text-4xl font-black text-blue-600">{selectedInternDetail.dailyRate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">培训任务完成率</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{selectedInternDetail.completionRate}%</span>
                      <span className="text-xs text-emerald-600 font-bold mb-1">+5%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">能力诊断结果</p>
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-xs font-bold",
                      selectedInternDetail.diagnosisResult === '能力达标' ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {selectedInternDetail.diagnosisResult}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">认证状态</p>
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-xs font-bold",
                      selectedInternDetail.certStatus === '已认证' ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-[#646D76]"
                    )}>
                      {selectedInternDetail.certStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    实习表现趋势
                  </h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { month: '1月', score: 75 },
                        { month: '2月', score: 82 },
                        { month: '3月', score: 88 },
                      ]}>
                        <defs>
                          <linearGradient id="colorScoreIntern" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 10}} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorScoreIntern)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    能力诊断与学习
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-[#646D76] font-bold mb-2">待补强能力点</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedInternDetail.diagnosis.weaknesses.map((w: string) => (
                          <span key={w} className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-[10px] font-bold">{w}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#646D76] font-bold mb-2">推荐补强课程</p>
                      <div className="space-y-2">
                        {selectedInternDetail.diagnosis.trainingRecords.map((r: any) => (
                          <div key={r.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-xs font-medium">{r.name}</span>
                            <span className="text-[10px] text-blue-600 font-bold">{r.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm sticky top-6">
                <h4 className="font-bold mb-6 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  企业导师评价
                </h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#646D76]">实习表现评分</label>
                      <input 
                        type="number" 
                        defaultValue={selectedInternDetail.dailyRate}
                        className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#646D76]">去留建议</label>
                      <select className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none">
                        <option>建议留用</option>
                        <option>继续考察</option>
                        <option>不建议留用</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#646D76]">综合评语与补强建议</label>
                    <textarea 
                      rows={4}
                      placeholder="请输入对实习生的详细评价及后续学习建议..."
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200">提交评价</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E1E3E6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">实习生姓名 / ID</th>
                  <th className="px-6 py-4 font-semibold">所属岗位</th>
                  <th className="px-6 py-4 font-semibold">实习表现</th>
                  <th className="px-6 py-4 font-semibold">能力诊断</th>
                  <th className="px-6 py-4 font-semibold">培训进度</th>
                  <th className="px-6 py-4 font-semibold text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E3E6]">
                {interns
                  .filter(intern => entInternJobFilter === '全部岗位' || intern.position === entInternJobFilter)
                  .filter(intern => entInternPerfFilter === '全部表现' || intern.result === entInternPerfFilter)
                  .map(intern => (
                  <tr key={intern.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedInternDetail(intern)}
                        className="text-left group"
                      >
                        <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors">{intern.name}</p>
                        <span className="text-[10px] text-[#646D76] font-mono">{intern.id}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{intern.position}</p>
                      <p className="text-[10px] text-[#646D76]">导师：{intern.owner}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{intern.dailyRate}</span>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-bold",
                          intern.result === '优秀' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                        )}>{intern.result}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-lg text-[10px] font-bold",
                        intern.diagnosisResult === '能力达标' ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
                      )}>{intern.diagnosisResult}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="font-bold">{intern.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1">
                          <div 
                            className="bg-blue-600 h-full rounded-full" 
                            style={{width: `${intern.completionRate}%`}} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedInternDetail(intern)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-bold"
                      >
                        管理详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternManagement;

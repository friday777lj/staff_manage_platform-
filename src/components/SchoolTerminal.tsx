import React from 'react';
import { 
  Users, GraduationCap, UserCheck, TrendingUp, 
  Search, Menu, User, ShieldAlert, Award, 
  FileText, Target, History, Zap, BookOpen,
  ArrowUpRight, LayoutDashboard, Briefcase
} from 'lucide-react';
import { cn } from '../utils';
import { Student, Match } from '../types';

interface SchoolTerminalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  matches: Match[];
  selectedStudent: Student | null;
  setSelectedStudent: (s: Student | null) => void;
  setIsStuScoreModalOpen: (v: boolean) => void;
  completeCourse: (studentId: string, courseInfo: any) => void;
  setHistorySearchStudent: (v: string) => void;
  setSelectedMatch: (m: Match | null) => void;
}

export const SchoolTerminal: React.FC<SchoolTerminalProps> = ({
  activeTab,
  setActiveTab,
  students,
  setStudents,
  matches,
  selectedStudent,
  setSelectedStudent,
  setIsStuScoreModalOpen,
  completeCourse,
  setHistorySearchStudent,
  setSelectedMatch
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">院校管理终端</h2>
          <p className="text-[#646D76] mt-1">管理本校学生信息、实习进度及就业状态。</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#646D76]">院校类型:</span>
          <select className="bg-gray-100 border-none rounded-lg text-sm px-3 py-1.5 outline-none">
            <option>全部</option>
            <option>985/211</option>
            <option>一本</option>
            <option>二本</option>
            <option>大专</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '学生总数', value: '12,408', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '院校分类', value: '985/211 占比 45%', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '学生状态', value: '65% 待推荐', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '简历更新', value: '92% 完整度', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
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
                <th className="px-6 py-4 font-semibold">学生 ID / 姓名</th>
                <th className="px-6 py-4 font-semibold">学校 / 专业</th>
                <th className="px-6 py-4 font-semibold">行为评分 / 风险</th>
                <th className="px-6 py-4 font-semibold">学生状态</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E3E6]">
              {students.map((stu) => (
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
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => setSelectedStudent(stu)}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      查看
                    </button>
                    <button 
                      onClick={() => {
                        setHistorySearchStudent(stu.name);
                        setActiveTab('数据中心');
                      }}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      查看履历
                    </button>
                    <button className="text-sm font-medium text-blue-600 hover:underline">推荐岗位</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                  {selectedStudent.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-[#646D76]">{selectedStudent.school} · {selectedStudent.major}</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-sm text-[#646D76]">ID: {selectedStudent.id}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Basic Info */}
              <section>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  基本信息
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-[#646D76] mb-1">年级</p>
                    <p className="text-sm font-medium">{selectedStudent.grade}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646D76] mb-1">联系电话</p>
                    <p className="text-sm font-medium">138****8888</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646D76] mb-1">学生状态</p>
                    <p className="text-sm font-medium">{selectedStudent.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646D76] mb-1">行为评分</p>
                    <p className="text-sm font-bold text-blue-600">{selectedStudent.behaviorScore}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646D76] mb-1">风险等级</p>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      selectedStudent.riskLevel === '高' ? "bg-red-100 text-red-600" : 
                      selectedStudent.riskLevel === '中' ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
                    )}>
                      {selectedStudent.riskLevel}
                    </span>
                  </div>
                </div>
              </section>

              {/* Penalty History Section */}
              <section>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  行为惩罚记录
                </h4>
                {selectedStudent.penaltyHistory && selectedStudent.penaltyHistory.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStudent.penaltyHistory.map((penalty: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-red-50/30 rounded-xl border border-red-100">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <div>
                            <p className="text-sm font-bold text-red-900">{penalty.type} (扣减: {penalty.deduction})</p>
                            <p className="text-xs text-[#646D76] mt-1">原因：{penalty.reason}</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#646D76] font-mono">{penalty.date}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-sm text-[#646D76]">暂无违规记录</p>
                  </div>
                )}
              </section>

              {/* Scoring Module */}
              <section className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    学生评分体系
                  </h4>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsStuScoreModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
                    >
                      维护评分
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-[#646D76]">综合评分</p>
                        <p className="text-2xl font-black text-blue-600">{selectedStudent.score}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-200">
                        {selectedStudent.gradeLevel}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: '学历评分', value: selectedStudent.scoreBreakdown.education, icon: GraduationCap },
                    { label: '证书评分', value: selectedStudent.scoreBreakdown.certificates, icon: Award },
                    { label: '成绩评分', value: selectedStudent.scoreBreakdown.grades, icon: FileText },
                    { label: '项目评分', value: selectedStudent.scoreBreakdown.projects, icon: Target },
                    { label: '实习评分', value: selectedStudent.scoreBreakdown.internships, icon: Briefcase },
                  ].map((item) => (
                    <div key={item.label} className="bg-white p-4 rounded-2xl border border-blue-50 shadow-sm">
                      <item.icon className="w-4 h-4 text-blue-400 mb-2" />
                      <p className="text-[10px] text-[#646D76] font-bold uppercase">{item.label}</p>
                      <p className="text-lg font-bold text-blue-900">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-blue-100 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                    更新评分
                  </button>
                </div>
              </section>

              {/* Improvement Path Module */}
              <section className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    能力提升闭环 (Improvement Loop)
                  </h4>
                  <div className="text-right">
                    <p className="text-xs text-[#646D76]">最近评分更新</p>
                    <p className="text-sm font-bold text-emerald-600">{selectedStudent.lastScoreUpdateTime || '暂无更新'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Improvement History */}
                  <div>
                    <p className="text-xs font-bold text-[#646D76] uppercase mb-4 flex items-center gap-2">
                      <History className="w-4 h-4" />
                      成长轨迹 (Growth Trajectory)
                    </p>
                    {selectedStudent.improvementHistory && selectedStudent.improvementHistory.length > 0 ? (
                      <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
                        {selectedStudent.improvementHistory.map((item: any, idx: number) => (
                          <div key={item.id} className="relative pl-8">
                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-emerald-500 z-10" />
                            <div className="bg-white p-4 rounded-2xl border border-emerald-50 shadow-sm">
                              <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-bold text-emerald-900">{item.courseName}</p>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  +{item.scoreIncrease}分
                                </span>
                              </div>
                              <p className="text-xs text-[#646D76]">提升技能：{item.skillImproved}</p>
                              <p className="text-[10px] text-[#A1A7AF] mt-2 font-mono">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-emerald-200">
                        <p className="text-sm text-[#646D76]">暂无提升记录，请先完成推荐课程</p>
                      </div>
                    )}
                  </div>

                  {/* Right: AI Recommendations & Active Path */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-[#646D76] uppercase mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        AI 智能提升建议
                      </p>
                      <div className="bg-white p-5 rounded-2xl border border-emerald-50 shadow-sm">
                        <p className="text-sm text-emerald-900 leading-relaxed italic">
                          "根据最近的面试反馈，你在【{selectedStudent.skillTags?.[0] || '专业表达'}】方面有待加强。建议优先完成《面试技巧进阶》课程。"
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#646D76] uppercase mb-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        推荐学习路径
                      </p>
                      <div className="space-y-3">
                        {[
                          { id: 'C1', title: '面试技巧进阶', skill: '沟通表达', score: 5, status: '推荐' },
                          { id: 'C2', title: '专业技能强化', skill: '专业能力', score: 8, status: '推荐' },
                        ].map(course => (
                          <div key={course.id} className="bg-white p-4 rounded-2xl border border-emerald-50 shadow-sm flex justify-between items-center group hover:border-emerald-200 transition-all">
                            <div>
                              <p className="text-sm font-bold text-gray-900">{course.title}</p>
                              <p className="text-xs text-[#646D76] mt-1">提升：{course.skill} · 预计 +{course.score}分</p>
                            </div>
                            <button 
                              onClick={() => completeCourse(selectedStudent.id, {
                                title: course.title,
                                skillImproved: course.skill,
                                scoreIncrease: course.score
                              })}
                              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-emerald-200"
                            >
                              完成学习
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Matching Records Module */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-600" />
                    匹配记录
                  </h4>
                </div>
                <div className="border border-[#E1E3E6] rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr className="text-[10px] uppercase font-bold text-[#646D76]">
                        <th className="px-4 py-3">岗位名称</th>
                        <th className="px-4 py-3">企业</th>
                        <th className="px-4 py-3">面试结果</th>
                        <th className="px-4 py-3">入岗情况</th>
                        <th className="px-4 py-3 text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E3E6]">
                      {matches
                        .filter(match => match.studentId === selectedStudent.id)
                        .map(match => (
                          <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium">{match.jobTitle}</td>
                            <td className="px-4 py-3 text-sm text-[#646D76]">{match.company}</td>
                            <td className="px-4 py-3">
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                match.interviewStatus === '已通过' ? "bg-emerald-50 text-emerald-600" : 
                                match.interviewStatus === '已淘汰' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                              )}>
                                {match.interviewStatus}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-xs text-[#646D76]">{match.hireStatus}</span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button 
                                onClick={() => {
                                  setSelectedMatch(match);
                                  setActiveTab('人岗匹配');
                                  setSelectedStudent(null);
                                }}
                                className="text-xs text-blue-600 font-bold hover:underline"
                              >
                                详情
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

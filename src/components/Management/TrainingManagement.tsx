import React from 'react';
import { Users, Award } from 'lucide-react';
import { cn } from '../../utils';
import { Course, Certification } from '../../types';

interface TrainingManagementProps {
  trainingSubTab: string;
  setTrainingSubTab: (v: string) => void;
  coursesData: Course[];
  certificationsData: Certification[];
}

const TrainingManagement: React.FC<TrainingManagementProps> = ({
  trainingSubTab,
  setTrainingSubTab,
  coursesData,
  certificationsData
}) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">培训与认证管理</h2>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setTrainingSubTab('课程库')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-lg transition-all", trainingSubTab === '课程库' ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700")}
          >
            课程库
          </button>
          <button 
            onClick={() => setTrainingSubTab('认证管理')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-lg transition-all", trainingSubTab === '认证管理' ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700")}
          >
            认证管理
          </button>
        </div>
      </div>

      {trainingSubTab === '课程库' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden flex flex-col">
              <div className="h-40 bg-gray-100 relative">
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                  {course.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-[#646D76] mb-4 flex-1">{course.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-[#646D76]">{course.enrolledCount} 人学习</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-amber-600">+{course.scoreValue} 分</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">认证名称</th>
                  <th className="px-6 py-4 font-semibold">颁发机构</th>
                  <th className="px-6 py-4 font-semibold">持证人数</th>
                  <th className="px-6 py-4 font-semibold">分值权重</th>
                  <th className="px-6 py-4 font-semibold text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E3E6]">
                {certificationsData.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold">{cert.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{cert.issuer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">{cert.holderCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-blue-600">{cert.scoreWeight}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-blue-600 hover:underline">管理持证人</button>
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

export default TrainingManagement;

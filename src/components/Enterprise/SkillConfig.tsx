import React from 'react';
import { Plus, History } from 'lucide-react';

interface SkillConfigProps {
  setIsSkillConfigModalOpen: (open: boolean) => void;
}

const SkillConfig: React.FC<SkillConfigProps> = ({ setIsSkillConfigModalOpen }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">技能点配置</h2>
          <p className="text-[#646D76] mt-1">定义各岗位的核心能力模型，作为AI匹配与培训的基准。</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          新增能力模型
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { role: '后端开发工程师', skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'], level: 'L3' },
          { role: '前端开发工程师', skills: ['React', 'TypeScript', 'Tailwind', 'Vite'], level: 'L3' },
          { role: 'UI/UX 设计师', skills: ['Figma', 'User Research', 'Prototyping'], level: 'L2' },
        ].map((config) => (
          <div key={config.role} className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm hover:border-blue-300 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg">{config.role}</h4>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">等级: {config.level}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {config.skills.map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-50 text-[#646D76] rounded text-[10px] font-medium">{skill}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsSkillConfigModalOpen(true)}
                className="flex-1 py-2 bg-gray-50 text-[#1A1C1E] rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors"
              >
                编辑模型
              </button>
              <button className="px-3 py-2 bg-gray-50 text-[#646D76] rounded-xl hover:text-red-600 transition-colors">
                <History className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillConfig;

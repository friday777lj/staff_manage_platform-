import React from 'react';
import { Plus } from 'lucide-react';
import { Student, Job, Enterprise } from '../types';

interface StudentScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStudent: Student | null;
  updateStudentScore: (studentId: string, newBreakdown: any) => void;
}

export const StudentScoreModal: React.FC<StudentScoreModalProps> = ({
  isOpen,
  onClose,
  selectedStudent,
  updateStudentScore,
}) => {
  if (!isOpen || !selectedStudent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h3 className="text-lg font-bold">修改学生评分</h3>
          <button onClick={onClose}>
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newBreakdown = {
              education: Number(formData.get('education')),
              certificates: Number(formData.get('certificates')),
              grades: Number(formData.get('grades')),
              projects: Number(formData.get('projects')),
              internships: Number(formData.get('internships')),
            };
            updateStudentScore(selectedStudent.id, newBreakdown);
            onClose();
          }}
          className="p-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#646D76]">教育背景</label>
              <input name="education" type="number" defaultValue={selectedStudent.scoreBreakdown?.education} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#646D76]">证书评分</label>
              <input name="certificates" type="number" defaultValue={selectedStudent.scoreBreakdown?.certificates} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#646D76]">在校成绩</label>
              <input name="grades" type="number" defaultValue={selectedStudent.scoreBreakdown?.grades} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#646D76]">项目评分</label>
              <input name="projects" type="number" defaultValue={selectedStudent.scoreBreakdown?.projects} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-[#646D76]">实习评分</label>
              <input name="internships" type="number" defaultValue={selectedStudent.scoreBreakdown?.internships} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-100 text-sm font-bold rounded-xl">取消</button>
            <button type="submit" className="flex-1 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200">保存更新</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface JobScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: Job | null;
  updateJobScore: (jobId: string, newScore: number) => void;
}

export const JobScoreModal: React.FC<JobScoreModalProps> = ({
  isOpen,
  onClose,
  selectedJob,
  updateJobScore,
}) => {
  if (!isOpen || !selectedJob) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="p-6 bg-orange-600 text-white flex justify-between items-center">
          <h3 className="text-lg font-bold">修改岗位评分</h3>
          <button onClick={onClose}>
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            updateJobScore(selectedJob.id, Number(formData.get('score')));
            onClose();
          }}
          className="p-6 space-y-4"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#646D76]">岗位评分 (0-100)</label>
            <input name="score" type="number" defaultValue={selectedJob.score} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20" />
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-100 text-sm font-bold rounded-xl">取消</button>
            <button type="submit" className="flex-1 py-2 bg-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-200">保存</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EnterpriseScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEnterprise: Enterprise | null;
  updateEnterpriseScore: (entId: string, newScore: number) => void;
}

export const EnterpriseScoreModal: React.FC<EnterpriseScoreModalProps> = ({
  isOpen,
  onClose,
  selectedEnterprise,
  updateEnterpriseScore,
}) => {
  if (!isOpen || !selectedEnterprise) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="p-6 bg-orange-600 text-white flex justify-between items-center">
          <h3 className="text-lg font-bold">修改企业评分</h3>
          <button onClick={onClose}>
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            updateEnterpriseScore(selectedEnterprise.id, Number(formData.get('score')));
            onClose();
          }}
          className="p-6 space-y-4"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#646D76]">企业评分 (0-100)</label>
            <input name="score" type="number" defaultValue={selectedEnterprise.score} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20" />
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-100 text-sm font-bold rounded-xl">取消</button>
            <button type="submit" className="flex-1 py-2 bg-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-200">保存</button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';
import { cn } from '../utils';
import { 
  Student, Job, Enterprise, Match, Intern, 
} from '../types';
import { 
  coursesData, certificationsData,
} from '../constants';

// Sub-components
import Dashboard from './Management/Dashboard';
import EnterprisePool from './Management/EnterprisePool';
import JobPool from './Management/JobPool';
import SchoolPool from './Management/SchoolPool';
import MatchScheduler from './Management/MatchScheduler';
import HistoryTracking from './Management/HistoryTracking';
import TrainingManagement from './Management/TrainingManagement';
import AnalyticsDashboard from './Management/AnalyticsDashboard';

interface ManagementTerminalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  enterprises: Enterprise[];
  setEnterprises: React.Dispatch<React.SetStateAction<Enterprise[]>>;
  matches: Match[];
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  interns: Intern[];
  setInterns: React.Dispatch<React.SetStateAction<Intern[]>>;
  
  // Filters & States
  entInternDemandFilter: string;
  setEntInternDemandFilter: (v: string) => void;
  jobKeyFilter: string;
  setJobKeyFilter: (v: string) => void;
  stuJobTypeFilter: string;
  setStuJobTypeFilter: (v: string) => void;
  stuStatusFilter: string;
  setStuStatusFilter: (v: string) => void;
  matchStatusFilter: string;
  setMatchStatusFilter: (v: string) => void;
  matchLaggingFilter: boolean;
  setMatchLaggingFilter: (v: boolean) => void;
  historySearchStudent: string;
  setHistorySearchStudent: (v: string) => void;
  historyStatusFilter: string;
  setHistoryStatusFilter: (v: string) => void;
  trainingSubTab: string;
  setTrainingSubTab: (v: string) => void;
  
  // Modals & Selected Items
  selectedStudent: Student | null;
  setSelectedStudent: (s: Student | null) => void;
  selectedJob: Job | null;
  setSelectedJob: (j: Job | null) => void;
  selectedEnterprise: Enterprise | null;
  setSelectedEnterprise: (e: Enterprise | null) => void;
  selectedMatch: Match | null;
  setSelectedMatch: (m: Match | null) => void;
  
  // Handlers
  completeCourse: (studentId: string, courseInfo: any) => void;
  setIsStuScoreModalOpen: (v: boolean) => void;
}

export const ManagementTerminal: React.FC<ManagementTerminalProps> = ({
  activeTab,
  setActiveTab,
  students,
  jobs,
  enterprises,
  matches,
  interns,
  entInternDemandFilter,
  setEntInternDemandFilter,
  jobKeyFilter,
  setJobKeyFilter,
  stuJobTypeFilter,
  setStuJobTypeFilter,
  stuStatusFilter,
  setStuStatusFilter,
  matchStatusFilter,
  setMatchStatusFilter,
  matchLaggingFilter,
  setMatchLaggingFilter,
  historySearchStudent,
  setHistorySearchStudent,
  historyStatusFilter,
  setHistoryStatusFilter,
  trainingSubTab,
  setTrainingSubTab,
  setSelectedStudent,
  setSelectedJob,
  setSelectedEnterprise,
  setSelectedMatch,
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {activeTab === 'Dashboard' && (
        <Dashboard setActiveTab={setActiveTab} />
      )}

      {activeTab === '企业资源池' && (
        <EnterprisePool 
          enterprises={enterprises}
          entInternDemandFilter={entInternDemandFilter}
          setEntInternDemandFilter={setEntInternDemandFilter}
          setSelectedEnterprise={setSelectedEnterprise}
        />
      )}

      {activeTab === '岗位资源池' && (
        <JobPool 
          jobs={jobs}
          jobKeyFilter={jobKeyFilter}
          setJobKeyFilter={setJobKeyFilter}
          setSelectedJob={setSelectedJob}
        />
      )}

      {activeTab === '院校资源池' && (
        <SchoolPool 
          students={students}
          stuJobTypeFilter={stuJobTypeFilter}
          setStuJobTypeFilter={setStuJobTypeFilter}
          stuStatusFilter={stuStatusFilter}
          setStuStatusFilter={setStuStatusFilter}
          setSelectedStudent={setSelectedStudent}
        />
      )}

      {activeTab === '人岗匹配' && (
        <MatchScheduler 
          matches={matches}
          matchStatusFilter={matchStatusFilter}
          setMatchStatusFilter={setMatchStatusFilter}
          matchLaggingFilter={matchLaggingFilter}
          setMatchLaggingFilter={setMatchLaggingFilter}
          setSelectedMatch={setSelectedMatch}
        />
      )}

      {activeTab === '数据中心' && (
        <HistoryTracking 
          interns={interns}
          historySearchStudent={historySearchStudent}
          setHistorySearchStudent={setHistorySearchStudent}
          historyStatusFilter={historyStatusFilter}
          setHistoryStatusFilter={setHistoryStatusFilter}
        />
      )}

      {activeTab === '培训与认证' && (
        <TrainingManagement 
          trainingSubTab={trainingSubTab}
          setTrainingSubTab={setTrainingSubTab}
          coursesData={coursesData}
          certificationsData={certificationsData}
        />
      )}

      {activeTab === '数据可视化' && (
        <AnalyticsDashboard />
      )}
    </div>
  );
};

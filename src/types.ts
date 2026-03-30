/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Stat {
  label: string;
  intern: number | string;
  regular: number | string;
  total: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
}

export interface RiskWarning {
  label: string;
  count: number;
  color: string;
  bg: string;
  tab: string;
}

export interface ChartData {
  name?: string;
  month?: string;
  week?: string;
  time?: string;
  [key: string]: any;
}

export interface Student {
  id: string;
  name: string;
  school: string;
  major: string;
  grade: string;
  status: string;
  score: number;
  gradeLevel: string;
  recommendationLimit: number;
  recommendationsUsed: number;
  recommendationLogs: any[];
  behaviorScore: number;
  riskLevel: string;
  penaltyHistory: any[];
  historicalPerformanceWeight: number;
  skillTags: string[];
  improvementHistory: any[];
  lastScoreUpdateTime: string;
  jobType?: string;
  scoreBreakdown: {
    education: number;
    certificates: number;
    grades: number;
    projects: number;
    internships: number;
  };
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  roleType: string;
  status: string;
  score: number;
  description: string;
  requirements: string[];
  skills: string[];
  requiredSkills: string[];
  postedDate: string;
  internshipDemand?: number;
}

export interface Enterprise {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  status: string;
  score: number;
  internshipDemand: number;
  contact: string;
  phone: string;
  lastFollowUp: string;
}

export interface Match {
  id: string;
  studentId: string;
  studentName: string;
  jobId: string;
  jobTitle: string;
  company: string;
  matchDate: string;
  matchStatus: string;
  interviewStatus: string;
  hireStatus: string;
  owner: string;
  roleType: string;
  problem?: string;
  problemStatus?: string;
  lastUpdateTime: string;
  screeningResult?: string;
  failReason?: string;
  conversionRate?: string;
  feedbackTime?: string;
  evaluation?: string;
  hasSkillGap?: boolean;
  skillGaps?: any[];
  recommendedCourses?: string[];
  recommendationTime?: string;
  attendedInterview?: boolean;
  interviewResult?: string;
  interviewTime?: string;
  joined?: boolean;
  joinTime?: string;
  enterpriseRating?: number;
  studentBehavior?: { noShow: boolean; rejected: boolean; reason: string };
  priorityScore?: number;
  matchSource?: string;
  filterReason?: string;
}

export interface SkillPoint {
  id: string;
  name: string;
  category: 'training' | 'internship';
  score: number;
  targetScore: number;
  status: '达标' | '未达标';
}

export interface InternshipTask {
  id: string;
  title: string;
  description: string;
  status: '进行中' | '已完成' | '待评价';
  score?: number;
  feedback?: string;
  deadline: string;
}

export interface Intern {
  id: string;
  jobId: string;
  studentId: string;
  name: string;
  company: string;
  position: string;
  owner: string;
  dailyRate: number;
  weeklyRate: number;
  exceptions: number;
  isOff: boolean;
  offTime: string;
  result: string;
  status: string;
  riskLevel: string;
  isConverted: boolean;
  joinDate: string;
  completionRate: number;
  diagnosisResult: string;
  pendingCoursesCount: number;
  certStatus: string;
  diagnosis: {
    weaknesses: string[];
    trainingRecords: { name: string; status: string; date: string }[];
    certificates: string[];
  };
  skillPointResults?: SkillPoint[];
  internshipTasks?: InternshipTask[];
  riskTags?: string[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  enrolled: number;
  rating: number;
  instructor: string;
  description: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  category: string;
  issuer: string;
  validity: string;
  difficulty: '简单' | '中等' | '困难';
  description: string;
  requirements: string[];
}

export interface OperationLog {
  id: string;
  time: string;
  module: string;
  action: string;
  operator: string;
  status: '成功' | '失败' | '警告';
  details: string;
}

export interface HealthMetric {
  time: string;
  load: number;
  concurrency: number;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  Users, 
  UserCheck, 
  GraduationCap, 
  Settings, 
  Bell, 
  Search, 
  User,
  Menu,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Clock,
  Target,
  History,
  AlertCircle,
  Plus,
  BookOpen,
  Award,
  Download,
  Zap,
  Lock,
  Unlock,
  UserPlus,
  Edit3,
  BarChart3,
  X,
  Filter,
  CheckCircle2,
  AlertOctagon,
  UserMinus,
  UserCheck2,
  ArrowRight,
  HelpCircle,
  Check,
  MessageSquare
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';
import { aiService, type ScoreOutput, type FailureReasonOutput, type LearningPathOutput } from './services/aiService';
import { ManagementTerminal } from './components/ManagementTerminal';
import { EnterpriseTerminal } from './components/EnterpriseTerminal';
import { StudentTerminal } from './components/StudentTerminal';
import { 
  Student, Job, Enterprise, Match, Intern, 
} from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const stats = [
  { label: '企业数量', intern: 842, regular: 442, total: '1,284', change: '+12%', trend: 'up', icon: Building2 },
  { label: '岗位数量', intern: 2150, regular: 1442, total: '3,592', change: '+5.4%', trend: 'up', icon: Briefcase },
  { label: '推荐次数', intern: 5240, regular: 3180, total: '8,420', change: '+18%', trend: 'up', icon: UserCheck },
  { label: '面试次数', intern: 1240, regular: 840, total: '2,080', change: '+8.2%', trend: 'up', icon: Search },
  { label: '入岗人数', intern: 542, regular: 300, total: '842', change: '+10%', trend: 'up', icon: GraduationCap },
  { label: '在岗实习生', intern: 420, regular: 0, total: '420', change: '+4.2%', trend: 'up', icon: Users },
  { label: '培训完成率', intern: '85%', regular: '92%', total: '88.5%', change: '+2.1%', trend: 'up', icon: BookOpen },
  { label: '认证通过率', intern: '78%', regular: '85%', total: '81.5%', change: '+1.5%', trend: 'up', icon: Award },
  { label: '能力待补强学生', intern: 45, regular: 12, total: '57', change: '-5%', trend: 'down', icon: Target },
  { label: '待推送课程', intern: 12, regular: 8, total: '20', change: '+2', trend: 'up', icon: Clock },
];

const riskWarnings = [
  { label: '高风险实习生', count: 12, color: 'text-red-600', bg: 'bg-red-50', tab: '实习生管理' },
  { label: '能力预警实习生', count: 18, color: 'text-orange-600', bg: 'bg-orange-50', tab: '实习生管理' },
  { label: '需关注实习生', count: 28, color: 'text-amber-600', bg: 'bg-amber-50', tab: '实习生管理' },
  { label: '未解决匹配问题', count: 15, color: 'text-blue-600', bg: 'bg-blue-50', tab: '人岗匹配' },
];

const weeklyTrendData = [
  { name: '周一', recommended: 45, placed: 12 },
  { name: '周二', recommended: 52, placed: 18 },
  { name: '周三', recommended: 48, placed: 15 },
  { name: '周四', recommended: 61, placed: 22 },
  { name: '周五', recommended: 55, placed: 20 },
  { name: '周六', recommended: 32, placed: 8 },
  { name: '周日', recommended: 28, placed: 5 },
];

const growthTrendData = [
  { month: '1月', rate: 65 },
  { month: '2月', rate: 68 },
  { month: '3月', rate: 75 },
  { month: '4月', rate: 72 },
  { month: '5月', rate: 78 },
  { month: '6月', rate: 82 },
];

const schoolEmploymentTrend = [
  { month: '1月', rate: 45 },
  { month: '2月', rate: 52 },
  { month: '3月', rate: 58 },
  { month: '4月', rate: 65 },
  { month: '5月', rate: 72 },
  { month: '6月', rate: 88 },
];

const skillPointDistributionData = [
  { module: '基础能力', passRate: 85, avgScore: 78 },
  { module: '工程能力', passRate: 72, avgScore: 65 },
  { module: '场景能力', passRate: 60, avgScore: 58 },
  { module: '综合素质', passRate: 92, avgScore: 85 },
];

const trainingPassRateData = [
  { name: 'Linux基础', passRate: 95 },
  { name: 'SQL能力', passRate: 88 },
  { name: '数据库部署', passRate: 76 },
  { name: '故障排查', passRate: 62 },
  { name: 'HCIE证书', passRate: 45 },
];

const schoolsData = [
  { id: 'SCH001', name: '深圳职业技术大学', colleges: 12, majors: 45, students: 1240, interns: 356, employmentRate: 88.5, expansionPerson: '张三' },
  { id: 'SCH002', name: '广东轻工职业技术学院', colleges: 10, majors: 38, students: 980, interns: 210, employmentRate: 82.4, expansionPerson: '李四' },
  { id: 'SCH003', name: '广州番禺职业技术学院', colleges: 8, majors: 32, students: 850, interns: 150, employmentRate: 75.6, expansionPerson: '张三' },
  { id: 'SCH004', name: '顺德职业技术学院', colleges: 9, majors: 35, students: 1100, interns: 280, employmentRate: 85.2, expansionPerson: '王五' },
];

const collegesAnalysisData: Record<string, any[]> = {
  'SCH001': [
    { id: 'COL001', name: '计算机学院', students: 450, interns: 180, employmentRate: 92.5 },
    { id: 'COL002', name: '电子工程学院', students: 320, interns: 90, employmentRate: 85.0 },
    { id: 'COL003', name: '人工智能学院', students: 280, interns: 50, employmentRate: 78.2 },
    { id: 'COL004', name: '数智商学院', students: 190, interns: 36, employmentRate: 82.1 },
  ]
};

const majorsAnalysisData: Record<string, any[]> = {
  'COL001': [
    { major: '计算机科学与技术', students: 150, interns: 80, employmentRate: 95.0 },
    { major: '软件工程', students: 120, interns: 60, employmentRate: 92.0 },
    { major: '人工智能', students: 100, interns: 25, employmentRate: 88.0 },
    { major: '数据科学', students: 80, interns: 15, employmentRate: 90.0 },
  ]
};

const expansionPersonnelData = [
  { name: '张三', schools: 5, totalStudents: 4500, conversionRate: 12.5 },
  { name: '李四', schools: 3, totalStudents: 2800, conversionRate: 10.2 },
  { name: '王五', schools: 4, totalStudents: 3200, conversionRate: 11.8 },
];

const jobExpansionPersonnelData = [
  { name: '张三', enterprises: 12, jobs: 45, conversionRate: 15.5, score: 94.2 },
  { name: '李四', enterprises: 8, jobs: 32, conversionRate: 12.8, score: 88.5 },
  { name: '王五', enterprises: 10, jobs: 38, conversionRate: 14.2, score: 91.0 },
];

const majorEmploymentData = [
  { major: '通信工程', rate: 92 },
  { major: '计算机系统结构', rate: 95 },
  { major: '人工智能', rate: 88 },
  { major: '电子信息', rate: 85 },
  { major: '网络工程', rate: 82 },
];

const enterpriseDistributionData = [
  { type: 'ICT/通信', count: 45 },
  { type: 'AI/人工智能', count: 35 },
  { type: 'ICT/数通', count: 30 },
  { type: 'ICT/存储', count: 25 },
  { type: '互联网/软件', count: 15 },
];

const trainingTrendData = [
  { month: '1月', completion: 70, passRate: 60 },
  { month: '2月', completion: 75, passRate: 65 },
  { month: '3月', completion: 80, passRate: 70 },
  { month: '4月', completion: 85, passRate: 75 },
  { month: '5月', completion: 82, passRate: 78 },
  { month: '6月', completion: 90, passRate: 85 },
];

const enterpriseRanking = [
  { name: '华为技术有限公司', demand: 156, industry: 'ICT/通信' },
  { name: '中兴通讯股份有限公司', demand: 142, industry: 'ICT/通信' },
  { name: '新华三技术有限公司', demand: 128, industry: 'ICT/数通' },
  { name: '浪潮信息', demand: 95, industry: 'ICT/存储' },
  { name: '百度在线网络技术', demand: 88, industry: 'AI/人工智能' },
  { name: '商汤科技', demand: 76, industry: 'AI/人工智能' },
];

const coursesData = [
  { id: 'C001', title: '5G 移动通信技术', skillTags: ['5G', 'NR'], jobType: '通信工程', duration: '24课时', studentsCount: 156, status: '已上线' },
  { id: 'C002', title: '分布式存储系统实战', skillTags: ['Ceph', 'NVMe'], jobType: '存储工程师', duration: '20课时', studentsCount: 230, status: '已上线' },
  { id: 'C003', title: '数通网络协议精讲', skillTags: ['BGP', 'OSPF'], jobType: '数通工程师', duration: '16课时', studentsCount: 89, status: '已上线' },
  { id: 'C004', title: 'AI 深度学习框架', skillTags: ['PyTorch', 'TensorFlow'], jobType: 'AI开发', duration: '30课时', studentsCount: 120, status: '草稿' },
  { id: 'C005', title: 'Linux 核心指令实战', skillTags: ['Linux', 'Shell'], jobType: '数据库工程师', duration: '12课时', studentsCount: 310, status: '已上线' },
  { id: 'C006', title: 'SQL 高级语法进阶', skillTags: ['SQL', 'Query Optimization'], jobType: '数据库工程师', duration: '18课时', studentsCount: 280, status: '已上线' },
  { id: 'C007', title: '数据库原理深度解析', skillTags: ['Database Theory', 'ACID'], jobType: '数据库工程师', duration: '24课时', studentsCount: 195, status: '已上线' },
  { id: 'C008', title: 'MySQL → GaussDB 迁移指南', skillTags: ['Data Migration', 'GaussDB'], jobType: '数据库工程师', duration: '10课时', studentsCount: 150, status: '已上线' },
  { id: 'C009', title: 'GaussDB 集群部署实操', skillTags: ['Deployment', 'Cluster'], jobType: '数据库工程师', duration: '20课时', studentsCount: 120, status: '已上线' },
];

const assessmentsData = [
  { id: 'A001', studentName: '张伟', studentId: 'S2024001', score: 85, strengths: ['逻辑思维', '代码规范'], weaknesses: ['高并发处理'], date: '2026-03-10' },
  { id: 'A002', studentName: '李娜', studentId: 'S2024002', score: 92, strengths: ['界面审美', '交互逻辑'], weaknesses: ['动效实现'], date: '2026-03-12' },
  { id: 'A003', studentName: '王强', studentId: 'S2024003', score: 78, strengths: ['基础扎实'], weaknesses: ['项目经验', '文档编写'], date: '2026-03-14' },
];

const learningTasksData = [
  { id: 'T001', title: '2026届通信工程实习生岗前培训', targetStudents: 45, status: '已推送', pushDate: '2026-03-01' },
  { id: 'T002', title: '存储系统基础能力补强计划', targetStudents: 30, status: '待推送', pushDate: '-' },
  { id: 'T003', title: 'AI应用开发进阶任务', targetStudents: 15, status: '已推送', pushDate: '2026-03-05' },
];

const certificationsData = [
  { id: 'CERT001', studentName: '张伟', examName: 'HCIA-5G 认证', score: 88, status: '已发放', issueDate: '2026-03-15' },
  { id: 'CERT002', studentName: '李娜', examName: 'HCIP-Storage 认证', score: 95, status: '待审核', issueDate: '-' },
  { id: 'CERT003', studentName: '赵敏', examName: 'HCIE-Datacom 认证', score: 82, status: '已发放', issueDate: '2026-03-10' },
  { id: 'CERT004', studentName: '周杰', examName: 'HCIE-GaussDB 认证', score: 94, status: '已发放', issueDate: '2026-03-20' },
];

const trainingDashboardData = {
  completionRate: 85,
  passRate: 72,
  improvementTrend: [
    { month: '1月', score: 65 },
    { month: '2月', score: 72 },
    { month: '3月', score: 81 },
  ],
  skillDistribution: [
    { name: '通信/无线', value: 40 },
    { name: '存储/数通', value: 30 },
    { name: 'AI/算法', value: 20 },
    { name: '运维/测试', value: 10 },
  ]
};

const studentAbilityRadarData = [
  { subject: 'Linux基础', A: 95, fullMark: 100 },
  { subject: 'SQL能力', A: 92, fullMark: 100 },
  { subject: '数据库基础', A: 98, fullMark: 100 },
  { subject: '部署实操', A: 85, fullMark: 100 },
  { subject: '故障排查', A: 70, fullMark: 100 },
  { subject: '方案设计', A: 65, fullMark: 100 },
];

const internsData = [
  { 
    id: 'INT001', 
    jobId: 'JOB001', 
    studentId: 'STU001', 
    name: '陈小明', 
    company: '华为', 
    position: '通信前台工程师', 
    owner: '张经理', 
    dailyRate: 95, 
    weeklyRate: 100, 
    exceptions: 0, 
    isOff: false, 
    offTime: '-', 
    result: '优秀', 
    status: '正常', 
    riskLevel: '低', 
    isConverted: true, 
    joinDate: '2024-01-15', 
    completionRate: 98,
    usabilityStatus: '可录用', // All training + internship passed
    assessmentGrade: 'A',
    conversionSuggestion: '是',
    riskTags: [],
    // Sliced Course Assessment Results
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', category: 'training', status: '通过', score: 95, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', category: 'training', status: '通过', score: 92, sliceName: 'SQL 高级语法进阶' },
      { id: 'DB_SP_03', module: '基础能力', name: '数据库基础', category: 'training', status: '通过', score: 98, sliceName: '数据库原理深度解析' },
      { id: 'DB_SP_04', module: '基础能力', name: '主流数据库语法转换', category: 'training', status: '通过', score: 88, sliceName: 'MySQL → GaussDB 迁移指南' },
      { id: 'DB_SP_05', module: '工程能力', name: '数据库部署', category: 'training', status: '通过', score: 90, sliceName: 'GaussDB 集群部署实操' },
      { id: 'DB_SP_06', module: '工程能力', name: '数据迁移', category: 'training', status: '通过', score: 85, sliceName: '数据迁移工具使用手册' },
      { id: 'DB_SP_07', module: '工程能力', name: '工具使用', category: 'training', status: '通过', score: 94, sliceName: '数据库运维工具集锦' },
      { id: 'DB_SP_08', module: '场景能力', name: '性能调优', category: 'internship', status: '通过', score: 91, sliceName: 'GaussDB 性能优化实战' },
      { id: 'DB_SP_09', module: '场景能力', name: '故障排查', category: 'internship', status: '通过', score: 89, sliceName: '数据库常见故障案例集' },
      { id: 'DB_SP_10', module: '场景能力', name: '参数调优', category: 'internship', status: '通过', score: 93, sliceName: '数据库核心参数配置指南' },
      { id: 'DB_SP_11', module: '场景能力', name: '方案设计', category: 'internship', status: '通过', score: 96, sliceName: '高可用数据库方案设计' },
    ],
    internshipTasks: [
      { id: 'TASK001', name: '参与分布式架构故障排查', status: '已完成', score: 95, feedback: '表现出色，能够快速定位问题。', date: '2024-03-15' },
      { id: 'TASK002', name: '跨部门需求对接实操', status: '已完成', score: 90, feedback: '沟通顺畅，文档记录详实。', date: '2024-03-20' }
    ],
    certificateStatus: '已获得',
    certificateName: 'HCIE-GaussDB',
    trainingCompletionRate: 100,
    diagnosis: {
      weaknesses: ['文档规范性有待提高'],
      trainingRecords: [
        { name: 'GaussDB 核心架构培训', status: '已完成', date: '2024-01-20' },
        { name: '金融数据库安全规范', status: '已完成', date: '2024-01-25' }
      ],
      certificates: ['HCIE-GaussDB']
    }
  },
  { 
    id: 'INT_HUAWEI_1', 
    jobId: 'JOB001', 
    studentId: 'STU006', 
    name: '张伟', 
    company: '华为', 
    position: '通信前台工程师', 
    owner: '张经理', 
    dailyRate: 85, 
    weeklyRate: 80, 
    exceptions: 1, 
    isOff: false, 
    offTime: '-', 
    result: '良好', 
    status: '正常', 
    riskLevel: '低', 
    isConverted: false, 
    joinDate: '2024-02-10', 
    completionRate: 88,
    usabilityStatus: '可实习', // Training passed + Cert passed, but internship skills gap
    assessmentGrade: 'B',
    conversionSuggestion: '待定',
    riskTags: [],
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', category: 'training', status: '通过', score: 88, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', category: 'training', status: '通过', score: 82, sliceName: 'SQL 高级语法进阶' },
      { id: 'DB_SP_03', module: '基础能力', name: '数据库基础', category: 'training', status: '通过', score: 85, sliceName: '数据库原理深度解析' },
      { id: 'DB_SP_04', module: '基础能力', name: '主流数据库语法转换', category: 'training', status: '通过', score: 80, sliceName: 'MySQL → GaussDB 迁移指南' },
      { id: 'DB_SP_05', module: '工程能力', name: '数据库部署', category: 'training', status: '通过', score: 78, sliceName: 'GaussDB 集群部署实操' },
      { id: 'DB_SP_06', module: '工程能力', name: '数据迁移', category: 'training', status: '通过', score: 72, sliceName: '数据迁移工具使用手册' },
      { id: 'DB_SP_07', module: '工程能力', name: '工具使用', category: 'training', status: '通过', score: 80, sliceName: '数据库运维工具集锦' },
      { id: 'DB_SP_08', module: '场景能力', name: '性能调优', category: 'internship', status: '未通过', score: 58, sliceName: 'GaussDB 性能优化实战' },
      { id: 'DB_SP_09', module: '场景能力', name: '故障排查', category: 'internship', status: '通过', score: 75, sliceName: '数据库常见故障案例集' },
      { id: 'DB_SP_10', module: '场景能力', name: '参数调优', category: 'internship', status: '通过', score: 80, sliceName: '数据库核心参数配置指南' },
      { id: 'DB_SP_11', module: '场景能力', name: '方案设计', category: 'internship', status: '未通过', score: 52, sliceName: '高可用数据库方案设计' },
    ],
    internshipTasks: [
      { id: 'TASK003', name: '线上故障应急响应演练', status: '进行中', score: 0, feedback: '-', date: '2024-03-22' }
    ],
    certificateStatus: '已获得',
    certificateName: 'HCIA-5G 认证',
    trainingCompletionRate: 100,
    diagnosis: {
      weaknesses: ['场景化方案设计能力不足'],
      trainingRecords: [
        { name: '5G 基础理论培训', status: '已完成', date: '2024-01-10' }
      ],
      certificates: ['HCIA-5G 认证']
    }
  },
  { 
    id: 'INT_HUAWEI_2', 
    jobId: 'JOB001', 
    studentId: 'STU007', 
    name: '李娜', 
    company: '华为', 
    position: '通信前台工程师', 
    owner: '张经理', 
    dailyRate: 75, 
    weeklyRate: 70, 
    exceptions: 2, 
    isOff: false, 
    offTime: '-', 
    result: '需改进', 
    status: '正常', 
    riskLevel: '中', 
    isConverted: false, 
    joinDate: '2024-02-15', 
    completionRate: 65,
    usabilityStatus: '待提升', // Training skills gap
    assessmentGrade: 'C',
    conversionSuggestion: '否',
    riskTags: ['技能不匹配'],
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', category: 'training', status: '未通过', score: 55, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', category: 'training', status: '通过', score: 72, sliceName: 'SQL 高级语法进阶' },
      { id: 'DB_SP_03', module: '基础能力', name: '数据库基础', category: 'training', status: '未通过', score: 48, sliceName: '数据库原理深度解析' },
    ],
    internshipTasks: [
      { id: 'TASK004', name: '基础环境搭建', status: '未开始', score: 0, feedback: '-', date: '-' }
    ],
    certificateStatus: '未获得',
    certificateName: '-',
    trainingCompletionRate: 40,
    diagnosis: {
      weaknesses: ['基础理论知识薄弱'],
      trainingRecords: [],
      certificates: []
    }
  },
  { 
    id: 'INT_HUAWEI_3', 
    jobId: 'JOB001', 
    studentId: 'STU008', 
    name: '赵强', 
    company: '华为', 
    position: '通信前台工程师', 
    owner: '张经理', 
    dailyRate: 82, 
    weeklyRate: 78, 
    exceptions: 0, 
    isOff: false, 
    offTime: '-', 
    result: '良好', 
    status: '正常', 
    riskLevel: '低', 
    isConverted: false, 
    joinDate: '2024-02-20', 
    completionRate: 80,
    usabilityStatus: '可实习',
    assessmentGrade: 'B',
    conversionSuggestion: '待定',
    riskTags: [],
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', category: 'training', status: '通过', score: 85, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', category: 'training', status: '通过', score: 80, sliceName: 'SQL 高级语法进阶' },
    ],
    internshipTasks: [],
    certificateStatus: '已获得',
    certificateName: 'HCIA-5G 认证',
    trainingCompletionRate: 80,
    diagnosis: {
      weaknesses: ['语法转换及性能调优需加强'],
      trainingRecords: [
        { name: 'GaussDB 基础培训', status: '已完成', date: '2024-02-15' }
      ],
      certificates: []
    }
  },
  { 
    id: 'INT_HUAWEI_4', 
    jobId: 'JOB001', 
    studentId: 'STU011', 
    name: '王芳', 
    company: '华为', 
    position: '通信前台工程师', 
    owner: '张经理', 
    dailyRate: 45, 
    weeklyRate: 40, 
    exceptions: 5, 
    isOff: false, 
    offTime: '-', 
    result: '需改进', 
    status: '预警', 
    riskLevel: '高', 
    isConverted: false, 
    joinDate: '2024-02-20', 
    completionRate: 40,
    usabilityStatus: '不可用', 
    assessmentGrade: 'C',
    conversionSuggestion: '否',
    riskTags: ['低绩效风险'],
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', status: '未通过', score: 42, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', status: '未通过', score: 38, sliceName: 'SQL 高级语法进阶' },
      { id: 'DB_SP_03', module: '基础能力', name: '数据库基础', status: '未通过', score: 45, sliceName: '数据库原理深度解析' },
      { id: 'DB_SP_04', module: '基础能力', name: '主流数据库语法转换', status: '未通过', score: 35, sliceName: 'MySQL → GaussDB 迁移指南' },
      { id: 'DB_SP_05', module: '工程能力', name: '数据库部署', status: '未通过', score: 30, sliceName: 'GaussDB 集群部署实操' },
      { id: 'DB_SP_06', module: '工程能力', name: '数据迁移', status: '未通过', score: 25, sliceName: '数据迁移工具使用手册' },
      { id: 'DB_SP_07', module: '工程能力', name: '工具使用', status: '未通过', score: 40, sliceName: '数据库运维工具集锦' },
      { id: 'DB_SP_08', module: '场景能力', name: '性能调优', status: '未通过', score: 28, sliceName: 'GaussDB 性能优化实战' },
      { id: 'DB_SP_09', module: '场景能力', name: '故障排查', status: '未通过', score: 32, sliceName: '数据库常见故障案例集' },
      { id: 'DB_SP_10', module: '场景能力', name: '参数调优', status: '未通过', score: 35, sliceName: '数据库核心参数配置指南' },
      { id: 'DB_SP_11', module: '场景能力', name: '方案设计', status: '未通过', score: 30, sliceName: '高可用数据库方案设计' },
    ],
    certificateStatus: '未开始',
    certificateName: 'HCIE-GaussDB',
    trainingCompletionRate: 20,
    diagnosis: {
      weaknesses: ['基础薄弱，学习进度严重滞后'],
      trainingRecords: [],
      certificates: []
    }
  },
  { 
    id: 'INT_JH_1', 
    jobId: 'JOB_JH_001', 
    studentId: 'STU012', 
    name: '周杰', 
    company: '嘉环科技', 
    position: '数据库工程师', 
    owner: '陈经理', 
    dailyRate: 92, 
    weeklyRate: 95, 
    exceptions: 0, 
    isOff: false, 
    offTime: '-', 
    result: '优秀', 
    status: '正常', 
    riskLevel: '低', 
    isConverted: false, 
    joinDate: '2024-03-01', 
    completionRate: 95,
    usabilityStatus: '可录用', 
    assessmentGrade: 'A',
    conversionSuggestion: '是',
    riskTags: [],
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', category: 'training', status: '通过', score: 95, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', category: 'training', status: '通过', score: 92, sliceName: 'SQL 高级语法进阶' },
      { id: 'DB_SP_03', module: '基础能力', name: '数据库基础', category: 'training', status: '通过', score: 98, sliceName: '数据库原理深度解析' },
      { id: 'DB_SP_04', module: '基础能力', name: '主流数据库语法转换', category: 'training', status: '通过', score: 88, sliceName: 'MySQL → GaussDB 迁移指南' },
      { id: 'DB_SP_05', module: '工程能力', name: '数据库部署', category: 'training', status: '通过', score: 90, sliceName: 'GaussDB 集群部署实操' },
      { id: 'DB_SP_06', module: '工程能力', name: '数据迁移', category: 'training', status: '通过', score: 85, sliceName: '数据迁移工具使用手册' },
      { id: 'DB_SP_07', module: '工程能力', name: '工具使用', category: 'training', status: '通过', score: 94, sliceName: '数据库运维工具集锦' },
      { id: 'DB_SP_08', module: '场景能力', name: '性能调优', category: 'internship', status: '通过', score: 91, sliceName: 'GaussDB 性能优化实战' },
      { id: 'DB_SP_09', module: '场景能力', name: '故障排查', category: 'internship', status: '通过', score: 89, sliceName: '数据库常见故障案例集' },
      { id: 'DB_SP_10', module: '场景能力', name: '参数调优', category: 'internship', status: '通过', score: 93, sliceName: '数据库核心参数配置指南' },
      { id: 'DB_SP_11', module: '场景能力', name: '方案设计', category: 'internship', status: '通过', score: 96, sliceName: '高可用数据库方案设计' },
    ],
    internshipTasks: [
      { id: 'TASK_JH_01', name: 'GaussDB 生产环境扩容实操', status: '已完成', score: 98, feedback: '操作规范，零失误。', date: '2024-03-20' }
    ],
    certificateStatus: '已获得',
    certificateName: 'HCIE-GaussDB',
    trainingCompletionRate: 100,
    diagnosis: {
      weaknesses: [],
      trainingRecords: [],
      certificates: ['HCIE-GaussDB']
    }
  },
  { 
    id: 'INT002', 
    jobId: 'JOB002', 
    studentId: 'STU002', 
    name: '林静', 
    company: '浪潮信息', 
    position: '数据库工程师', 
    owner: '李总', 
    dailyRate: 80, 
    weeklyRate: 75, 
    exceptions: 2, 
    isOff: false, 
    offTime: '-', 
    result: '良好', 
    status: '预警', 
    riskLevel: '中', 
    isConverted: false, 
    joinDate: '2024-02-01', 
    completionRate: 85,
    usabilityStatus: '待提升', 
    assessmentGrade: 'B',
    conversionSuggestion: '否',
    riskTags: ['技能不匹配'],
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', status: '通过', score: 85, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', status: '未通过', score: 45, sliceName: 'SQL 高级语法进阶' },
      { id: 'DB_SP_03', module: '基础能力', name: '数据库基础', status: '通过', score: 80, sliceName: '数据库原理深度解析' },
      { id: 'DB_SP_04', module: '基础能力', name: '主流数据库语法转换', status: '通过', score: 75, sliceName: 'MySQL → GaussDB 迁移指南' },
      { id: 'DB_SP_05', module: '工程能力', name: '数据库部署', status: '未通过', score: 55, sliceName: 'GaussDB 集群部署实操' },
      { id: 'DB_SP_06', module: '工程能力', name: '数据迁移', status: '通过', score: 70, sliceName: '数据迁移工具使用手册' },
      { id: 'DB_SP_07', module: '工程能力', name: '工具使用', status: '通过', score: 78, sliceName: '数据库运维工具集锦' },
      { id: 'DB_SP_08', module: '场景能力', name: '性能调优', status: '未通过', score: 62, sliceName: 'GaussDB 性能优化实战' },
      { id: 'DB_SP_09', module: '场景能力', name: '故障排查', status: '通过', score: 74, sliceName: '数据库常见故障案例集' },
      { id: 'DB_SP_10', module: '场景能力', name: '参数调优', status: '通过', score: 82, sliceName: '数据库核心参数配置指南' },
      { id: 'DB_SP_11', module: '场景能力', name: '方案设计', status: '未通过', score: 58, sliceName: '高可用数据库方案设计' },
    ],
    certificateStatus: '未获得',
    certificateName: 'HCIE-GaussDB',
    trainingCompletionRate: 75,
    diagnosis: {
      weaknesses: ['SQL 能力及部署实操薄弱'],
      trainingRecords: [
        { name: '数据库实战进阶', status: '进行中', date: '2024-03-01' }
      ],
      certificates: []
    }
  },
  { 
    id: 'INT003', 
    jobId: 'JOB005', 
    studentId: 'STU003', 
    name: '李雷', 
    company: '百度', 
    position: '数据库工程师', 
    owner: '王工', 
    dailyRate: 40, 
    weeklyRate: 50, 
    exceptions: 5, 
    isOff: false, 
    offTime: '-', 
    result: '不合格', 
    status: '高风险', 
    riskLevel: '高', 
    isConverted: false, 
    joinDate: '2024-02-15', 
    completionRate: 45,
    usabilityStatus: '不可用', 
    assessmentGrade: 'C',
    conversionSuggestion: '否',
    riskTags: ['低绩效', '流失风险'],
    skillPointResults: [
      { id: 'DB_SP_01', module: '基础能力', name: 'Linux基础', status: '未通过', score: 30, sliceName: 'Linux 核心指令实战' },
      { id: 'DB_SP_02', module: '基础能力', name: 'SQL能力', status: '未学习', score: 0, sliceName: 'SQL 高级语法进阶' },
      { id: 'DB_SP_03', module: '基础能力', name: '数据库基础', status: '未学习', score: 0, sliceName: '数据库原理深度解析' },
    ],
    certificateStatus: '未获得',
    certificateName: 'HCIE-GaussDB',
    trainingCompletionRate: 20,
    diagnosis: {
      weaknesses: ['基础极差'],
      trainingRecords: [],
      certificates: []
    }
  },
];

const enterprisesData = [
  { 
    id: 1, 
    name: '华为技术有限公司', 
    industry: 'ICT/通信', 
    city: '深圳', 
    internJobCount: 150, 
    regularJobCount: 200, 
    status: '合作中', 
    owner: '王经理', 
    updateTime: '2024-03-11', 
    hasInternDemand: true, 
    score: 98,
    grade: 'A',
    internRequirements: {
      cycle: '6-12个月',
      salary: '300-600/天',
      conversionRate: '70%'
    }
  },
  { 
    id: 2, 
    name: '中兴通讯股份有限公司', 
    industry: 'ICT/通信', 
    city: '深圳', 
    internJobCount: 92, 
    regularJobCount: 80, 
    status: '合作中', 
    owner: '李经理', 
    updateTime: '2024-03-10', 
    hasInternDemand: true, 
    score: 95,
    grade: 'A',
    internRequirements: {
      cycle: '6个月以上',
      salary: '250-450/天',
      conversionRate: '60%'
    }
  },
  { 
    id: 3, 
    name: '新华三技术有限公司', 
    industry: 'ICT/数通', 
    city: '杭州', 
    internJobCount: 100, 
    regularJobCount: 60, 
    status: '合作中', 
    owner: '张经理', 
    updateTime: '2024-03-12', 
    hasInternDemand: true, 
    score: 92,
    grade: 'B',
    internRequirements: {
      cycle: '3个月以上',
      salary: '200-400/天',
      conversionRate: '50%'
    }
  },
  { 
    id: 4, 
    name: '浪潮信息', 
    industry: 'ICT/存储', 
    city: '济南', 
    internJobCount: 65, 
    regularJobCount: 40, 
    status: '合作中', 
    owner: '赵经理', 
    updateTime: '2024-03-09', 
    hasInternDemand: true, 
    score: 90,
    grade: 'B',
    internRequirements: {
      cycle: '4-8个月',
      salary: '250-450/天',
      conversionRate: '45%'
    }
  },
  { 
    id: 5, 
    name: '商汤科技', 
    industry: 'AI/人工智能', 
    city: '上海', 
    internJobCount: 40, 
    regularJobCount: 20, 
    status: '合作中', 
    owner: '孙经理', 
    updateTime: '2024-03-08', 
    hasInternDemand: true, 
    score: 88,
    grade: 'C',
    internRequirements: {
      cycle: '3-6个月',
      salary: '400-800/天',
      conversionRate: '30%'
    }
  },
  { 
    id: 6, 
    name: '嘉环科技', 
    industry: 'ICT/运维', 
    city: '南京', 
    internJobCount: 80, 
    regularJobCount: 120, 
    status: '合作中', 
    owner: '陈经理', 
    updateTime: '2024-03-25', 
    hasInternDemand: true, 
    score: 94,
    grade: 'A',
    internRequirements: {
      cycle: '6-12个月',
      salary: '200-400/天',
      conversionRate: '80%'
    }
  },
];

const jobsData = [
  { 
    id: 'JOB_JH_001', 
    title: '数据库工程师', 
    company: '嘉环科技', 
    city: '南京', 
    type: '全职', 
    headCount: 30, 
    publishDate: '2024-03-25', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '陈经理', 
    score: 96, 
    grade: 'A',
    minStudentScore: 85,
    skillPoints: [
      { id: 'SP_DB_01', name: 'Linux基础', category: 'training', sliceType: '视频', sliceName: 'Linux 核心指令实战', questionBank: 'Linux 基础题库', exam: 'Linux 准入考试' },
      { id: 'SP_DB_02', name: 'SQL能力', category: 'training', sliceType: '视频', sliceName: 'SQL 高级语法进阶', questionBank: 'SQL 核心题库', exam: 'SQL 专项考核' },
      { id: 'SP_DB_03', name: '数据库基础', category: 'training', sliceType: '文档', sliceName: '数据库原理深度解析', questionBank: '数据库理论题库', exam: '数据库基础考试' },
      { id: 'SP_DB_04', name: '主流数据库语法转换', category: 'training', sliceType: '图文', sliceName: 'MySQL → GaussDB 迁移指南', questionBank: '语法转换题库', exam: '语法转换实操' },
      { id: 'SP_DB_05', name: '数据库部署', category: 'training', sliceType: '视频', sliceName: 'GaussDB 集群部署实操', questionBank: '部署实操题库', exam: '部署专项考核' },
      { id: 'SP_DB_06', name: '数据迁移', category: 'training', sliceType: '文档', sliceName: '数据迁移工具使用手册', questionBank: '迁移工具题库', exam: '数据迁移实战' },
      { id: 'SP_DB_07', name: '工具使用', category: 'training', sliceType: '图文', sliceName: '数据库运维工具集锦', questionBank: '运维工具题库', exam: '工具使用考核' },
      { id: 'SP_DB_08', name: '性能调优', category: 'internship', sliceType: '视频', sliceName: 'GaussDB 性能优化实战', questionBank: '调优核心题库', exam: '性能调优专项' },
      { id: 'SP_DB_09', name: '故障排查', category: 'internship', sliceType: '文档', sliceName: '数据库常见故障案例集', questionBank: '故障案例库', exam: '故障排查实战' },
      { id: 'SP_DB_10', name: '参数调优', category: 'internship', sliceType: '图文', sliceName: '数据库核心参数配置指南', questionBank: '参数配置题库', exam: '参数调优考核' },
      { id: 'SP_DB_11', name: '方案设计', category: 'internship', sliceType: '文档', sliceName: '高可用数据库方案设计', questionBank: '方案设计题库', exam: '方案设计专项' },
    ],
    isTrainingRequired: true,
    hiringRule: '全部技能点评估通过 + 获得 HCIE-GaussDB 证书 = 可上岗',
    requiredCertificate: 'HCIE-GaussDB'
  },
  { 
    id: 'JOB001', 
    title: '通信前台工程师', 
    company: '华为', 
    city: '深圳', 
    type: '全职', 
    headCount: 20, 
    publishDate: '2024-03-10', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '张三', 
    score: 95, 
    grade: 'A',
    minStudentScore: 85,
    // Sliced Course Bindings
    skillPoints: [
      { id: 'SP001', name: '5G 基础理论', sliceType: '视频', sliceName: '5G NR 物理层协议视频', questionBank: '5G 基础题库', exam: '5G 理论准入考试' },
      { id: 'SP002', name: '无线网优实战', sliceType: '文档', sliceName: '路测数据分析文档', questionBank: '网优实操题库', exam: '网优专项考核' },
      { id: 'SP003', name: '站点勘察规范', sliceType: '图文', sliceName: '基站建设标准图文', questionBank: '勘察规范题库', exam: '站点安全考试' },
    ],
    isTrainingRequired: true,
    hiringRule: '全部技能点评估通过 = 可上岗'
  },
  { 
    id: 'JOB002', 
    title: '存储工程师', 
    company: '浪潮信息', 
    city: '济南', 
    type: '全职', 
    headCount: 15, 
    publishDate: '2024-03-11', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '李四', 
    score: 92, 
    grade: 'B',
    minStudentScore: 80,
    skillPoints: [
      { id: 'SP004', name: '分布式存储架构', sliceType: '文档', sliceName: 'Ceph 架构原理指南', questionBank: '分布式存储题库', exam: '存储架构能力测试' },
      { id: 'SP005', name: '存储协议配置', sliceType: '视频', sliceName: 'NVMe-oF 协议实操视频', questionBank: '存储协议题库', exam: '协议配置实操考核' },
      { id: 'SP006', name: 'RAID 与数据保护', sliceType: '图文', sliceName: '数据冗余算法方法论', questionBank: '数据保护题库', exam: '数据安全专项考试' },
    ],
    isTrainingRequired: true,
    hiringRule: '全部技能点评估通过 = 可上岗'
  },
  { 
    id: 'JOB003', 
    title: '数通工程师', 
    company: '新华三', 
    city: '杭州', 
    type: '全职', 
    headCount: 30, 
    publishDate: '2024-03-09', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '王五', 
    score: 90, 
    minStudentScore: 82,
    skillPoints: [
      { id: 'SP007', name: '路由交换技术', sliceType: '视频', sliceName: 'OSPF 与 BGP 进阶', questionBank: '数通核心题库', exam: '路由交换准入考试' },
      { id: 'SP008', name: '网络安全防护', sliceType: '文档', sliceName: '防火墙配置手册', questionBank: '安全题库', exam: '网络安全专项考核' },
      { id: 'SP009', name: 'SDN 网络架构', sliceType: '图文', sliceName: '软件定义网络概论', questionBank: 'SDN 题库', exam: 'SDN 基础考试' },
    ],
    isTrainingRequired: true,
    hiringRule: '全部技能点评估通过 = 可上岗'
  },
  { 
    id: 'JOB004', 
    title: '软件开发工程师', 
    company: '海康威视', 
    city: '深圳', 
    type: '全职', 
    headCount: 50, 
    publishDate: '2024-03-01', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '赵六', 
    score: 88, 
    minStudentScore: 85,
    skillPoints: [
      { id: 'SP010', name: '高并发系统设计', sliceType: '视频', sliceName: '分布式锁与缓存实战', questionBank: '高并发题库', exam: '系统架构准入考试' },
      { id: 'SP011', name: '微服务治理', sliceType: '文档', sliceName: 'K8s 容器编排指南', questionBank: '微服务题库', exam: '云原生专项考核' },
      { id: 'SP012', name: '代码质量规范', sliceType: '图文', sliceName: 'Clean Code 最佳实践', questionBank: '规范题库', exam: '代码质量考试' },
    ],
    isTrainingRequired: false,
    hiringRule: '全部技能点评估通过 = 可上岗'
  },
  { 
    id: 'JOB005', 
    title: 'AI应用开发工程师', 
    company: '百度', 
    city: '北京', 
    type: '全职', 
    headCount: 10, 
    publishDate: '2024-03-08', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '孙七', 
    score: 94, 
    minStudentScore: 88,
    skillPoints: [
      { id: 'SP013', name: '深度学习框架', sliceType: '视频', sliceName: 'PaddlePaddle 核心概念视频', questionBank: 'AI 基础题库', exam: '深度学习准入考试' },
      { id: 'SP014', name: '模型部署优化', sliceType: '文档', sliceName: 'ONNX 转换与推理文档', questionBank: '部署题库', exam: '模型推理专项考核' },
      { id: 'SP015', name: 'NLP 基础', sliceType: '图文', sliceName: 'Transformer 架构解析', questionBank: 'NLP 题库', exam: '自然语言处理考试' },
    ],
    isTrainingRequired: true,
    hiringRule: '全部技能点评估通过 = 可上岗'
  },
  { 
    id: 'JOB006', 
    title: '硬件测试', 
    company: '中兴通讯', 
    city: '深圳', 
    type: '全职', 
    headCount: 12, 
    publishDate: '2024-03-05', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '周八', 
    score: 85, 
    minStudentScore: 78,
    skillPoints: [
      { id: 'SP016', name: '示波器使用', sliceType: '视频', sliceName: '信号完整性测试实操', questionBank: '硬件测试题库', exam: '仪器使用准入考试' },
      { id: 'SP017', name: 'EMC 测试规范', sliceType: '文档', sliceName: '电磁兼容性标准手册', questionBank: 'EMC 题库', exam: 'EMC 专项考核' },
    ],
    isTrainingRequired: true,
    hiringRule: '全部技能点评估通过 = 可上岗'
  },
  { 
    id: 'JOB007', 
    title: '运维支持', 
    company: '新华三', 
    city: '北京', 
    type: '全职', 
    headCount: 25, 
    publishDate: '2024-03-02', 
    status: '匹配中', 
    roleType: '正式', 
    owner: '吴九', 
    score: 82, 
    minStudentScore: 75,
    skillPoints: [
      { id: 'SP018', name: 'Linux 系统管理', sliceType: '视频', sliceName: 'Shell 脚本自动化运维', questionBank: '运维基础题库', exam: 'Linux 准入考试' },
      { id: 'SP019', name: '监控告警配置', sliceType: '文档', sliceName: 'Prometheus 部署指南', questionBank: '监控题库', exam: '监控系统专项考核' },
    ],
    isTrainingRequired: false,
    hiringRule: '全部技能点评估通过 = 可上岗'
  },
];

const studentsData = [
  { 
    id: 'STU001', 
    name: '陈小明', 
    school: '北京邮电大学', 
    major: '通信工程', 
    grade: '大四', 
    status: '待推荐',
    score: 88,
    gradeLevel: 'A',
    gradeRank: 'A',
    recommendationLimit: 3,
    recommendationsUsed: 0,
    recommendationLogs: [],
    behaviorScore: 100,
    riskLevel: '低',
    penaltyHistory: [],
    historicalPerformanceWeight: 1.0,
    skillTags: ['5G', '无线网优', 'Python'],
    improvementHistory: [],
    lastScoreUpdateTime: '2024-03-01',
    scoreBreakdown: {
      education: 90,
      certificates: 85,
      grades: 88,
      projects: 85,
      internships: 92
    }
  },
  { 
    id: 'STU002', 
    name: '林静', 
    school: '华中科技大学', 
    major: '计算机系统结构', 
    grade: '研二', 
    status: '已入岗',
    score: 92,
    gradeLevel: 'A',
    recommendationLimit: 3,
    recommendationsUsed: 0,
    recommendationLogs: [],
    behaviorScore: 100,
    riskLevel: '低',
    penaltyHistory: [],
    historicalPerformanceWeight: 1.2,
    skillTags: ['分布式存储', 'Linux', 'C++'],
    improvementHistory: [],
    lastScoreUpdateTime: '2024-03-05',
    scoreBreakdown: {
      education: 95,
      certificates: 90,
      grades: 92,
      projects: 90,
      internships: 95
    }
  },
  { 
    id: 'STU003', 
    name: '李雷', 
    school: '西安电子科技大学', 
    major: '人工智能', 
    grade: '大三', 
    status: '已入岗',
    score: 75,
    gradeLevel: 'B',
    recommendationLimit: 3,
    recommendationsUsed: 0,
    recommendationLogs: [],
    behaviorScore: 100,
    riskLevel: '低',
    penaltyHistory: [],
    historicalPerformanceWeight: 0.8,
    skillTags: ['深度学习', 'PyTorch', 'NLP'],
    improvementHistory: [],
    lastScoreUpdateTime: '2024-02-28',
    scoreBreakdown: {
      education: 80,
      certificates: 70,
      grades: 75,
      projects: 78,
      internships: 70
    }
  },
  { 
    id: 'STU004', 
    name: '张美美', 
    school: '复旦大学', 
    major: '电子信息', 
    grade: '大四', 
    status: '待推荐',
    score: 82,
    gradeLevel: 'B',
    recommendationLimit: 3,
    recommendationsUsed: 0,
    recommendationLogs: [],
    behaviorScore: 100,
    riskLevel: '低',
    penaltyHistory: [],
    historicalPerformanceWeight: 1.0,
    skillTags: ['硬件测试', 'EMC', '示波器'],
    improvementHistory: [],
    lastScoreUpdateTime: '2024-03-10',
    scoreBreakdown: {
      education: 85,
      certificates: 80,
      grades: 82,
      projects: 80,
      internships: 85
    }
  },
];

const matchesData = [
  { 
    id: 'MAT001', 
    studentId: 'STU001', 
    studentName: '陈小明', 
    jobId: 'JOB001', 
    jobTitle: '通信前台工程师', 
    company: '华为', 
    matchDate: '2024-03-11', 
    matchStatus: '面试中', 
    interviewStatus: '初试中', 
    hireStatus: '待定', 
    owner: '李老师', 
    roleType: '正式', 
    problem: '学生反馈面试时间冲突', 
    problemStatus: '处理中', 
    lastUpdateTime: '2024-03-11', 
    screeningResult: '通过', 
    failReason: '-', 
    conversionRate: '85%', 
    feedbackTime: '2024-03-12 10:00', 
    evaluation: '技术基础扎实',
    hasSkillGap: true,
    skillGaps: [
      { skill: '5G 协议', studentLevel: '入门', jobLevel: '精通', gap: '较大' },
      { skill: '路测分析', studentLevel: '了解', jobLevel: '熟练', gap: '中等' }
    ],
    recommendedCourses: ['5G NR 物理层深度解析', '无线网络优化实战'],
    // Full Process Fields
    recommendationTime: '2024-03-11 09:00',
    attendedInterview: true,
    interviewResult: '初试通过',
    interviewTime: '2024-03-12 14:00',
    joined: false,
    joinTime: '-',
    enterpriseRating: 4,
    studentBehavior: { noShow: false, rejected: false, reason: '-' },
    priorityScore: 198,
    matchSource: 'AI',
    filterReason: '-'
  },
  { 
    id: 'MAT_HUAWEI_1', 
    studentId: 'STU004', 
    studentName: '赵铁柱', 
    jobId: 'JOB001', 
    jobTitle: '通信前台工程师', 
    company: '华为', 
    matchDate: '2024-03-15', 
    matchStatus: '待匹配', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '系统', 
    roleType: '正式', 
    lastUpdateTime: '2024-03-15', 
    priorityScore: 210,
    matchSource: 'AI',
    filterReason: '-'
  },
  { 
    id: 'MAT_HUAWEI_2', 
    studentId: 'STU005', 
    studentName: '孙美美', 
    jobId: 'JOB001', 
    jobTitle: '通信前台工程师', 
    company: '华为', 
    matchDate: '2024-03-15', 
    matchStatus: '待匹配', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '系统', 
    roleType: '正式', 
    lastUpdateTime: '2024-03-15', 
    priorityScore: 205,
    matchSource: 'AI',
    filterReason: '-'
  },
  { 
    id: 'MAT_JH_1', 
    studentId: 'STU009', 
    studentName: '吴亦凡', 
    jobId: 'JOB_JH_001', 
    jobTitle: '数据库工程师', 
    company: '嘉环科技', 
    matchDate: '2024-03-25', 
    matchStatus: '待匹配', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '系统', 
    roleType: '正式', 
    lastUpdateTime: '2024-03-25', 
    priorityScore: 220,
    matchSource: 'AI',
    filterReason: '-'
  },
  { 
    id: 'MAT_JH_2', 
    studentId: 'STU010', 
    studentName: '蔡徐坤', 
    jobId: 'JOB_JH_001', 
    jobTitle: '数据库工程师', 
    company: '嘉环科技', 
    matchDate: '2024-03-25', 
    matchStatus: '待匹配', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '系统', 
    roleType: '正式', 
    lastUpdateTime: '2024-03-25', 
    priorityScore: 215,
    matchSource: 'AI',
    filterReason: '-'
  },
  { 
    id: 'MAT002', 
    studentId: 'STU002', 
    studentName: '林静', 
    jobId: 'JOB002', 
    jobTitle: '存储工程师', 
    company: '浪潮信息', 
    matchDate: '2024-03-10', 
    matchStatus: '已推荐', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '王老师', 
    roleType: '实习', 
    problem: '-', 
    problemStatus: '已闭环', 
    lastUpdateTime: '2024-03-01', 
    screeningResult: '待定', 
    failReason: '-', 
    conversionRate: '40%', 
    feedbackTime: '-', 
    evaluation: '-',
    hasSkillGap: true,
    skillGaps: [
      { skill: 'Ceph 架构', studentLevel: '基础', jobLevel: '熟练', gap: '中等' }
    ],
    recommendedCourses: ['分布式存储系统实战'],
    // Full Process Fields
    recommendationTime: '2024-03-10 10:30',
    attendedInterview: false,
    interviewResult: '未开始',
    interviewTime: '-',
    joined: false,
    joinTime: '-',
    enterpriseRating: 0,
    studentBehavior: { noShow: false, rejected: false, reason: '-' }
  },
  { 
    id: 'MAT003', 
    studentId: 'STU003', 
    studentName: '李雷', 
    jobId: 'JOB005', 
    jobTitle: 'AI应用开发工程师', 
    company: '百度', 
    matchDate: '2024-03-09', 
    matchStatus: '已入职', 
    interviewStatus: '已通过', 
    hireStatus: '录用', 
    owner: '张老师', 
    roleType: '正式', 
    problem: '-', 
    problemStatus: '已闭环', 
    lastUpdateTime: '2024-03-09', 
    screeningResult: '通过', 
    failReason: '-', 
    conversionRate: '95%', 
    feedbackTime: '2024-03-10 14:00', 
    evaluation: '非常优秀',
    // Full Process Fields
    recommendationTime: '2024-03-09 08:30',
    attendedInterview: true,
    interviewResult: '面试通过',
    interviewTime: '2024-03-10 10:00',
    joined: true,
    joinTime: '2024-03-15',
    enterpriseRating: 5,
    studentBehavior: { noShow: false, rejected: false, reason: '-' }
  },
  { 
    id: 'MAT004', 
    studentId: 'STU004', 
    studentName: '张美美', 
    jobId: 'JOB006', 
    jobTitle: '硬件测试', 
    company: '中兴通讯', 
    matchDate: '2024-03-08', 
    matchStatus: '待匹配', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '赵老师', 
    roleType: '正式', 
    problem: '简历需要优化', 
    problemStatus: '未处理', 
    lastUpdateTime: '2024-03-08', 
    screeningResult: '-', 
    failReason: '-', 
    conversionRate: '-', 
    feedbackTime: '-', 
    evaluation: '-',
    // Full Process Fields
    recommendationTime: '2024-03-08 11:00',
    attendedInterview: false,
    interviewResult: '未开始',
    interviewTime: '-',
    joined: false,
    joinTime: '-',
    enterpriseRating: 0,
    studentBehavior: { noShow: false, rejected: false, reason: '-' }
  },
  { 
    id: 'MAT006', 
    studentId: 'STU013', 
    studentName: '张三', 
    jobId: 'JOB001', 
    jobTitle: '云计算开发工程师', 
    company: '华为', 
    matchDate: '2024-03-25', 
    matchStatus: '待匹配', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '王老师', 
    roleType: '实习', 
    problem: '-', 
    problemStatus: '已闭环', 
    lastUpdateTime: '2024-03-25', 
    screeningResult: '-', 
    failReason: '-', 
    conversionRate: '85%', 
    feedbackTime: '-', 
    evaluation: '-',
    recommendationTime: '2024-03-25 09:00',
    attendedInterview: false,
    interviewResult: '未开始',
    interviewTime: '-',
    joined: false,
    joinTime: '-',
    enterpriseRating: 0,
    studentBehavior: { noShow: false, rejected: false, reason: '-' }
  },
  { 
    id: 'MAT007', 
    studentId: 'STU002', 
    studentName: '李四', 
    jobId: 'JOB001', 
    jobTitle: '云计算开发工程师', 
    company: '华为', 
    matchDate: '2024-03-25', 
    matchStatus: '待匹配', 
    interviewStatus: '未开始', 
    hireStatus: '待定', 
    owner: '王老师', 
    roleType: '实习', 
    problem: '-', 
    problemStatus: '已闭环', 
    lastUpdateTime: '2024-03-25', 
    screeningResult: '-', 
    failReason: '-', 
    conversionRate: '78%', 
    feedbackTime: '-', 
    evaluation: '-',
    recommendationTime: '2024-03-25 10:00',
    attendedInterview: false,
    interviewResult: '未开始',
    interviewTime: '-',
    joined: false,
    joinTime: '-',
    enterpriseRating: 0,
    studentBehavior: { noShow: false, rejected: false, reason: '-' }
  },
  { 
    id: 'MAT005', 
    studentId: 'STU006', 
    studentName: '韩梅梅', 
    jobId: 'JOB007', 
    jobTitle: '运维支持', 
    company: '新华三', 
    matchDate: '2024-03-07', 
    matchStatus: '已失败', 
    interviewStatus: '已淘汰', 
    hireStatus: '未录用', 
    owner: '孙老师', 
    roleType: '正式', 
    problem: '-', 
    problemStatus: '已闭环', 
    lastUpdateTime: '2024-03-07', 
    screeningResult: '通过', 
    failReason: '薪资期望过高', 
    conversionRate: '20%', 
    feedbackTime: '2024-03-08 09:00', 
    evaluation: '沟通能力尚可',
    // Full Process Fields
    recommendationTime: '2024-03-07 14:00',
    attendedInterview: true,
    interviewResult: '面试未通过',
    interviewTime: '2024-03-08 15:00',
    joined: false,
    joinTime: '-',
    enterpriseRating: 3,
    studentBehavior: { noShow: false, rejected: false, reason: '-' }
  },
  { 
    id: 'MAT008', 
    studentId: 'STU001', 
    studentName: '陈小明', 
    jobId: 'JOB003', 
    jobTitle: '数通工程师', 
    company: '中兴通讯', 
    matchDate: '2024-03-05', 
    matchStatus: '已失败', 
    interviewStatus: '未参加', 
    hireStatus: '未录用', 
    owner: '张老师', 
    roleType: '正式', 
    problem: '学生爽约', 
    problemStatus: '已闭环', 
    lastUpdateTime: '2024-03-06', 
    screeningResult: '通过', 
    failReason: '学生爽约', 
    conversionRate: '0%', 
    feedbackTime: '2024-03-06 11:00', 
    evaluation: '未到场面试',
    // Full Process Fields
    recommendationTime: '2024-03-05 10:00',
    attendedInterview: false,
    interviewResult: '未参加',
    interviewTime: '2024-03-06 14:00',
    joined: false,
    joinTime: '-',
    enterpriseRating: 1,
    studentBehavior: { noShow: true, rejected: false, reason: '个人原因' }
  },
];

const operationsData = [
  { date: '2024-03-12', newEnterprise: 5, newJob: 12, newStudent: 45, recommended: 30, placed: 8, owner: '管理员A' },
  { date: '2024-03-11', newEnterprise: 3, newJob: 8, newStudent: 32, recommended: 25, placed: 5, owner: '管理员B' },
  { date: '2024-03-10', newEnterprise: 4, newJob: 15, newStudent: 50, recommended: 35, placed: 10, owner: '管理员A' },
  { date: '2024-03-09', newEnterprise: 2, newJob: 6, newStudent: 28, recommended: 20, placed: 4, owner: '管理员C' },
  { date: '2024-03-08', newEnterprise: 6, newJob: 20, newStudent: 60, recommended: 45, placed: 12, owner: '管理员B' },
  { date: '2024-03-07', newEnterprise: 1, newJob: 5, newStudent: 22, recommended: 15, placed: 3, owner: '管理员A' },
  { date: '2024-03-06', newEnterprise: 4, newJob: 10, newStudent: 38, recommended: 28, placed: 7, owner: '管理员C' },
  { date: '2024-03-05', newEnterprise: 3, newJob: 9, newStudent: 35, recommended: 22, placed: 6, owner: '管理员B' },
];

const workStatsData = [
  { cycle: '2024-W10', internId: 'INT001', studentId: 'STU001', dailyCount: '5/5', dailyRate: '100%', weeklyCount: '1/1', weeklyRate: '100%', taskRate: '95%', feedback: '表现稳定', riskStatus: '正常', riskReason: '-', note: '继续保持', handleStatus: '已闭环', handler: '李老师' },
  { cycle: '2024-W10', internId: 'INT002', studentId: 'STU002', dailyCount: '3/5', dailyRate: '60%', weeklyCount: '0/1', weeklyRate: '0%', taskRate: '70%', feedback: '提交不及时', riskStatus: '预警', riskReason: '报告缺失', note: '已电话沟通', handleStatus: '处理中', handler: '王老师' },
];

const healthMetricsData = [
  { week: 'W1', syncRate: 98, archiveRate: 95, solveRate: 90, stabilityRate: 92, trainingRate: 70, certRate: 65, skillRate: 60 },
  { week: 'W2', syncRate: 97, archiveRate: 96, solveRate: 88, stabilityRate: 93, trainingRate: 72, certRate: 68, skillRate: 62 },
  { week: 'W3', syncRate: 99, archiveRate: 97, solveRate: 92, stabilityRate: 91, trainingRate: 75, certRate: 70, skillRate: 65 },
  { week: 'W4', syncRate: 98, archiveRate: 98, solveRate: 95, stabilityRate: 94, trainingRate: 78, certRate: 72, skillRate: 68 },
];

const problemManagementData = [
  { id: 'PRB001', type: '匹配问题', detail: '学生反馈面试时间冲突', owner: '李老师', expectedClose: '2024-03-15', status: '处理中' },
  { id: 'PRB002', type: '预警问题', detail: '实习生INT003连续3天未提交日报', owner: '张老师', expectedClose: '2024-03-13', status: '未处理' },
  { id: 'PRB003', type: '滞后岗位', detail: '岗位JOB004超过10天未更新匹配进度', owner: '赵老师', expectedClose: '2024-03-14', status: '已闭环' },
];

const recentActivities = [
  { id: 1, type: 'match', title: '成功匹配：陈小明 - 华为 通信前台工程师', time: '10分钟前' },
  { id: 2, type: 'enterprise', title: '新企业入驻：中兴通讯股份有限公司', time: '1小时前' },
  { id: 3, type: 'job', title: '新岗位发布：新华三 - 数通工程师', time: '3小时前' },
  { id: 4, type: 'student', title: '新学生注册：李雷 - 西安电子科技大学', time: '5小时前' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeTerminal, setActiveTerminal] = useState('管理端');

  // AI Analysis State
  const [aiScoreAnalysis, setAiScoreAnalysis] = useState<ScoreOutput | null>(null);
  const [isAnalyzingScore, setIsAnalyzingScore] = useState(false);
  const [aiFailureAnalysis, setAiFailureAnalysis] = useState<Record<string, FailureReasonOutput & { recommendations?: LearningPathOutput }>>({});
  const [isAnalyzingFailure, setIsAnalyzingFailure] = useState<Record<string, boolean>>({});
  const [aiLearningPath, setAiLearningPath] = useState<LearningPathOutput | null>(null);
  const [isAnalyzingPath, setIsAnalyzingPath] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPoolJobId, setSelectedPoolJobId] = useState('');

  const [selectedEnterprise, setSelectedEnterprise] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedIntern, setSelectedIntern] = useState<any>(null);
  const [students, setStudents] = useState(studentsData);
  const [jobs, setJobs] = useState(jobsData);
  const [enterprises, setEnterprises] = useState(enterprisesData);
  const [interns, setInterns] = useState(internsData);
  const [matches, setMatches] = useState(matchesData);
  const [isManualMatchModalOpen, setIsManualMatchModalOpen] = useState(false);
  const [isInterviewFeedbackModalOpen, setIsInterviewFeedbackModalOpen] = useState(false);
  const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);
  const [feedbackMatchId, setFeedbackMatchId] = useState('');
  const [feedbackResult, setFeedbackResult] = useState('');
  const [assignStudentId, setAssignStudentId] = useState('');
  const [assignedTeacher, setAssignedTeacher] = useState('');
  const [manualMatchStudentId, setManualMatchStudentId] = useState('');
  const [manualMatchJobId, setManualMatchJobId] = useState('');
  const [isRecommendJobModalOpen, setIsRecommendJobModalOpen] = useState(false);
  const [selectedJobToRecommend, setSelectedJobToRecommend] = useState<any>(null);

  // AI Analysis Handlers
  const handleAnalyzeScore = async (student: any) => {
    setIsAnalyzingScore(true);
    try {
      const result = await aiService.generateStudentScore({
        name: student.name,
        school: student.school,
        major: student.major,
        grade: student.grade,
        scoreBreakdown: student.scoreBreakdown
      });
      setAiScoreAnalysis(result);
    } catch (error) {
      console.error("AI Score Analysis Error:", error);
    } finally {
      setIsAnalyzingScore(false);
    }
  };

  const handleAnalyzeFailure = async (match: any) => {
    setIsAnalyzingFailure(prev => ({ ...prev, [match.id]: true }));
    try {
      const failureResult = await aiService.analyzeFailureReason({
        interviewRecord: match.interviewStatus,
        enterpriseFeedback: match.evaluation,
        studentBehavior: match.problem || "无异常行为"
      });
      
      const weaknesses = failureResult.reasons.map(r => r.reason);
      const learningResult = await aiService.recommendLearningPath({ weaknesses });

      setAiFailureAnalysis(prev => ({ 
        ...prev, 
        [match.id]: { 
          ...failureResult,
          recommendations: learningResult
        } 
      }));
    } catch (error) {
      console.error("AI Failure Analysis Error:", error);
    } finally {
      setIsAnalyzingFailure(prev => ({ ...prev, [match.id]: false }));
    }
  };

  const completeCourse = (studentId: string, course: any) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const scoreIncrease = course.scoreIncrease || 5;
        const newScore = Math.min(100, s.score + scoreIncrease);
        const newSkillTags = Array.from(new Set([...(s.skillTags || []), course.skillImproved]));
        
        // Update score breakdown proportionally
        const newScoreBreakdown = { ...s.scoreBreakdown };
        const keys = Object.keys(newScoreBreakdown);
        const perKeyIncrease = scoreIncrease / keys.length;
        keys.forEach(key => {
          newScoreBreakdown[key] = Math.min(100, (newScoreBreakdown[key] as number) + perKeyIncrease);
        });

        const improvement = {
          id: `IMP${Date.now()}`,
          courseName: course.title,
          skillImproved: course.skillImproved,
          scoreIncrease,
          date: new Date().toISOString().split('T')[0]
        };

        const updatedStudent = {
          ...s,
          score: newScore,
          skillTags: newSkillTags,
          lastScoreUpdateTime: new Date().toISOString().split('T')[0],
          improvementHistory: [improvement, ...(s.improvementHistory || [])],
          scoreBreakdown: newScoreBreakdown
        };

        // Update selectedStudent if it's the one being modified
        if (selectedStudent?.id === studentId) {
          setSelectedStudent(updatedStudent);
        }

        return updatedStudent;
      }
      return s;
    }));
  };

  const handleRecommendPath = async (student: any) => {
    setIsAnalyzingPath(true);
    try {
      const weaknesses = Object.entries(student.scoreBreakdown)
        .filter(([_, score]) => (score as number) < 85)
        .map(([key, _]) => key);
      
      const result = await aiService.recommendLearningPath({ weaknesses });
      setAiLearningPath(result);
    } catch (error) {
      console.error("AI Learning Path Error:", error);
    } finally {
      setIsAnalyzingPath(false);
    }
  };

  const isStudentLocked = (studentId: string) => {
    return matches.some(m => 
      m.studentId === studentId && 
      (m.matchStatus === '已推荐' || m.matchStatus === '面试中')
    );
  };

  const isStudentBound = (studentId: string) => {
    return matches.some(m => 
      m.studentId === studentId && 
      ['已推荐', '面试中'].includes(m.matchStatus)
    );
  };

  const triggerPenalty = (studentId: string, behaviorType: string, reason: string) => {
    const penaltyMap: Record<string, number> = {
      '不参加面试': 10,
      '面试通过但拒绝入职': 15,
      '主动放弃岗位': 5,
      '多次爽约': 20
    };

    const deduction = penaltyMap[behaviorType] || 5;

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const newBehaviorScore = Math.max(0, (s.behaviorScore || 100) - deduction);
        const newScore = Math.max(0, s.score - deduction);
        
        let newRiskLevel = '低';
        if (newBehaviorScore < 60) newRiskLevel = '高';
        else if (newBehaviorScore < 85) newRiskLevel = '中';

        let newGradeLevel = 'D';
        if (newScore >= 90) newGradeLevel = 'A';
        else if (newScore >= 80) newGradeLevel = 'B';
        else if (newScore >= 70) newGradeLevel = 'C';

        const newPenalty = {
          type: behaviorType,
          deduction,
          reason,
          date: new Date().toISOString().split('T')[0]
        };

        return {
          ...s,
          behaviorScore: newBehaviorScore,
          score: newScore,
          riskLevel: newRiskLevel,
          gradeLevel: newGradeLevel,
          penaltyHistory: [newPenalty, ...(s.penaltyHistory || [])]
        };
      }
      return s;
    }));
  };

  const handleInterviewFeedbackSubmit = () => {
    if (!feedbackMatchId || !feedbackResult) return;
    
    setMatches(prev => prev.map(m => {
      if (m.id === feedbackMatchId) {
        return {
          ...m,
          interviewStatus: feedbackResult === '通过' ? '已通过' : '已淘汰',
          matchStatus: feedbackResult === '通过' ? '面试中' : '已失败',
          evaluation: `企业反馈：${feedbackResult}`,
          feedbackTime: new Date().toISOString().split('T')[0]
        };
      }
      return m;
    }));
    
    setIsInterviewFeedbackModalOpen(false);
    setFeedbackResult('');
    setFeedbackMatchId('');
  };

  const handleAssignTeacher = () => {
    if (!assignStudentId || !assignedTeacher) return;
    
    setStudents(prev => prev.map(s => {
      if (s.id === assignStudentId) {
        return {
          ...s,
          owner: assignedTeacher
        };
      }
      return s;
    }));
    
    setIsAssignTeacherModalOpen(false);
    setAssignedTeacher('');
    setAssignStudentId('');
  };

  const handleRecommendJobToStudent = (studentId: string) => {
    if (!selectedJobToRecommend || !studentId) return;
    
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const newMatch = {
      id: `MATCH${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      jobId: selectedJobToRecommend.id,
      jobTitle: selectedJobToRecommend.title,
      company: selectedJobToRecommend.company,
      matchStatus: '已推荐',
      matchScore: 85,
      recommendTime: new Date().toISOString().split('T')[0],
      owner: '学生拓展端'
    };

    setMatches(prev => [newMatch, ...prev]);
    setIsRecommendJobModalOpen(false);
    setSelectedJobToRecommend(null);
  };

  const updateMatchStatus = (matchId: string, newStatus: string) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    // Handle recommendation limit deduction
    const deductionBehaviors: Record<string, string> = {
      '已放弃_主动放弃': '主动放弃岗位',
      '已失败_不参加面试': '不参加面试',
      '已失败_拒绝入职': '面试通过但拒绝入职'
    };

    const behavior = deductionBehaviors[newStatus];
    let deductionReason = '';
    if (behavior) {
      deductionReason = prompt(`请输入扣减原因 (${behavior}):`) || '未填写原因';
      // Trigger behavior penalty
      triggerPenalty(match.studentId, behavior, deductionReason);
    }

    setMatches(prev => {
      const updated = prev.map(m => {
        if (m.id === matchId) {
          const updatedMatch = { ...m, matchStatus: newStatus, lastUpdateTime: new Date().toISOString().split('T')[0] };
          // Trigger AI analysis if failed
          if (newStatus.startsWith('已失败')) {
            handleAnalyzeFailure(updatedMatch);
          }
          return updatedMatch;
        }
        return m;
      });
      return updated;
    });

    if (behavior) {
      setStudents(prev => prev.map(s => {
        if (s.id === match.studentId) {
          const updatedStudent = {
            ...s,
            recommendationsUsed: s.recommendationsUsed + 1,
            recommendationLogs: [
              { behavior, time: new Date().toISOString().split('T')[0], reason: deductionReason },
              ...s.recommendationLogs
            ]
          };
          if (selectedStudent?.id === s.id) setSelectedStudent(updatedStudent);
          return updatedStudent;
        }
        return s;
      }));
    }
  };

  const calculatePriorityScore = (student: any, job: any) => {
    // Priority Score = Student Score + Behavior Score + Historical Performance Weight * 10
    return student.score + (student.behaviorScore || 100) + (student.historicalPerformanceWeight || 1.0) * 10;
  };

  const getFilterReason = (student: any, job: any) => {
    if (student.score < (job.minStudentScore || 0)) {
      return `学生评分 (${student.score}) 低于企业最低要求 (${job.minStudentScore})`;
    }
    if (student.riskLevel === '高' && job.score > 85) {
      return `风险等级为“高”，不可投递优质岗位`;
    }
    if (student.behaviorScore < 70 && job.score > 90) {
      return `行为评分过低 (${student.behaviorScore})，不可投递顶级岗位`;
    }
    return '-';
  };

  const generateCandidatePool = (jobId: string, topN: number = 5) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return [];

    return students
      .map(student => ({
        ...student,
        priorityScore: calculatePriorityScore(student, job),
        filterReason: getFilterReason(student, job)
      }))
      .filter(s => s.filterReason === '-')
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, topN);
  };

  const createMatch = (studentId: string, jobId: string, source: 'AI' | '人工' = '人工', isForced: boolean = false) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    if (student.recommendationLimit - student.recommendationsUsed <= 0 && !isForced) {
      alert('不可继续推荐：该学生推荐次数已耗尽。');
      return;
    }

    if (isStudentBound(studentId) && !isForced) {
      alert('该学生当前已绑定岗位，无法进行新的匹配。请先释放现有绑定。');
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const filterReason = getFilterReason(student, job);
    if (filterReason !== '-' && !isForced) {
      alert(`匹配受限：${filterReason}`);
      return;
    }

    const newMatch = {
      id: `MAT${String(matches.length + 1).padStart(3, '0')}`,
      studentId,
      studentName: student.name,
      jobId,
      jobTitle: job.title,
      company: job.company,
      matchDate: new Date().toISOString().split('T')[0],
      matchStatus: '待匹配',
      interviewStatus: '未开始',
      hireStatus: '待定',
      owner: '管理员',
      roleType: job.roleType,
      lastUpdateTime: new Date().toISOString().split('T')[0],
      priorityScore: calculatePriorityScore(student, job),
      matchSource: source,
      filterReason: isForced && filterReason !== '-' ? `[强制推荐] ${filterReason}` : filterReason
    };

    setMatches(prev => [newMatch, ...prev]);
    setIsManualMatchModalOpen(false);
    setManualMatchStudentId('');
    setManualMatchJobId('');
  };

  const updateStudentScore = (studentId: string, newBreakdown: any) => {
    const totalScore = Object.values(newBreakdown).reduce((acc: number, val: any) => acc + Number(val), 0) as number;
    let gradeLevel = 'D';
    if (totalScore >= 90) gradeLevel = 'A';
    else if (totalScore >= 80) gradeLevel = 'B';
    else if (totalScore >= 70) gradeLevel = 'C';

    setStudents(prev => prev.map(s => 
      s.id === studentId 
        ? { ...s, score: totalScore, gradeLevel, scoreBreakdown: newBreakdown }
        : s
    ));
    
    // Update selectedStudent if it's the one being modified
    if (selectedStudent?.id === studentId) {
      setSelectedStudent((prev: any) => ({
        ...prev,
        score: totalScore,
        gradeLevel,
        scoreBreakdown: newBreakdown
      }));
    }
  };

  const updateJobScore = (jobId: string, newScore: number) => {
    setJobs(prev => prev.map(j => 
      j.id === jobId ? { ...j, score: newScore } : j
    ));
    if (selectedJob?.id === jobId) {
      setSelectedJob((prev: any) => ({ ...prev, score: newScore }));
    }
  };

  const updateEnterpriseScore = (entId: string, newScore: number) => {
    setEnterprises(prev => prev.map(e => 
      e.id === entId ? { ...e, score: newScore } : e
    ));
    if (selectedEnterprise?.id === entId) {
      setSelectedEnterprise((prev: any) => ({ ...prev, score: newScore }));
    }
  };

  const [internSubTab, setInternSubTab] = useState('实习生列表');
  const [opSubTab, setOpSubTab] = useState('运营日志');

  const [entInternDemandFilter, setEntInternDemandFilter] = useState('全部');
  const [entSkillFilter, setEntSkillFilter] = useState('全部');
  const [jobKeyFilter, setJobKeyFilter] = useState('全部');
  const [jobConvertFilter, setJobConvertFilter] = useState('全部');
  const [jobSourceFilter, setJobSourceFilter] = useState('全部');
  const [jobCycleFilter, setJobCycleFilter] = useState('全部');
  const [jobSkillFilter, setJobSkillFilter] = useState('全部');

  const [stuJobTypeFilter, setStuJobTypeFilter] = useState('全部');
  const [stuStatusFilter, setStuStatusFilter] = useState('全部');
  const [stuCollegeFilter, setStuCollegeFilter] = useState('全部');
  const [stuAbilityFilter, setStuAbilityFilter] = useState('全部');
  const [stuCertFilter, setStuCertFilter] = useState('全部');

  const [matchStatusFilter, setMatchStatusFilter] = useState('全部');
  const [matchSkillMasteryFilter, setMatchSkillMasteryFilter] = useState(false);
  const [matchCertPassedFilter, setMatchCertPassedFilter] = useState(false);
  const [matchLaggingFilter, setMatchLaggingFilter] = useState(false);
  const [matchPendingTrainingFilter, setMatchPendingTrainingFilter] = useState(false);

  const [historySearchStudent, setHistorySearchStudent] = useState('');
  const [historySearchCompany, setHistorySearchCompany] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('全部');

  const [internStatusFilter, setInternStatusFilter] = useState('全部');
  const [internConvertedFilter, setInternConvertedFilter] = useState('全部');
  const [workStatsCycleFilter, setWorkStatsCycleFilter] = useState('全部');
  const [workStatsRiskFilter, setWorkStatsRiskFilter] = useState('全部');
  const [schoolMajorFilter, setSchoolMajorFilter] = useState('全部专业');
  const [schoolClassFilter, setSchoolClassFilter] = useState('全部班级');
  const [schoolTimeFilter, setSchoolTimeFilter] = useState('本学期');

  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [schoolSortField, setSchoolSortField] = useState<'students' | 'employmentRate'>('students');
  const [schoolSortOrder, setSchoolSortOrder] = useState<'asc' | 'desc'>('desc');

  const [trainingSubTab, setTrainingSubTab] = useState('课程库');
  const [courseSkillFilter, setCourseSkillFilter] = useState('全部');
  const [courseJobTypeFilter, setCourseJobTypeFilter] = useState('全部');

  const [entGradeFilter, setEntGradeFilter] = useState('全部');
  const [jobGradeFilter, setJobGradeFilter] = useState('全部');
  const [stuGradeFilter, setStuGradeFilter] = useState('全部');

  const [isEntJobModalOpen, setIsEntJobModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isExpEntModalOpen, setIsExpEntModalOpen] = useState(false);
  const [isStuModalOpen, setIsStuModalOpen] = useState(false);
  const [isStuScoreModalOpen, setIsStuScoreModalOpen] = useState(false);
  const [isJobScoreModalOpen, setIsJobScoreModalOpen] = useState(false);
  const [isEntScoreModalOpen, setIsEntScoreModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSkillConfigModalOpen, setIsSkillConfigModalOpen] = useState(false);
  const [isMatchedStudentsModalOpen, setIsMatchedStudentsModalOpen] = useState(false);
  const [isAbilityEvalModalOpen, setIsAbilityEvalModalOpen] = useState(false);
  const [selectedInternForReport, setSelectedInternForReport] = useState<any>(null);
  const [selectedJobForAssessment, setSelectedJobForAssessment] = useState<any>(null);
  const [isSkillReportModalOpen, setIsSkillReportModalOpen] = useState(false);
  const [selectedInternDetail, setSelectedInternDetail] = useState<any>(null);
  const [entInternJobFilter, setEntInternJobFilter] = useState('全部岗位');
  const [entInternPerfFilter, setEntInternPerfFilter] = useState('全部表现');
  const [entInternUsabilityFilter, setEntInternUsabilityFilter] = useState('全部可用性');
  const [entInternDiagFilter, setEntInternDiagFilter] = useState('全部诊断');
  const [showHiringSuccess, setShowHiringSuccess] = useState<any>(null);
  const [entJobType, setEntJobType] = useState('实习');

  const RoleTag = ({ type }: { type: string }) => (
    <span className={cn(
      "text-[10px] font-bold px-1.5 py-0.5 rounded ml-2 uppercase",
      type === '实习' ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
    )}>
      {type}
    </span>
  );

  const terminals = ['管理端', '企业端', '岗位拓展端', '学生拓展端', '学生端', '学校端'];

  const getMenuItems = () => {
    switch (activeTerminal) {
      case '企业端':
        return [
          { name: '招聘决策看板', icon: LayoutDashboard },
          { name: '我的岗位', icon: Briefcase },
          { name: '推荐人才', icon: UserPlus },
          { name: '我的实习生', icon: GraduationCap },
          { name: '培训认证', icon: BookOpen },
          { name: '技能点配置', icon: Settings },
        ];
      case '岗位拓展端':
        return [
          { name: '我的企业', icon: Building2 },
          { name: '我的岗位', icon: Briefcase },
          { name: '岗位跟进', icon: UserCheck },
          { name: '拓展人员管理', icon: Users },
        ];
      case '学生拓展端':
        return [
          { name: '我的学校', icon: Building2 },
          { name: '我的学生', icon: Users },
          { name: '岗位推荐', icon: Briefcase },
          { name: '能力测评', icon: FileText },
          { name: '拓展人员', icon: UserCheck },
        ];
      case '学生端':
        return [
          { name: '首页', icon: LayoutDashboard },
          { name: '我的岗位', icon: Briefcase },
          { name: '我的实习', icon: GraduationCap },
          { name: '我的培训', icon: BookOpen },
          { name: '我的证书', icon: Award },
          { name: '技能测评', icon: Target },
        ];
      case '学校端':
        return [
          { name: '实习概览', icon: LayoutDashboard },
          { name: '过程监控', icon: UserCheck },
          { name: '评分体系', icon: Award },
          { name: '数据可视化', icon: BarChart3 },
        ];
      default: // 管理端
        return [
          { name: 'Dashboard', icon: LayoutDashboard },
          { type: 'header', name: '资源层' },
          { name: '企业资源池', icon: Building2 },
          { name: '岗位资源池', icon: Briefcase },
          { name: '学生资源池', icon: Users },
          { type: 'header', name: '核心能力层' },
          { name: '人岗匹配', icon: UserCheck },
          { name: '实习生管理', icon: GraduationCap },
          { name: '培训认证', icon: BookOpen },
          { type: 'header', name: '系统管理' },
          { name: '数据中心', icon: History },
          { name: '运营管理', icon: Settings },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen bg-[#F8F9FB] text-[#1A1C1E] font-sans">
      {/* 录用成功弹窗 */}
      {showHiringSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">录用通知已发起</h3>
              <p className="text-[#646D76] mb-8">
                已向 <span className="font-bold text-gray-900">{showHiringSuccess.name}</span> 发起正式录用通知。<br/>
                系统已自动生成《全过程能力评估报告》，将作为入职凭证同步至企业HR系统。
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowHiringSuccess(null)}
                  className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                  确定
                </button>
                <button 
                  className="w-full py-3 bg-gray-50 text-[#646D76] rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  下载入职凭证报告
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-[#E1E3E6] transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            T
          </div>
          {isSidebarOpen && <span className="font-bold text-lg tracking-tight">TalentHub</span>}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item: any, idx) => (
            item.type === 'header' ? (
              isSidebarOpen ? (
                <div key={`header-${idx}`} className="px-3 pt-4 pb-2 text-[10px] font-bold text-[#646D76] uppercase tracking-wider">
                  {item.name}
                </div>
              ) : (
                <div key={`header-${idx}`} className="h-px bg-gray-100 my-4 mx-2" />
              )
            ) : (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                  activeTab === item.name 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-[#646D76] hover:bg-gray-50 hover:text-[#1A1C1E]"
                )}
              >
                <item.icon className={cn("w-5 h-5", activeTab === item.name ? "text-blue-600" : "text-[#646D76] group-hover:text-[#1A1C1E]")} />
                {isSidebarOpen && <span>{item.name}</span>}
                {activeTab === item.name && isSidebarOpen && (
                  <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}
              </button>
            )
          ))}
        </nav>

        <div className="p-4 border-t border-[#E1E3E6]">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 text-[#646D76] hover:text-[#1A1C1E] transition-colors"
          >
            <Menu className="w-5 h-5" />
            {isSidebarOpen && <span>收起菜单</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b border-[#E1E3E6] flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                T
              </div>
              <h1 className="text-lg font-bold tracking-tight">人才服务运营平台</h1>
            </div>

            {/* Terminal Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded-xl ml-4">
              {terminals.map((t) => (
                <button
                  key={`terminal-${t}`}
                  onClick={() => {
                    setActiveTerminal(t);
                    if (t === '管理端') setActiveTab('Dashboard');
                    else if (t === '企业端') setActiveTab('招聘决策看板');
                    else if (t === '学生拓展端') setActiveTab('我的学校');
                    else if (t === '岗位拓展端') setActiveTab('我的企业');
                    else setActiveTab('首页');
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    activeTerminal === t ? "bg-white text-blue-600 shadow-sm" : "text-[#646D76] hover:text-gray-900"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#646D76]" />
              <input 
                type="text" 
                placeholder="搜索资源、岗位..." 
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            <button className="relative p-2 text-[#646D76] hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">管理员</p>
                <p className="text-xs text-[#646D76]">运营中心</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTerminal === '企业端' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {activeTab === '招聘决策看板' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">企业用人决策看板</h2>
                      <p className="text-[#646D76] mt-1">从过程管理转向用人决策：识别可用人才，预警潜在风险。</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setActiveTab('我的实习生')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm shadow-blue-200"
                      >
                        <UserCheck2 className="w-4 h-4" />
                        查看可转正名单
                      </button>
                      <button 
                        onClick={() => setActiveTab('我的实习生')}
                        className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-all flex items-center gap-2"
                      >
                        <UserMinus className="w-4 h-4" />
                        标记淘汰/更换人员
                      </button>
                      <button 
                        className="px-4 py-2 bg-white border border-[#E1E3E6] text-[#1A1C1E] rounded-xl text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        申请补充人力
                      </button>
                    </div>
                  </div>
                  
                  {/* Hiring Structure Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm relative overflow-hidden group hover:border-emerald-400 transition-all">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-emerald-100" />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-[#646D76] font-medium">当前可录用 (Ready to Hire)</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-4xl font-bold text-[#1A1C1E]">
                            {internsData.filter(i => i.usabilityStatus === '可录用').length}
                          </p>
                          <p className="text-sm text-[#646D76]">人已通过全部考核</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium cursor-pointer hover:underline">
                          查看名单 <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm relative overflow-hidden group hover:border-blue-400 transition-all">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-blue-100" />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                          <UserCheck2 className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-[#646D76] font-medium">当前可实习 (Ready for Internship)</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-4xl font-bold text-[#1A1C1E]">
                            {internsData.filter(i => i.usabilityStatus === '可上岗').length}
                          </p>
                          <p className="text-sm text-[#646D76]">人已通过培训考核</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                          查看名单 <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm relative overflow-hidden group hover:border-amber-400 transition-all">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-amber-100" />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-amber-600" />
                          <span className="text-sm text-[#646D76] font-medium">待提升人员 (Needs Improvement)</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-4xl font-bold text-[#1A1C1E]">
                            {internsData.filter(i => i.usabilityStatus === '待提升').length}
                          </p>
                          <p className="text-sm text-[#646D76]">人存在技能缺口</p>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-[10px] text-amber-700 font-bold">
                            <span>培训类缺口：{internsData.filter(i => i.usabilityStatus === '待提升' && i.skillPointResults?.some((s: any) => s.category === 'training' && s.score < 70)).length}人</span>
                            <span>实习类缺口：{internsData.filter(i => i.usabilityStatus === '待提升' && i.skillPointResults?.some((s: any) => s.category === 'internship' && s.score < 70)).length}人</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-amber-600 font-medium cursor-pointer hover:underline">
                            查看补强计划 <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm relative overflow-hidden group hover:border-red-400 transition-all">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-red-100" />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertOctagon className="w-5 h-5 text-red-600" />
                          <span className="text-sm text-[#646D76] font-medium">不可用/待淘汰 (Unusable)</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-4xl font-bold text-[#1A1C1E]">
                            {internsData.filter(i => i.usabilityStatus === '不可用').length}
                          </p>
                          <p className="text-sm text-[#646D76]">人未学习或考核失败</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-red-600 font-medium cursor-pointer hover:underline">
                          处理建议 <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Alerts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-[#E1E3E6] flex justify-between items-center bg-red-50/30">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-red-600" />
                          <h3 className="font-bold text-red-900">核心风险预警</h3>
                        </div>
                        <span className="text-xs text-red-600 font-bold bg-red-100 px-2 py-1 rounded-full">3 条待处理</span>
                      </div>
                      <div className="divide-y divide-[#E1E3E6]">
                        {[
                          { name: '李雷', type: '低绩效风险', detail: '连续两周周报评分低于60，考核未通过', color: 'text-red-600', bg: 'bg-red-50' },
                          { name: '林静', type: '技能不匹配', detail: '产品原型设计得分远低于岗位要求(45/100)', color: 'text-amber-600', bg: 'bg-amber-50' },
                          { name: '王小明', type: '高流失风险', detail: 'AI分析显示近期活跃度下降，且有离职倾向言论', color: 'text-orange-600', bg: 'bg-orange-50' },
                        ].map((risk, idx) => (
                          <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                                {risk.name[0]}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm">{risk.name}</span>
                                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-bold uppercase", risk.bg, risk.color)}>
                                    {risk.type}
                                  </span>
                                </div>
                                <p className="text-xs text-[#646D76] mt-1">{risk.detail}</p>
                              </div>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all opacity-0 group-hover:opacity-100">
                              <ArrowRight className="w-4 h-4 text-[#646D76]" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-gray-50 text-center">
                        <button className="text-xs font-bold text-blue-600 hover:underline">查看全部风险人员</button>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold">岗位标准配置状态</h3>
                        <HelpCircle className="w-4 h-4 text-[#646D76]" />
                      </div>
                      <div className="space-y-4">
                        {[
                          { title: '通信前台工程师', status: '已完善', color: 'text-emerald-600' },
                          { title: '存储工程师', status: '已完善', color: 'text-emerald-600' },
                          { title: '数通工程师', status: '已完善', color: 'text-emerald-600' },
                          { title: 'AI应用开发工程师', status: '待配置切片', color: 'text-amber-600' },
                        ].map((job, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium">{job.title}</span>
                            <span className={cn("text-xs font-bold", job.color)}>{job.status}</span>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => setActiveTab('我的岗位')}
                        className="w-full mt-6 py-2 border border-[#E1E3E6] rounded-xl text-xs font-bold text-[#646D76] hover:bg-gray-50 transition-colors"
                      >
                        前往岗位管理配置标准
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                    <h3 className="font-bold mb-6">用人决策支持工具说明</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1">标准定义</h4>
                          <p className="text-xs text-[#646D76] leading-relaxed">通过岗位绑定技能、权重及题库，建立企业专属的用人准入标准。</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1">结果导向</h4>
                          <p className="text-xs text-[#646D76] leading-relaxed">培训与考试结果直接转化为“可用/不可用”状态，辅助快速决策。</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                          <ShieldAlert className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1">风险前置</h4>
                          <p className="text-xs text-[#646D76] leading-relaxed">AI实时分析实习过程数据，提前预警低绩效与流失风险，减少用人损失。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '我的岗位' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">我的岗位管理</h2>
                    <button 
                      onClick={() => setIsEntJobModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      发布新岗位
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">岗位名称 / ID</th>
                          <th className="px-6 py-4 font-semibold">技能点与切片课程</th>
                          <th className="px-6 py-4 font-semibold">绑定考核标准</th>
                          <th className="px-6 py-4 font-semibold">上岗规则</th>
                          <th className="px-6 py-4 font-semibold">当前在岗/匹配</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                      {jobsData
                        .filter(j => ['华为', '浪潮信息', '新华三', '海康威视', '百度', '中兴通讯'].includes(j.company))
                        .map(job => (
                          <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold">{job.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <RoleTag type={job.type} />
                                <span className="text-[10px] text-[#646D76] font-mono">{job.id}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                {job.skillPoints ? job.skillPoints.map((sp: any) => (
                                  <div key={sp.id} className="flex items-center gap-2">
                                    <span className="text-[10px] text-[#646D76] w-16 truncate font-bold">{sp.name}</span>
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] border border-blue-100">
                                      <FileText className="w-2.5 h-2.5" />
                                      {sp.sliceName}
                                    </div>
                                  </div>
                                )) : (
                                  <span className="text-xs text-red-500">未配置技能点</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                {job.skillPoints?.map((sp: any) => (
                                  <div key={sp.id} className="flex items-center gap-1 text-[10px] text-[#646D76]">
                                    <Award className="w-3 h-3 text-amber-500" />
                                    <span>{sp.exam}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "w-8 h-4 rounded-full relative transition-colors cursor-pointer",
                                    job.isTrainingRequired ? "bg-blue-600" : "bg-gray-300"
                                  )}>
                                    <div className={cn(
                                      "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                                      job.isTrainingRequired ? "right-0.5" : "left-0.5"
                                    )} />
                                  </div>
                                  <span className="text-[10px] font-medium text-[#646D76]">
                                    {job.isTrainingRequired ? '强制准入' : '非强制'}
                                  </span>
                                </div>
                                <span className="text-[9px] text-gray-400">{job.hiringRule}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-baseline gap-1">
                                <span className="text-sm font-bold text-blue-600">8</span>
                                <span className="text-[10px] text-[#646D76]">/ 12</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-3">
                                <button 
                                  onClick={() => setIsMatchedStudentsModalOpen(true)}
                                  className="text-xs text-blue-600 font-bold hover:underline"
                                >
                                  人才匹配
                                </button>
                                <button className="text-xs text-[#646D76] font-bold hover:underline">编辑配置</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '推荐人才' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">推荐人才库</h2>
                      <p className="text-[#646D76] mt-1">基于岗位技能点匹配的优质人才推荐。</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches
                      .filter(m => m.company === '华为' && m.matchStatus === '待匹配') // Mocking for '华为'
                      .map(match => {
                        const student = students.find(s => s.id === match.studentId);
                        return (
                          <div key={match.id} className="bg-white rounded-3xl border border-[#E1E3E6] shadow-sm overflow-hidden hover:shadow-md transition-all group">
                            <div className="p-6 border-b border-gray-50 bg-gradient-to-br from-blue-50/50 to-transparent">
                              <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl">
                                  {match.studentName[0]}
                                </div>
                                <div className="text-right">
                                  <div className="text-[10px] text-[#646D76] font-bold uppercase tracking-wider mb-1">匹配度</div>
                                  <div className="text-xl font-black text-blue-600">92%</div>
                                </div>
                              </div>
                              <h3 className="text-lg font-bold">{match.studentName}</h3>
                              <p className="text-xs text-[#646D76]">{student?.school} · {student?.major}</p>
                            </div>
                            <div className="p-6 space-y-4">
                              <div className="space-y-2">
                                <p className="text-[10px] font-bold text-[#646D76] uppercase tracking-wider">核心技能</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {student?.skillTags?.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-[#1A1C1E] rounded text-[10px] font-medium">{tag}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="pt-4 border-t border-gray-50 flex gap-2">
                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">查看简历</button>
                                <button 
                                  onClick={() => {
                                    setFeedbackMatchId(match.id);
                                    setIsInterviewFeedbackModalOpen(true);
                                  }}
                                  className="flex-1 px-4 py-2 bg-white border border-[#E1E3E6] text-[#1A1C1E] rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors"
                                >
                                  反馈面试
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {activeTab === '我的实习生' && (
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
                        <option>通信工程</option>
                        <option>存储工程师</option>
                        <option>数通工程师</option>
                        <option>AI应用开发</option>
                        <option>硬件测试</option>
                        <option>运维支持</option>
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
                      <select 
                        value={entInternUsabilityFilter}
                        onChange={(e) => setEntInternUsabilityFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-[#E1E3E6] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="全部可用性">全部可用性</option>
                        <option value="可实习">可实习 (Ready for Internship)</option>
                        <option value="可录用">可录用 (Ready for Hire)</option>
                        <option value="待提升">待提升 (Needs Improvement)</option>
                      </select>
                    </div>
                  </div>

                  {/* Intern Summary Stats */}
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
                        className="flex items-center gap-2 text-sm text-[#646D76] hover:text-blue-600 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        返回列表
                      </button>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 基础信息 */}
                        <div className="lg:col-span-1 space-y-6">
                          <div className="bg-white p-8 rounded-3xl border border-[#E1E3E6] shadow-sm text-center">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mx-auto mb-4 relative">
                              {selectedInternDetail.name[0]}
                              <div className={cn(
                                "absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs font-black",
                                selectedInternDetail.assessmentGrade === 'A' ? "bg-emerald-500 text-white" : 
                                selectedInternDetail.assessmentGrade === 'B' ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                              )}>
                                {selectedInternDetail.assessmentGrade}
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold">{selectedInternDetail.name}</h3>
                            <div className="mt-2 flex flex-col items-center gap-2">
                              <span className={cn(
                                "text-xs font-bold px-3 py-1 rounded-full",
                                selectedInternDetail.usabilityStatus === '可录用' ? "bg-emerald-50 text-emerald-600" : 
                                selectedInternDetail.usabilityStatus === '可实习' ? "bg-blue-50 text-blue-600" : 
                                selectedInternDetail.usabilityStatus === '待提升' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                              )}>
                                {selectedInternDetail.usabilityStatus}
                              </span>
                              {selectedInternDetail.usabilityStatus === '可录用' && (
                                <button 
                                  onClick={() => {
                                    setShowHiringSuccess(selectedInternDetail);
                                  }}
                                  className="w-full mt-2 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                                >
                                  <UserCheck2 className="w-4 h-4" />
                                  发起正式录用
                                </button>
                              )}
                            </div>
                            <p className="text-[#646D76] text-sm mt-2">学号：{selectedInternDetail.id}</p>
                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4 text-left">
                              <div className="flex justify-between">
                                <span className="text-sm text-[#646D76]">所属岗位</span>
                                <span className="text-sm font-bold">{selectedInternDetail.position}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-[#646D76]">入岗时间</span>
                                <span className="text-sm font-bold">2024-01-15</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-[#646D76]">实习时长</span>
                                <span className="text-sm font-bold">2个月</span>
                              </div>
                            </div>
                          </div>

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
                                  <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                  />
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
                                <p className="text-xs text-[#646D76] mb-2">优势技能</p>
                                <div className="flex flex-wrap gap-2">
                                  {['5G NR', '无线网优'].map(s => (
                                    <span key={s} className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg font-bold">{s}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-[#646D76] mb-2">薄弱项</p>
                                <div className="flex flex-wrap gap-2">
                                  {['Redis缓存', 'Docker部署'].map(s => (
                                    <span key={s} className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-lg font-bold">{s}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="pt-4 border-t border-gray-100 space-y-4">
                                <div className="flex justify-between text-xs">
                                  <span className="text-[#646D76]">切片评估进度</span>
                                  <span className="font-bold">
                                    {internsData.find(i => i.id === 'INT-2024001')?.skillPointResults?.filter((r: any) => r.status === '通过').length} / {internsData.find(i => i.id === 'INT-2024001')?.skillPointResults?.length}
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full" style={{width: '75%'}} />
                                </div>
                                <div className="space-y-2">
                                  {internsData.find(i => i.id === 'INT-2024001')?.skillPointResults?.map((res: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                                      <div className="flex items-center gap-2">
                                        <div className={cn(
                                          "w-2 h-2 rounded-full",
                                          res.status === '通过' ? "bg-emerald-500" : "bg-red-500"
                                        )} />
                                        <span className="text-[10px] font-bold">{res.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[9px] text-gray-400">{res.exam}</span>
                                        <span className={cn(
                                          "text-[9px] font-bold px-1.5 py-0.5 rounded",
                                          res.status === '通过' ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                                        )}>{res.status}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 工作记录与评价 */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm">
                            <h4 className="font-bold mb-6 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-emerald-600" />
                              日常工作记录
                            </h4>
                            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                              {[
                                { date: '2024-03-15', type: '日报', title: '完成订单模块接口联调', status: '已审核' },
                                { date: '2024-03-12', type: '周报', title: '第8周实习总结：掌握Redis基本操作', status: '已审核' },
                                { date: '2024-03-10', type: '日报', title: '修复支付回调逻辑Bug', status: '已审核' },
                              ].map((item, idx) => (
                                <div key={idx} className="relative pl-12">
                                  <div className="absolute left-0 top-1 w-10 h-10 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center z-10">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                  </div>
                                  <div className="p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="text-xs font-bold text-blue-600">{item.type} · {item.date}</span>
                                      <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded">{item.status}</span>
                                    </div>
                                    <p className="text-sm font-medium">{item.title}</p>
                                    <button className="mt-2 text-[10px] text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">查看详情</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm">
                            <h4 className="font-bold mb-6 flex items-center gap-2">
                              <Settings className="w-5 h-5 text-amber-600" />
                              企业评价与去留意见
                            </h4>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-[#646D76]">月度/季度评价</label>
                                  <select className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none">
                                    <option>2024年3月月度评价</option>
                                    <option>2024年第一季度评价</option>
                                  </select>
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
                    <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">实习生姓名 / ID</th>
                            <th className="px-6 py-4 font-semibold">可用性状态</th>
                            <th className="px-6 py-4 font-semibold">考核等级</th>
                            <th className="px-6 py-4 font-semibold">转正建议</th>
                            <th className="px-6 py-4 font-semibold">风险标签</th>
                            <th className="px-6 py-4 font-semibold text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E1E3E6]">
                          {interns
                            .filter(intern => entInternJobFilter === '全部岗位' || intern.position === entInternJobFilter)
                            .filter(intern => entInternPerfFilter === '全部表现' || intern.result === entInternPerfFilter)
                            .filter(intern => entInternUsabilityFilter === '全部可用性' || intern.usabilityStatus === entInternUsabilityFilter)
                            .map(intern => (
                            <tr key={intern.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <button 
                                  onClick={() => setSelectedInternDetail(intern)}
                                  className="text-left group"
                                >
                                  <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors">{intern.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-[#646D76] font-mono">{intern.id}</span>
                                    <span className="text-[10px] text-[#646D76] font-medium">· {intern.position}</span>
                                  </div>
                                </button>
                              </td>
                              <td className="px-6 py-4">
                                <span className={cn(
                                  "text-xs font-bold px-2 py-1 rounded-lg",
                                  intern.usabilityStatus === '可上岗' ? "bg-emerald-50 text-emerald-600" : 
                                  intern.usabilityStatus === '待提升' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                )}>
                                  {intern.usabilityStatus}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className={cn(
                                    "text-lg font-black",
                                    intern.assessmentGrade === 'A' ? "text-emerald-600" : 
                                    intern.assessmentGrade === 'B' ? "text-amber-600" : "text-red-600"
                                  )}>
                                    {intern.assessmentGrade}
                                  </span>
                                  <span className="text-[10px] text-[#646D76]">级</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={cn(
                                  "text-xs font-medium",
                                  intern.conversionSuggestion === '是' ? "text-emerald-600" : "text-[#646D76]"
                                )}>
                                  {intern.conversionSuggestion === '是' ? '推荐转正' : '暂不推荐'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {intern.riskTags && intern.riskTags.length > 0 ? intern.riskTags.map((tag: string) => (
                                    <span key={tag} className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold border border-red-100">
                                      {tag}
                                    </span>
                                  )) : (
                                    <span className="text-[10px] text-gray-400">无风险</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-3">
                                  <button 
                                    onClick={() => setSelectedInternDetail(intern)}
                                    className="text-xs text-blue-600 font-bold hover:underline"
                                  >
                                    决策详情
                                  </button>
                                  <button 
                                    onClick={() => setIsAbilityEvalModalOpen(true)}
                                    className="text-xs text-[#646D76] font-bold hover:underline"
                                  >
                                    能力评价
                                  </button>
                                  <button 
                                    onClick={() => setIsFeedbackModalOpen(true)}
                                    className="text-xs text-amber-600 font-bold hover:underline"
                                  >
                                    反馈
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === '培训认证' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">培训认证管理</h2>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">实习生</th>
                          <th className="px-6 py-4 font-semibold">岗位标准</th>
                          <th className="px-6 py-4 font-semibold">技能点达标 (达标/总数)</th>
                          <th className="px-6 py-4 font-semibold">证书状态</th>
                          <th className="px-6 py-4 font-semibold">综合判定</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {internsData.slice(0, 5).map(intern => (
                          <tr key={intern.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold">{intern.name}</p>
                              <span className="text-[10px] text-[#646D76] font-mono">{intern.id}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                                <Briefcase className="w-3 h-3" />
                                {intern.position}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <span className={cn(
                                    "text-xs font-bold",
                                    intern.skillPointResults?.filter((r: any) => r.status === '通过').length === intern.skillPointResults?.length ? "text-emerald-600" : "text-gray-900"
                                  )}>
                                    {intern.skillPointResults?.filter((r: any) => r.status === '通过').length} / {intern.skillPointResults?.length}
                                  </span>
                                  <span className="text-[10px] text-[#646D76]">技能点</span>
                                </div>
                                <div className="flex -space-x-1">
                                  {intern.skillPointResults?.slice(0, 4).map((res: any) => (
                                    <div 
                                      key={res.id} 
                                      title={`${res.name}: ${res.status}`}
                                      className={cn(
                                        "w-3 h-3 rounded-full border border-white",
                                        res.status === '通过' ? "bg-emerald-500" : 
                                        res.status === '未通过' ? "bg-red-500" : "bg-gray-300"
                                      )}
                                    />
                                  ))}
                                  {intern.skillPointResults?.length > 4 && (
                                    <div className="w-3 h-3 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[6px] text-gray-500">
                                      +{intern.skillPointResults.length - 4}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "text-[10px] font-bold px-1.5 py-0.5 rounded",
                                  intern.certificateStatus === '已获得' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                )}>
                                  {intern.certificateStatus || '未获得'}
                                </span>
                                <span className="text-[10px] text-[#646D76]">{intern.certificateName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-xs font-bold px-2 py-1 rounded-lg",
                                intern.usabilityStatus === '可上岗' ? "bg-emerald-50 text-emerald-600" : 
                                intern.usabilityStatus === '待提升' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                )}>
                                {intern.usabilityStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-3">
                                <button 
                                  onClick={() => {
                                    setSelectedInternForReport(intern);
                                    setIsSkillReportModalOpen(true);
                                  }}
                                  className="text-xs text-blue-600 font-bold hover:underline"
                                >
                                  评估报告
                                </button>
                                <button className="text-xs text-[#646D76] font-bold hover:underline">
                                  重测
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '技能点配置' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">技能点配置</h2>
                      <p className="text-[#646D76] mt-1">自定义本公司岗位的技能点考核标准与关联资源。</p>
                    </div>
                    <button 
                      onClick={() => setIsSkillConfigModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      新增技能点
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: '5G 移动通信', skills: ['NR协议', '无线网优', '路测分析'], courseCount: 12, examCount: 4 },
                      { name: '分布式存储', skills: ['Ceph架构', '存储协议', '性能调优'], courseCount: 8, examCount: 3 },
                      { name: '数通网络', skills: ['BGP协议', '路由交换', '网络安全'], courseCount: 5, examCount: 2 },
                    ].map((config, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <Target className="w-6 h-6" />
                          </div>
                          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                            <Settings className="w-4 h-4 text-[#646D76]" />
                          </button>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{config.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {config.skills.map(s => (
                            <span key={s} className="text-[10px] bg-gray-50 text-[#646D76] px-2 py-1 rounded-lg font-medium">{s}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-[10px] text-[#646D76] font-bold uppercase mb-1">关联课程</p>
                            <p className="text-sm font-bold text-blue-600">{config.courseCount} 门</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[#646D76] font-bold uppercase mb-1">认证题库</p>
                            <p className="text-sm font-bold text-amber-600">{config.examCount} 套</p>
                          </div>
                        </div>
                        <button className="w-full mt-6 py-2 bg-gray-50 text-[#1A1C1E] rounded-xl text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                          配置考核标准
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTerminal === '岗位拓展端' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {activeTab === '我的企业' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">我的企业管理</h2>
                    <button 
                      onClick={() => setIsExpEntModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      录入企业
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">企业名称</th>
                          <th className="px-6 py-4 font-semibold">实习需求</th>
                          <th className="px-6 py-4 font-semibold">正式需求</th>
                          <th className="px-6 py-4 font-semibold">期望技能</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {enterpriseRanking.map(ent => (
                          <tr key={`ent-${ent.name}`} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold">{ent.name}</td>
                            <td className="px-6 py-4 text-sm font-bold text-orange-600">{Math.floor(ent.demand * 0.6)}</td>
                            <td className="px-6 py-4 text-sm font-bold text-blue-600">{Math.floor(ent.demand * 0.4)}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {['5G', 'Python'].map(s => (
                                  <span key={s} className="text-[10px] bg-gray-100 text-[#646D76] px-1.5 py-0.5 rounded">{s}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-xs text-blue-600 font-bold hover:underline">维护信息</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '我的岗位' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">岗位采集与维护</h2>
                    <button 
                      onClick={() => setIsEntJobModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      采集新岗位
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">岗位名称</th>
                          <th className="px-6 py-4 font-semibold">所属企业</th>
                          <th className="px-6 py-4 font-semibold">技能要求</th>
                          <th className="px-6 py-4 font-semibold">关联课程</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {jobsData.slice(0, 5).map(job => (
                          <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold">{job.title}</td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{job.company}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {['Ceph', 'Linux'].map(s => (
                                  <span key={s} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{s}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-blue-600">5G 移动通信技术</td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-xs text-blue-600 font-bold hover:underline">编辑岗位</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '岗位跟进' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">岗位跟进看板</h2>
                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">岗位名称</th>
                          <th className="px-6 py-4 font-semibold">匹配状态</th>
                          <th className="px-6 py-4 font-semibold">入岗人数</th>
                          <th className="px-6 py-4 font-semibold">平均培训进度</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {jobsData.slice(0, 5).map(job => (
                          <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold">{job.title}</td>
                            <td className="px-6 py-4">
                              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">匹配中 (12)</span>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold">5</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-emerald-600 h-full" style={{width: '82%'}} />
                                </div>
                                <span className="text-xs font-bold">82%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-xs text-blue-600 font-bold hover:underline">查看详情</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '拓展人员管理' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">拓展人员绩效管理</h2>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        导出报表
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        添加拓展人员
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">总拓展人员</p>
                      <p className="text-3xl font-bold">{jobExpansionPersonnelData.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">本月新增企业</p>
                      <p className="text-3xl font-bold text-blue-600">24</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">本月采集岗位</p>
                      <p className="text-3xl font-bold text-orange-600">156</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">平均转化率</p>
                      <p className="text-3xl font-bold text-emerald-600">14.2%</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">拓展人员</th>
                          <th className="px-6 py-4 font-semibold text-center">负责企业数</th>
                          <th className="px-6 py-4 font-semibold text-center">采集岗位数</th>
                          <th className="px-6 py-4 font-semibold text-center">转化率</th>
                          <th className="px-6 py-4 font-semibold text-center">绩效评分</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {jobExpansionPersonnelData.map((person, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                                  {person.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-bold">{person.name}</p>
                                  <p className="text-[10px] text-[#646D76]">ID: EXP{2024001 + idx}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-center font-bold">{person.enterprises}</td>
                            <td className="px-6 py-4 text-sm text-center font-bold">{person.jobs}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-blue-600 h-full" style={{width: `${person.conversionRate * 5}%`}} />
                                </div>
                                <span className="text-xs font-bold text-blue-600">{person.conversionRate}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={cn(
                                "px-2 py-1 rounded-lg text-xs font-bold",
                                person.score >= 90 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                              )}>
                                {person.score}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#646D76]">
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600">
                                  <BarChart3 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : activeTerminal === '学生拓展端' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {activeTab === '我的学校' && (
                <div className="space-y-6">
                  {selectedSchoolId ? (
                    // Single School Details Page
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setSelectedSchoolId(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 rotate-180" />
                        </button>
                        <h2 className="text-2xl font-bold tracking-tight">
                          {schoolsData.find(s => s.id === selectedSchoolId)?.name} - 详情分析
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <p className="text-sm text-[#646D76] font-medium mb-2">在籍学生总数</p>
                          <p className="text-3xl font-bold">{schoolsData.find(s => s.id === selectedSchoolId)?.students.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <p className="text-sm text-[#646D76] font-medium mb-2">当前实习人数</p>
                          <p className="text-3xl font-bold text-orange-600">{schoolsData.find(s => s.id === selectedSchoolId)?.interns}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <p className="text-sm text-[#646D76] font-medium mb-2">就业率</p>
                          <p className="text-3xl font-bold text-emerald-600">{schoolsData.find(s => s.id === selectedSchoolId)?.employmentRate}%</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#E1E3E6]">
                          <h3 className="font-bold">学院维度分析</h3>
                        </div>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                              <th className="px-6 py-4 font-semibold">学院名称</th>
                              <th className="px-6 py-4 font-semibold">学生数</th>
                              <th className="px-6 py-4 font-semibold">实习人数</th>
                              <th className="px-6 py-4 font-semibold">就业率</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E1E3E6]">
                            {collegesAnalysisData[selectedSchoolId]?.map(college => (
                              <tr key={college.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold">{college.name}</td>
                                <td className="px-6 py-4 text-sm">{college.students}</td>
                                <td className="px-6 py-4 text-sm">{college.interns}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-24 overflow-hidden">
                                      <div className="bg-blue-600 h-full" style={{width: `${college.employmentRate}%`}} />
                                    </div>
                                    <span className="text-xs font-bold text-blue-600">{college.employmentRate}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#E1E3E6]">
                          <h3 className="font-bold">专业维度分析</h3>
                        </div>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                              <th className="px-6 py-4 font-semibold">专业</th>
                              <th className="px-6 py-4 font-semibold">学生数</th>
                              <th className="px-6 py-4 font-semibold">实习人数</th>
                              <th className="px-6 py-4 font-semibold">就业率</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E1E3E6]">
                            {majorsAnalysisData['COL001']?.map((major, idx) => (
                              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold">{major.major}</td>
                                <td className="px-6 py-4 text-sm">{major.students}</td>
                                <td className="px-6 py-4 text-sm">{major.interns}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-24 overflow-hidden">
                                      <div className="bg-emerald-600 h-full" style={{width: `${major.employmentRate}%`}} />
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600">{major.employmentRate}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    // Multi-School Overview & List
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h2 className="text-2xl font-bold tracking-tight">学校管理看板</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">已拓展学校数</p>
                          <div className="flex items-end gap-2">
                            <p className="text-3xl font-bold">4</p>
                            <span className="text-xs text-emerald-600 font-bold mb-1">+1</span>
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">总学生数</p>
                          <div className="flex items-end gap-2">
                            <p className="text-3xl font-bold">4,170</p>
                            <span className="text-xs text-blue-600 font-bold mb-1">活跃</span>
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">平均每校学生数</p>
                          <p className="text-3xl font-bold">1,042</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <p className="text-xs text-[#646D76] font-bold uppercase tracking-wider mb-2">活跃学校数</p>
                          <p className="text-3xl font-bold text-emerald-600">4</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#E1E3E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <h3 className="font-bold">学校列表视图</h3>
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#646D76]" />
                              <input 
                                type="text" 
                                placeholder="搜索学校名称..."
                                value={schoolSearchQuery}
                                onChange={(e) => setSchoolSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-[#E1E3E6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                              />
                            </div>
                            <select 
                              value={`${schoolSortField}-${schoolSortOrder}`}
                              onChange={(e) => {
                                const [field, order] = e.target.value.split('-') as [any, any];
                                setSchoolSortField(field);
                                setSchoolSortOrder(order);
                              }}
                              className="px-4 py-2 bg-gray-50 border border-[#E1E3E6] rounded-xl text-sm focus:outline-none"
                            >
                              <option value="students-desc">学生数 (从高到低)</option>
                              <option value="students-asc">学生数 (从低到高)</option>
                              <option value="employmentRate-desc">就业率 (从高到低)</option>
                              <option value="employmentRate-asc">就业率 (从低到高)</option>
                            </select>
                          </div>
                        </div>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                              <th className="px-6 py-4 font-semibold">学校名称</th>
                              <th className="px-6 py-4 font-semibold text-center">学院数量</th>
                              <th className="px-6 py-4 font-semibold text-center">专业数量</th>
                              <th className="px-6 py-4 font-semibold text-center">学生总数</th>
                              <th className="px-6 py-4 font-semibold text-center">在岗实习人数</th>
                              <th className="px-6 py-4 font-semibold text-center">就业率</th>
                              <th className="px-6 py-4 font-semibold text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E1E3E6]">
                            {schoolsData
                              .filter(s => s.name.toLowerCase().includes(schoolSearchQuery.toLowerCase()))
                              .sort((a, b) => {
                                const factor = schoolSortOrder === 'asc' ? 1 : -1;
                                return ((a as any)[schoolSortField] - (b as any)[schoolSortField]) * factor;
                              })
                              .map(school => (
                                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-900">{school.name}</p>
                                    <span className="text-[10px] text-[#646D76] font-mono">{school.id}</span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center font-medium">{school.colleges}</td>
                                  <td className="px-6 py-4 text-sm text-center font-medium">{school.majors}</td>
                                  <td className="px-6 py-4 text-sm text-center font-bold">{school.students.toLocaleString()}</td>
                                  <td className="px-6 py-4 text-sm text-center font-bold text-orange-600">{school.interns}</td>
                                  <td className="px-6 py-4 text-center">
                                    <span className={cn(
                                      "text-xs font-bold px-2 py-0.5 rounded-full",
                                      school.employmentRate >= 85 ? "bg-emerald-50 text-emerald-600" : 
                                      school.employmentRate >= 80 ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                                    )}>
                                      {school.employmentRate}%
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <button 
                                      onClick={() => setSelectedSchoolId(school.id)}
                                      className="text-xs text-blue-600 font-bold hover:underline"
                                    >
                                      查看详情
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
              )}

              {activeTab === '拓展人员' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold tracking-tight">拓展人员绩效维度</h2>
                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">拓展人员</th>
                          <th className="px-6 py-4 font-semibold text-center">负责学校数</th>
                          <th className="px-6 py-4 font-semibold text-center">学生总量</th>
                          <th className="px-6 py-4 font-semibold text-center">转化率</th>
                          <th className="px-6 py-4 font-semibold text-right">绩效评分</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {expansionPersonnelData.map((person, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
                                  {person.name.charAt(0)}
                                </div>
                                <span className="text-sm font-semibold">{person.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-center font-medium">{person.schools}</td>
                            <td className="px-6 py-4 text-sm text-center font-bold">{person.totalStudents.toLocaleString()}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-blue-600 h-full" style={{width: `${person.conversionRate * 5}%`}} />
                                </div>
                                <span className="text-xs font-bold text-blue-600">{person.conversionRate}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-bold text-emerald-600">92.5</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '我的学生' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">我的学生管理</h2>
                    <button 
                      onClick={() => setIsStuModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      录入学生
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">姓名 / 学号</th>
                          <th className="px-6 py-4 font-semibold">能力标签</th>
                          <th className="px-6 py-4 font-semibold">优势 / 薄弱项</th>
                          <th className="px-6 py-4 font-semibold">实习状态</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {students.slice(0, 5).map(stu => (
                          <tr key={stu.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold">{stu.name}</p>
                              <span className="text-[10px] text-[#646D76] font-mono">{stu.id}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {['5G', 'NR'].map(tag => (
                                  <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{tag}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <p className="text-[10px] text-emerald-600 font-bold">优：算法基础</p>
                                <p className="text-[10px] text-red-500 font-bold">弱：项目经验</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                stu.status === '已入岗' ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-[#646D76]"
                              )}>
                                {stu.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-3">
                              <button 
                                onClick={() => {
                                  setAssignStudentId(stu.id);
                                  setIsAssignTeacherModalOpen(true);
                                }}
                                className="text-xs text-blue-600 font-bold hover:underline"
                              >
                                分配老师
                              </button>
                              <button className="text-xs text-blue-600 font-bold hover:underline">维护信息</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '岗位推荐' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">岗位推荐中心</h2>
                      <p className="text-[#646D76] mt-1">为学生精准匹配合适的实习与就业岗位。</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.slice(0, 4).map(job => (
                      <div key={job.id} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            <p className="text-sm text-[#646D76]">{job.company}</p>
                          </div>
                          <RoleTag type={job.roleType} />
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {job.skillPoints?.map(sp => (
                              <span key={sp.id} className="text-[10px] bg-gray-100 text-[#646D76] px-2 py-1 rounded-lg">{sp.name}</span>
                            ))}
                          </div>
                          <div className="pt-4 border-t border-gray-50 flex gap-3">
                            <button 
                              onClick={() => {
                                setSelectedJobToRecommend(job);
                                setIsRecommendJobModalOpen(true);
                              }}
                              className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold"
                            >
                              推荐给学生
                            </button>
                            <button className="flex-1 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-bold">查看详情</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === '能力测评' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">能力测评中心</h2>
                    <button 
                      onClick={() => setIsAssessmentModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Target className="w-4 h-4" />
                      发起初始测评
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">学生</th>
                          <th className="px-6 py-4 font-semibold">测评类型</th>
                          <th className="px-6 py-4 font-semibold">综合评分</th>
                          <th className="px-6 py-4 font-semibold">测评日期</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {assessmentsData.map(report => (
                          <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold">{report.studentName}</td>
                            <td className="px-6 py-4 text-sm">初始能力测评</td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-blue-600">{report.score}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{report.date}</td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-xs text-blue-600 font-bold hover:underline">查看报告</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : activeTerminal === '学生端' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {activeTab === '首页' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">你好，陈小明</h2>
                      <p className="text-[#646D76] mt-1">今天有 3 项待办任务，加油！</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Award className="w-5 h-5 text-blue-600" />
                          </div>
                          <p className="text-sm text-[#646D76] font-medium">我的评分</p>
                        </div>
                        <button 
                          onClick={() => handleAnalyzeScore(students.find(s => s.id === 'STU001'))}
                          disabled={isAnalyzingScore}
                          className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {isAnalyzingScore ? '分析中...' : 'AI 深度分析'}
                        </button>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-end gap-2">
                          <p className="text-3xl font-bold">{students.find(s => s.id === 'STU001')?.score}</p>
                          <span className="text-sm font-bold text-blue-600 mb-1">等级 {students.find(s => s.id === 'STU001')?.gradeLevel}</span>
                        </div>
                        <div className="text-[10px] text-[#646D76] text-right">
                          <p>教育: {students.find(s => s.id === 'STU001')?.scoreBreakdown.education}</p>
                          <p>项目: {students.find(s => s.id === 'STU001')?.scoreBreakdown.projects}</p>
                        </div>
                      </div>
                      {aiScoreAnalysis && (
                        <div className="mt-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                          <p className="text-[10px] font-bold text-blue-800 mb-1">AI 评分说明：</p>
                          <p className="text-[10px] text-blue-700 leading-relaxed">{aiScoreAnalysis.explanation}</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <UserCheck className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">推荐状态</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-xl font-bold">{matches.find(m => m.studentId === 'STU001')?.matchStatus || '暂无推荐'}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            students.find(s => s.id === 'STU001')?.status === '已锁定' ? "bg-red-500" : "bg-emerald-500"
                          )} />
                          <span className="text-xs text-[#646D76]">
                            {students.find(s => s.id === 'STU001')?.status === '已锁定' ? '账号已锁定' : '账号活跃'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <Target className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">可用性判定</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className={cn(
                          "text-xl font-bold",
                          internsData.find(i => i.studentId === 'STU001')?.usabilityStatus === '可录用' ? "text-emerald-600" : 
                          internsData.find(i => i.studentId === 'STU001')?.usabilityStatus === '可实习' ? "text-blue-600" : "text-amber-600"
                        )}>
                          {internsData.find(i => i.studentId === 'STU001')?.usabilityStatus || '待评估'}
                        </p>
                        <p className="text-[10px] text-[#646D76] mt-1">
                          {internsData.find(i => i.studentId === 'STU001')?.usabilityStatus === '可录用' ? '恭喜！您已达到正式录用标准' : 
                           internsData.find(i => i.studentId === 'STU001')?.usabilityStatus === '可实习' ? '您已具备实习上岗能力' : '请根据建议补强技能点'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(
                          "p-2 rounded-lg",
                          students.find(s => s.id === 'STU001')?.riskLevel === '高' ? "bg-red-50" : 
                          students.find(s => s.id === 'STU001')?.riskLevel === '中' ? "bg-orange-50" : "bg-emerald-50"
                        )}>
                          <ShieldAlert className={cn(
                            "w-5 h-5",
                            students.find(s => s.id === 'STU001')?.riskLevel === '高' ? "text-red-600" : 
                            students.find(s => s.id === 'STU001')?.riskLevel === '中' ? "text-orange-600" : "text-emerald-600"
                          )} />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">行为评分 & 风险</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold">{students.find(s => s.id === 'STU001')?.behaviorScore}</p>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block",
                            students.find(s => s.id === 'STU001')?.riskLevel === '高' ? "bg-red-100 text-red-600" : 
                            students.find(s => s.id === 'STU001')?.riskLevel === '中' ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
                          )}>
                            风险等级：{students.find(s => s.id === 'STU001')?.riskLevel}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#646D76]">违规记录: {students.find(s => s.id === 'STU001')?.penaltyHistory.length} 次</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg">
                          <History className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">已使用次数</p>
                      </div>
                      <p className="text-2xl font-bold">{students.find(s => s.id === 'STU001')?.recommendationsUsed} 次</p>
                      <p className="text-[10px] text-[#646D76] mt-1">包含爽约、拒绝等扣减</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <h3 className="font-bold mb-4">待办提醒</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="text-sm font-bold">今日日报尚未提交</p>
                                <p className="text-xs text-[#646D76]">截止时间：今日 20:00</p>
                              </div>
                            </div>
                            <button className="text-xs font-bold text-blue-600 hover:underline">去提交</button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                            <div className="flex items-center gap-3">
                              <Target className="w-5 h-5 text-orange-600" />
                              <div>
                                <p className="text-sm font-bold">面试邀请：华为 - 通信前台工程师</p>
                                <p className="text-xs text-[#646D76]">面试时间：明天 14:00</p>
                              </div>
                            </div>
                            <button className="text-xs font-bold text-orange-600 hover:underline">查看详情</button>
                          </div>
                        </div>
                      </div>

                      {/* Failure Records & Optimization */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <h3 className="font-bold mb-4 flex items-center gap-2 text-red-600">
                            <ShieldAlert className="w-5 h-5" />
                            失败记录与原因
                          </h3>
                          {matches.filter(m => m.studentId === 'STU001' && (m.matchStatus.startsWith('已失败') || m.matchStatus.startsWith('已放弃'))).length > 0 ? (
                            <div className="space-y-4">
                              {matches.filter(m => m.studentId === 'STU001' && (m.matchStatus.startsWith('已失败') || m.matchStatus.startsWith('已放弃'))).map((m, idx) => (
                                <div key={idx} className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                                  <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm font-bold text-red-900">{m.jobTitle}</p>
                                    <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => handleAnalyzeFailure(m)}
                                        disabled={isAnalyzingFailure[m.id]}
                                        className="text-[10px] font-bold text-red-600 hover:underline"
                                      >
                                        {isAnalyzingFailure[m.id] ? '诊断中...' : 'AI 智能诊断'}
                                      </button>
                                      <span className="text-[10px] text-red-600 font-bold">{m.matchStatus}</span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-red-700">原因：{m.failReason !== '-' ? m.failReason : '主动放弃'}</p>
                                  {aiFailureAnalysis[m.id] && (
                                    <div className="mt-3 pt-3 border-t border-red-200 animate-in fade-in slide-in-from-top-2">
                                      <p className="text-[10px] font-bold text-red-800 mb-1">AI 深度分析：</p>
                                      <div className="space-y-2">
                                        {aiFailureAnalysis[m.id]?.reasons?.map((r, i) => (
                                          <div key={i} className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5" />
                                            <div>
                                              <p className="text-[10px] font-bold text-red-900">{r.reason} (权重: {Math.round(r.weight * 100)}%)</p>
                                              <p className="text-[10px] text-red-700">{r.description}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {m.matchStatus === '已失败_不参加面试' && (
                                    <p className="text-[10px] text-red-500 mt-2 font-bold">⚠️ 行为记录：面试爽约，已扣减推荐次数</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                              <p className="text-sm text-[#646D76]">暂无失败记录</p>
                            </div>
                          )}
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold flex items-center gap-2 text-blue-600">
                              <Target className="w-5 h-5" />
                              系统优化建议
                            </h3>
                            <button 
                              onClick={() => handleRecommendPath(students.find(s => s.id === 'STU001'))}
                              disabled={isAnalyzingPath}
                              className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                            >
                              {isAnalyzingPath ? '生成中...' : 'AI 智能推荐'}
                            </button>
                          </div>
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                              <p className="text-xs font-bold text-blue-800 mb-2">改进方向：</p>
                              <ul className="text-xs text-blue-700 space-y-2 list-disc pl-4">
                                {aiLearningPath?.improvementSuggestions?.length ? aiLearningPath.improvementSuggestions.map((s, i) => (
                                  <li key={i}>{s}</li>
                                )) : (
                                  <>
                                    <li>加强分布式系统相关知识的学习，这是目前面试中的主要薄弱项。</li>
                                    <li>提高面试准时率，避免因爽约导致推荐次数被锁定。</li>
                                    <li>完善项目经历中关于“高并发”场景的描述。</li>
                                  </>
                                )}
                              </ul>
                            </div>
                            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                              <p className="text-xs font-bold text-emerald-800 mb-2">推荐课程：</p>
                              <div className="flex flex-col gap-2">
                                {(aiLearningPath ? aiLearningPath.recommendedCourses : (matches.find(m => m.studentId === 'STU001')?.recommendedCourses || [])).map((course: string) => (
                                  <div key={course} className="flex items-center justify-between">
                                    <span className="text-xs text-emerald-700">《{course}》</span>
                                    <button className="text-[10px] font-bold text-emerald-600 hover:underline">去学习</button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Penalty History for Student */}
                      <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-red-600" />
                          行为惩罚记录
                        </h3>
                        {students.find(s => s.id === 'STU001')?.penaltyHistory.length > 0 ? (
                          <div className="space-y-4">
                            {students.find(s => s.id === 'STU001')?.penaltyHistory.map((penalty: any, idx: number) => (
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
                          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-sm text-[#646D76]">暂无行为违规记录，请继续保持良好表现！</p>
                          </div>
                        )}
                      </div>

                      {/* Recommendation Logs for Student */}
                      <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <History className="w-5 h-5 text-amber-600" />
                          推荐次数扣减记录
                        </h3>
                        {students.find(s => s.id === 'STU001')?.recommendationLogs.length > 0 ? (
                          <div className="space-y-4">
                            {students.find(s => s.id === 'STU001')?.recommendationLogs.map((log: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-amber-50/30 rounded-xl border border-amber-100">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                                  <div>
                                    <p className="text-sm font-bold text-amber-900">{log.behavior}</p>
                                    <p className="text-xs text-[#646D76] mt-1">原因：{log.reason}</p>
                                  </div>
                                </div>
                                <span className="text-xs text-[#646D76] font-mono">{log.time}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-sm text-[#646D76]">暂无扣减记录，请继续保持良好表现！</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <h3 className="font-bold mb-4">我的能力雷达</h3>
                        <div className="h-64 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={studentAbilityRadarData}>
                              <PolarGrid stroke="#E1E3E6" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#646D76', fontSize: 10 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar
                                name="能力值"
                                dataKey="A"
                                stroke="#2563EB"
                                fill="#2563EB"
                                fillOpacity={0.6}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <p className="text-[10px] text-blue-600 font-bold">优势项</p>
                            <p className="text-xs font-bold">数据库基础、Linux</p>
                          </div>
                          <div className="p-2 bg-amber-50 rounded-lg">
                            <p className="text-[10px] text-amber-600 font-bold">待提升</p>
                            <p className="text-xs font-bold">方案设计、故障排查</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '我的岗位' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">推荐岗位</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobsData.slice(0, 4).map(job => (
                      <div key={job.id} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            <p className="text-sm text-[#646D76]">{job.company}</p>
                          </div>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">95% 匹配度</span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] text-[#646D76] font-bold uppercase mb-2">岗位要求</p>
                            <div className="flex flex-wrap gap-2">
                              {['5G NR', '无线网优', '路测分析'].map(s => (
                                <span key={s} className="text-xs bg-gray-100 text-[#646D76] px-2 py-1 rounded-lg">{s}</span>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <p className="text-xs font-bold text-blue-800 mb-1">建议学习课程</p>
                            <p className="text-xs text-blue-600">《5G 移动通信技术》可提升匹配度</p>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                          <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200">投递简历</button>
                          <button className="flex-1 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-bold">查看详情</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === '我的实习' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">我的实习工作</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-bold">工作报告提交</h3>
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg">写日报</button>
                            <button className="px-3 py-1.5 bg-white border border-[#E1E3E6] text-xs font-bold rounded-lg">写周报</button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold">2024-03-{12-i} 日报</p>
                                  <p className="text-xs text-[#646D76]">已提交 · 审核中</p>
                                </div>
                              </div>
                              <button className="text-xs text-blue-600 font-bold hover:underline">查看详情</button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 实习学习任务板块 */}
                      <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-bold">实习学习任务</h3>
                          <span className="text-xs text-[#646D76]">由企业导师发布，完成后更新技能点</span>
                        </div>
                        <div className="space-y-4">
                          {internsData.find(it => it.studentId === 'STU001')?.internshipTasks?.map(task => (
                            <div key={task.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${task.status === '已完成' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                  <p className="text-sm font-bold">{task.name}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.status === '已完成' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                  {task.status}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-[#646D76]">截止日期：{task.date}</p>
                                {task.status === '已完成' ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-emerald-600">导师评分：{task.score}</span>
                                    <button className="text-[10px] text-blue-600 font-bold hover:underline">查看评价</button>
                                  </div>
                                ) : (
                                  <button className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg">提交成果</button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <h3 className="font-bold mb-4">考勤统计</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#646D76]">本月出勤</span>
                            <span className="text-sm font-bold">20 天</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#646D76]">迟到/早退</span>
                            <span className="text-sm font-bold text-red-500">0 次</span>
                          </div>
                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs font-bold text-blue-600 mb-2 flex items-center gap-1">
                              <Target className="w-3.5 h-3.5" />
                              实习优化建议：
                            </p>
                            <div className="space-y-4">
                              <div>
                                <p className="text-[10px] font-bold text-amber-600 mb-1 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> 待补培训类技能点
                                </p>
                                <p className="text-xs text-[#646D76] leading-relaxed mb-2">
                                  您的 <span className="font-bold text-gray-900">「SQL 高级语法」</span> 测评未通过，建议回炉培训。
                                </p>
                                <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                                  <p className="text-[10px] text-amber-700 font-medium cursor-pointer hover:underline">《SQL 进阶实战课程》</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-blue-600 mb-1 flex items-center gap-1">
                                  <Zap className="w-3 h-3" /> 待补实习类技能点
                                </p>
                                <p className="text-xs text-[#646D76] leading-relaxed mb-2">
                                  需在实习中完成 <span className="font-bold text-gray-900">「线上故障应急」</span> 任务以达成达标。
                                </p>
                                <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                                  <p className="text-[10px] text-blue-700 font-medium cursor-pointer hover:underline">查看关联实习任务</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '我的培训' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">我的培训任务</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {coursesData.slice(0, 3).map(course => (
                      <div key={course.id} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden flex flex-col">
                        <div className="h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="font-bold mb-2">{course.title}</h3>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {course.skillTags.map(tag => (
                            <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                        <div className="mt-auto space-y-4">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#646D76]">学习进度</span>
                            <span className="font-bold">65%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-blue-600 h-full rounded-full" style={{width: '65%'}} />
                          </div>
                          <button className="w-full py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">继续学习</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === '我的证书' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">我的证书</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificationsData.filter(c => c.status === '已发放').map(cert => (
                      <div key={cert.id} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
                        <Award className="w-12 h-12 text-emerald-600 mb-4 relative z-10" />
                        <h3 className="font-bold text-lg mb-1 relative z-10">{cert.examName}</h3>
                        <p className="text-xs text-[#646D76] mb-4 relative z-10">获得日期：{cert.issueDate}</p>
                        <div className="flex gap-3 relative z-10">
                          <button className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                            <FileText className="w-3 h-3" /> 下载电子版
                          </button>
                          <button className="flex-1 py-2 bg-white border border-[#E1E3E6] rounded-xl text-xs font-bold">查看详情</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === '技能测评' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">岗位技能自测</h2>
                      <p className="text-[#646D76] mt-1">针对意向岗位进行能力评估，测评结果将实时同步。</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#646D76]">意向岗位：</span>
                      <select 
                        className="px-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                        onChange={(e) => {
                          const job = jobsData.find(j => j.id === e.target.value);
                          setSelectedJobForAssessment(job || null);
                        }}
                        value={selectedJobForAssessment?.id || ''}
                      >
                        <option value="">请选择岗位</option>
                        {jobsData.map(job => (
                          <option key={job.id} value={job.id}>{job.title} ({job.company})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {selectedJobForAssessment ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-[#E1E3E6] shadow-sm">
                          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            岗位技能点要求
                          </h3>
                          <div className="space-y-8">
                            {Array.from(new Set(selectedJobForAssessment.skillPoints.map(sp => sp.module))).map(module => (
                              <div key={module} className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                  {module}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {selectedJobForAssessment.skillPoints.filter(sp => sp.module === module).map(sp => (
                                    <div key={sp.name} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                                      <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm font-bold text-gray-800">{sp.name}</p>
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                                          {sp.sliceType}
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-500 mb-3">关联切片：{sp.sliceName}</p>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-2 h-2 rounded-full bg-gray-300" />
                                          <span className="text-[10px] text-gray-400 font-medium">未测评</span>
                                        </div>
                                        <button className="text-[10px] font-bold text-blue-600 hover:underline">开始练习</button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm">
                          <h3 className="font-bold mb-4">测评说明</h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                              <p className="text-xs text-blue-800 leading-relaxed">
                                1. 测评结果将作为企业筛选人才的重要参考。<br />
                                2. 每个技能点包含 5-10 道专业题目。<br />
                                3. 建议在安静环境下进行，单项测评限时 15 分钟。
                              </p>
                            </div>
                            <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                              <Zap className="w-5 h-5" />
                              一键开启全项测评
                            </button>
                          </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-[#E1E3E6] shadow-sm">
                          <h3 className="font-bold mb-4">我的测评历史</h3>
                          <div className="space-y-4">
                            {[
                              { date: '2024-03-10', job: '数据库工程师', score: 88, status: '已同步' },
                              { date: '2024-03-05', job: 'Java 开发工程师', score: 72, status: '已同步' }
                            ].map((history, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                <div>
                                  <p className="text-sm font-bold">{history.job}</p>
                                  <p className="text-[10px] text-gray-400">{history.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-blue-600">{history.score} 分</p>
                                  <p className="text-[10px] text-emerald-500 font-bold">{history.status}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                      <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <Briefcase className="w-12 h-12 text-gray-300" />
                      </div>
                      <p className="text-gray-500 font-medium">请先选择一个意向岗位开始技能测评</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : activeTerminal === '学校端' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {activeTab === '实习概览' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">实习就业概览</h2>
                      <p className="text-[#646D76] mt-1">实时掌握全校学生实习与就业动态</p>
                    </div>
                    <div className="flex gap-3">
                      <select 
                        value={schoolTimeFilter}
                        onChange={(e) => setSchoolTimeFilter(e.target.value)}
                        className="bg-white border border-[#E1E3E6] rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option>本学期</option>
                        <option>本学年</option>
                        <option>2023届</option>
                        <option>2024届</option>
                      </select>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">在岗人数</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold">1,240</p>
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" /> +5.2%
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">已就业人数</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold">856</p>
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" /> +8.4%
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">就业率</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold">69.0%</p>
                        <div className="w-24 bg-gray-100 rounded-full h-1.5 mb-2">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: '69%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">未达标人数</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold text-red-600">42</p>
                        <span className="text-xs font-bold text-red-600">需重点关注</span>
                      </div>
                    </div>
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h3 className="font-bold mb-6">就业率趋势</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={schoolEmploymentTrend}>
                            <defs>
                              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} unit="%" />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Area type="monotone" dataKey="rate" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h3 className="font-bold mb-6">各专业就业情况</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={majorEmploymentData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F3F5" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="major" type="category" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} width={80} />
                            <Tooltip 
                              cursor={{fill: 'transparent'}}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="rate" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm lg:col-span-2">
                      <h3 className="font-bold mb-6">实习企业行业分布</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={enterpriseDistributionData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '过程监控' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold tracking-tight">学生实习过程监控</h2>
                    <div className="flex flex-wrap gap-3">
                      <select 
                        value={schoolMajorFilter}
                        onChange={(e) => setSchoolMajorFilter(e.target.value)}
                        className="bg-white border border-[#E1E3E6] rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option>全部专业</option>
                        <option>计算机科学</option>
                        <option>软件工程</option>
                        <option>电子信息</option>
                      </select>
                      <select 
                        value={schoolClassFilter}
                        onChange={(e) => setSchoolClassFilter(e.target.value)}
                        className="bg-white border border-[#E1E3E6] rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option>全部班级</option>
                        <option>2020级1班</option>
                        <option>2020级2班</option>
                        <option>2021级1班</option>
                      </select>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#646D76]" />
                        <input 
                          type="text" 
                          placeholder="搜索学生姓名/学号..." 
                          className="pl-10 pr-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">学生信息</th>
                          <th className="px-6 py-4 font-semibold">推荐记录</th>
                          <th className="px-6 py-4 font-semibold">面试情况</th>
                          <th className="px-6 py-4 font-semibold">当前状态</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {students.slice(0, 10).map(stu => {
                          const studentMatches = matches.filter(m => m.studentId === stu.id);
                          const latestMatch = studentMatches[0];
                          return (
                            <tr key={stu.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <p className="text-sm font-semibold">{stu.name}</p>
                                <p className="text-[10px] text-[#646D76] font-mono">{stu.id} | {stu.major}</p>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{studentMatches.length} 次推荐</span>
                                  <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                      <div key={i} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-400">
                                        {i}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className={cn(
                                      "text-[10px] px-1.5 py-0.5 rounded",
                                      latestMatch?.interviewStatus === '已通过' ? "bg-emerald-50 text-emerald-600" :
                                      latestMatch?.interviewStatus === '已拒绝' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                    )}>
                                      {latestMatch?.interviewStatus || '未开始'}
                                    </span>
                                    <span className="text-[10px] text-[#646D76]">{latestMatch?.company || '-'}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={cn(
                                  "text-xs px-2 py-0.5 rounded-full",
                                  stu.status === '已入岗' ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-[#646D76]"
                                )}>
                                  {stu.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => {
                                    setSelectedStudent(stu);
                                    setIsReportModalOpen(true);
                                  }}
                                  className="text-xs text-blue-600 font-bold hover:underline"
                                >
                                  查看全过程报告
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '评分体系' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">实习评分与达标管理</h2>
                    <button className="px-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      导出评分结果
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">学生</th>
                          <th className="px-6 py-4 font-semibold">实习单位</th>
                          <th className="px-6 py-4 font-semibold">实习评分</th>
                          <th className="px-6 py-4 font-semibold">达标状态</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {students.slice(0, 10).map(stu => {
                          const score = stu.score || Math.floor(Math.random() * 40) + 60; // Mock score if not present
                          const isCompliant = score >= 60;
                          return (
                            <tr key={stu.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <p className="text-sm font-semibold">{stu.name}</p>
                                <p className="text-[10px] text-[#646D76] font-mono">{stu.id}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#646D76]">
                                {matches.find(m => m.studentId === stu.id)?.company || '未入岗'}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <span className={cn(
                                    "text-sm font-bold",
                                    score >= 90 ? "text-emerald-600" :
                                    score >= 75 ? "text-blue-600" :
                                    score >= 60 ? "text-amber-600" : "text-red-600"
                                  )}>
                                    {score}
                                  </span>
                                  <div className="w-24 bg-gray-100 rounded-full h-1.5">
                                    <div 
                                      className={cn(
                                        "h-full rounded-full",
                                        score >= 90 ? "bg-emerald-500" :
                                        score >= 75 ? "bg-blue-500" :
                                        score >= 60 ? "bg-amber-500" : "bg-red-500"
                                      )} 
                                      style={{ width: `${score}%` }} 
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={cn(
                                  "text-xs px-2 py-0.5 rounded-full font-medium",
                                  isCompliant ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                )}>
                                  {isCompliant ? '已达标' : '不合格'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-xs text-blue-600 font-bold hover:underline">评分详情</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '数据可视化' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">深度数据分析中心</h2>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                        生成分析报告
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-lg font-bold">就业率增长趋势</h3>
                          <p className="text-sm text-[#646D76]">2024年度学生实习就业转化情况</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-2xl">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={schoolEmploymentTrend}>
                            <defs>
                              <linearGradient id="colorRateSchool" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} unit="%" />
                            <Tooltip 
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            />
                            <Area type="monotone" dataKey="rate" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRateSchool)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-lg font-bold">各专业就业达成率</h3>
                          <p className="text-sm text-[#646D76]">重点专业就业指标完成情况</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-2xl">
                          <BarChart3 className="w-6 h-6 text-emerald-600" />
                        </div>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={majorEmploymentData} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F3F5" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="major" type="category" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <Tooltip 
                              cursor={{fill: '#F8F9FB'}}
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="rate" fill="#10B981" radius={[0, 8, 8, 0]} barSize={32} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-[#E1E3E6] shadow-sm lg:col-span-2">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                           <h3 className="text-lg font-bold">技能点达标分布</h3>
                           <p className="text-sm text-[#646D76]">各模块技能点达标率与平均分分布</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-2xl">
                          <Target className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={skillPointDistributionData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="module" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} unit="%" />
                            <Tooltip 
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="passRate" name="达标率" fill="#3B82F6" radius={[8, 8, 0, 0]} barSize={40} />
                            <Bar dataKey="avgScore" name="平均分" fill="#93C5FD" radius={[8, 8, 0, 0]} barSize={40} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-[#E1E3E6] shadow-sm lg:col-span-2">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-lg font-bold">培训/证书通过率</h3>
                          <p className="text-sm text-[#646D76]">核心课程与证书考试通过率统计</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-2xl">
                          <Award className="w-6 h-6 text-emerald-600" />
                        </div>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={trainingPassRateData}>
                            <defs>
                              <linearGradient id="colorPassRate" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} unit="%" />
                            <Tooltip 
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            />
                            <Area type="monotone" dataKey="passRate" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorPassRate)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-[#E1E3E6] shadow-sm lg:col-span-2">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-lg font-bold">合作企业行业分布图</h3>
                          <p className="text-sm text-[#646D76]">全校实习生分布的企业行业类型</p>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-2xl">
                          <Building2 className="w-6 h-6 text-indigo-600" />
                        </div>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={enterpriseDistributionData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="count" fill="#6366F1" radius={[8, 8, 0, 0]} barSize={64} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTerminal !== '管理端' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{activeTerminal} - {activeTab}</h2>
                  <p className="text-[#646D76] mt-1">欢迎使用{activeTerminal}，当前模块正在建设中。</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm animate-pulse">
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-50 rounded w-3/4"></div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="w-8 h-8 text-blue-200" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1C1E]">模块开发中</h3>
                <p className="text-[#646D76] mt-2">我们正在努力为您提供更好的{activeTerminal}体验。</p>
              </div>
            </div>
          ) : activeTab === 'Dashboard' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">运营数据概览</h2>
                  <p className="text-[#646D76] mt-1">实时监控平台核心指标与本周运营趋势。</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    导出数据
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                    运营配置
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <stat.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className={cn(
                        "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                        stat.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      )}>
                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1C1E] mb-4">{stat.label}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <p className="text-[10px] text-[#646D76] mb-1">实习</p>
                        <p className="text-lg font-bold text-orange-600">{stat.intern}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-[#646D76] mb-1">正式</p>
                        <p className="text-lg font-bold text-blue-600">{stat.regular}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-[#646D76] mb-1">合计</p>
                        <p className="text-lg font-bold text-[#1A1C1E]">{stat.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk Warning & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Risk Warning Module */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-lg">风险预警提醒</h3>
                    </div>
                    <button className="text-xs text-blue-600 font-medium hover:underline">处理全部</button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {riskWarnings.map((warning) => (
                      <button 
                        key={warning.label} 
                        onClick={() => setActiveTab(warning.tab)}
                        className={cn("p-4 rounded-xl text-left transition-all hover:scale-[1.02] border border-transparent hover:border-gray-200", warning.bg)}
                      >
                        <p className="text-[11px] font-semibold opacity-70 mb-1">{warning.label}</p>
                        <p className={cn("text-2xl font-bold", warning.color)}>{warning.count}</p>
                        <div className="mt-2 flex items-center text-[10px] font-medium opacity-60">
                          立即前往 <ChevronRight className="w-3 h-3 ml-0.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                  <h3 className="font-bold text-lg mb-4">运营快捷入口</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { label: '审核企业', count: 12, icon: Building2, color: 'text-blue-600', bg: 'hover:bg-blue-50' },
                      { label: '审核岗位', count: 45, icon: Briefcase, color: 'text-emerald-600', bg: 'hover:bg-emerald-50' },
                    ].map((action) => (
                      <button key={action.label} className={cn("w-full flex items-center justify-between p-3 rounded-xl transition-colors border border-gray-100", action.bg)}>
                        <div className="flex items-center gap-3">
                          <action.icon className={cn("w-4 h-4", action.color)} />
                          <span className="text-sm font-medium">{action.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#646D76] bg-gray-100 px-2 py-0.5 rounded-full">{action.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === '企业资源池' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">企业资源池</h2>
                  <p className="text-[#646D76] mt-1">管理合作企业信息、行业分布及合作状态。</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                  新增企业
                </button>
              </div>

              {/* Filters */}
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
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#646D76]">企业分级:</span>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {['全部', 'A', 'B', 'C', 'D'].map(g => (
                      <button
                        key={g}
                        onClick={() => setEntGradeFilter(g)}
                        className={cn(
                          "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                          entGradeFilter === g ? "bg-white text-blue-600 shadow-sm" : "text-[#646D76] hover:text-[#1A1C1E]"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
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
                        <th className="px-6 py-4 font-semibold">企业名称</th>
                        <th className="px-6 py-4 font-semibold">分级</th>
                        <th className="px-6 py-4 font-semibold">行业</th>
                        <th className="px-6 py-4 font-semibold">城市</th>
                        <th className="px-6 py-4 font-semibold text-center">实习需求</th>
                        <th className="px-6 py-4 font-semibold text-center">正式需求</th>
                        <th className="px-6 py-4 font-semibold">合作状态</th>
                        <th className="px-6 py-4 font-semibold">负责人</th>
                        <th className="px-6 py-4 font-semibold">更新时间</th>
                        <th className="px-6 py-4 font-semibold text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E3E6]">
                      {enterprises
                        .filter(ent => {
                          if (entInternDemandFilter === '是') return ent.hasInternDemand;
                          if (entInternDemandFilter === '否') return !ent.hasInternDemand;
                          return true;
                        })
                        .filter(ent => entGradeFilter === '全部' || ent.grade === entGradeFilter)
                        .map((ent) => (
                        <tr key={ent.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-semibold">{ent.name}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-xs font-bold px-2 py-0.5 rounded",
                              ent.grade === 'A' ? "bg-red-50 text-red-600" :
                              ent.grade === 'B' ? "bg-orange-50 text-orange-600" :
                              ent.grade === 'C' ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"
                            )}>
                              {ent.grade}级
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{ent.industry}</td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{ent.city}</td>
                          <td className="px-6 py-4 text-sm text-center font-bold text-orange-600">{ent.internJobCount}</td>
                          <td className="px-6 py-4 text-sm text-center font-bold text-blue-600">{ent.regularJobCount}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-xs font-medium px-2.5 py-1 rounded-full",
                              ent.status === '合作中' ? "bg-emerald-50 text-emerald-600" : 
                              ent.status === '考察中' ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
                            )}>
                              {ent.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{ent.owner}</td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{ent.updateTime}</td>
                          <td className="px-6 py-4 text-right space-x-3">
                            <button 
                              onClick={() => setSelectedEnterprise(ent)}
                              className="text-sm font-medium text-blue-600 hover:underline"
                            >
                              查看
                            </button>
                            <button 
                              onClick={() => {
                                setHistorySearchCompany(ent.name);
                                setActiveTab('数据中心');
                              }}
                              className="text-sm font-medium text-blue-600 hover:underline"
                            >
                              查看履历
                            </button>
                            <button className="text-sm font-medium text-blue-600 hover:underline">编辑</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Enterprise Detail Modal */}
              {selectedEnterprise && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold">{selectedEnterprise.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-[#646D76]">{selectedEnterprise.industry}</span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-sm text-[#646D76]">{selectedEnterprise.city}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedEnterprise(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Menu className="w-6 h-6 rotate-45" />
                      </button>
                    </div>
                    
                    <div className="p-8 space-y-8">
                      {/* Internship Requirements Module */}
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-600" />
                            企业实习要求
                          </h4>
                          <button className="text-sm text-blue-600 font-medium hover:underline">编辑要求</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                          <div>
                            <p className="text-xs text-[#646D76] font-medium mb-1">实习周期要求</p>
                            <p className="text-sm font-bold">{selectedEnterprise.internRequirements?.cycle || '-'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#646D76] font-medium mb-1">实习薪资范围</p>
                            <p className="text-sm font-bold">{selectedEnterprise.internRequirements?.salary || '-'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#646D76] font-medium mb-1">转正比例（企业要求）</p>
                            <p className="text-sm font-bold">{selectedEnterprise.internRequirements?.conversionRate || '-'}</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm flex items-center justify-between">
                            <div>
                              <p className="text-xs text-[#646D76] font-medium mb-1">企业评分</p>
                              <div className="flex items-center gap-2">
                                <p className="text-xl font-black text-orange-600">{selectedEnterprise.score}</p>
                                <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold">优质资源筛选</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setIsEntScoreModalOpen(true)}
                              className="text-xs text-blue-600 font-bold hover:underline"
                            >
                              修改评分
                            </button>
                          </div>
                        </div>
                      </section>

                      {/* Job Skill Requirements Module */}
                      <section>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          岗位技能要求与培训
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedEnterprise.skillMappings?.map((mapping: any) => (
                            <div key={mapping.skill} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-blue-600">{mapping.skill}</span>
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">核心技能</span>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] text-[#646D76] font-medium">对应培训课程:</p>
                                <div className="flex flex-wrap gap-1">
                                  {mapping.courses.map((course: string) => (
                                    <span key={course} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{course}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                          {(!selectedEnterprise.skillMappings || selectedEnterprise.skillMappings.length === 0) && (
                            <div className="col-span-2 py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                              <p className="text-sm text-[#646D76]">暂无岗位技能映射数据</p>
                            </div>
                          )}
                        </div>
                      </section>

                      {/* Associated Job List */}
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                            岗位关联列表
                          </h4>
                          <button 
                            onClick={() => {
                              setHistorySearchCompany(selectedEnterprise.name);
                              setActiveTab('数据中心');
                              setSelectedEnterprise(null);
                            }}
                            className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                          >
                            <History className="w-4 h-4" />
                            查看全流程记录
                          </button>
                        </div>
                        <div className="border border-[#E1E3E6] rounded-2xl overflow-hidden">
                          <table className="w-full text-left">
                            <thead className="bg-gray-50">
                              <tr className="text-[10px] uppercase font-bold text-[#646D76]">
                                <th className="px-4 py-3">岗位名称</th>
                                <th className="px-4 py-3">类型</th>
                                <th className="px-4 py-3">状态</th>
                                <th className="px-4 py-3 text-right">操作</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E1E3E6]">
                              {jobsData
                                .filter(job => job.company.includes(selectedEnterprise.name.substring(0, 2)))
                                .map(job => (
                                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-sm font-medium">{job.title}</td>
                                    <td className="px-4 py-3">
                                      <RoleTag type={job.roleType} />
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="text-xs text-[#646D76]">{job.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                      <button 
                                        onClick={() => {
                                          setSelectedJob(job);
                                          setActiveTab('岗位资源池');
                                          setSelectedEnterprise(null);
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
          ) : activeTab === '岗位资源池' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">岗位资源池</h2>
                  <p className="text-[#646D76] mt-1">实时掌握各企业发布的招聘岗位与需求人数。</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                  新增岗位
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#646D76]">岗位类型:</span>
                  <select className="bg-gray-100 border-none rounded-lg text-sm px-3 py-1.5 outline-none">
                    <option>全部</option>
                    <option>实习</option>
                    <option>正式</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#646D76]">岗位分级:</span>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {['全部', 'A', 'B', 'C', 'D'].map(g => (
                      <button
                        key={g}
                        onClick={() => setJobGradeFilter(g)}
                        className={cn(
                          "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                          jobGradeFilter === g ? "bg-white text-blue-600 shadow-sm" : "text-[#646D76] hover:text-[#1A1C1E]"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: '岗位总数', value: '3,592', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: '岗位类型', value: '技术/产品/运营', icon: Search, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: '匹配状态', value: '72% 已匹配', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: '今日更新', value: '+128 岗位', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
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
                        <th className="px-6 py-4 font-semibold">岗位 ID / 名称</th>
                        <th className="px-6 py-4 font-semibold">分级</th>
                        <th className="px-6 py-4 font-semibold">企业</th>
                        <th className="px-6 py-4 font-semibold">城市</th>
                        <th className="px-6 py-4 font-semibold text-center">招聘人数</th>
                        <th className="px-6 py-4 font-semibold">发布日期</th>
                        <th className="px-6 py-4 font-semibold">负责人</th>
                        <th className="px-6 py-4 font-semibold">岗位状态</th>
                        <th className="px-6 py-4 font-semibold text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E3E6]">
                      {jobsData
                        .filter(job => jobGradeFilter === '全部' || job.grade === jobGradeFilter)
                        .map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-[#646D76] font-mono">{job.id}</span>
                              <div className="flex items-center">
                                <span className="text-sm font-semibold">{job.title}</span>
                                <RoleTag type={job.roleType} />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-xs font-bold px-2 py-0.5 rounded",
                              job.grade === 'A' ? "bg-red-50 text-red-600" :
                              job.grade === 'B' ? "bg-orange-50 text-orange-600" :
                              job.grade === 'C' ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"
                            )}>
                              {job.grade}级
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{job.company}</td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{job.city}</td>
                          <td className="px-6 py-4 text-sm text-center font-bold text-blue-600">{job.headCount}</td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{job.publishDate}</td>
                          <td className="px-6 py-4 text-sm text-[#646D76]">{job.owner}</td>
                          <td className="px-6 py-4">
                            <select 
                              defaultValue={job.status}
                              className={cn(
                                "text-xs font-medium px-2 py-1 rounded-lg outline-none border-none bg-transparent",
                                job.status === '匹配中' ? "text-blue-600" : 
                                job.status === '已满' ? "text-emerald-600" :
                                job.status === '空置' ? "text-amber-600" : "text-gray-500"
                              )}
                            >
                              <option>匹配中</option>
                              <option>已满</option>
                              <option>空置</option>
                              <option>暂停</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right space-x-3">
                            <button 
                              onClick={() => setSelectedJob(job)}
                              className="text-sm font-medium text-blue-600 hover:underline"
                            >
                              查看
                            </button>
                            <button className="text-sm font-medium text-blue-600 hover:underline">编辑</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Job Detail Modal */}
              {selectedJob && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                          <RoleTag type={selectedJob.roleType} />
                          {selectedJob.isKey && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">重点岗位</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-blue-600 font-bold">{selectedJob.company}</span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-sm text-[#646D76]">{selectedJob.city}</span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-sm text-[#646D76]">ID: {selectedJob.id}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedJob(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Menu className="w-6 h-6 rotate-45" />
                      </button>
                    </div>
                    
                    <div className="p-8 space-y-8">
                      {/* Job Requirements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-4">
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            岗位要求
                          </h4>
                          <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div>
                              <p className="text-xs text-[#646D76] font-medium mb-1">专业要求</p>
                              <p className="text-sm font-bold">{selectedJob.majorReq}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#646D76] font-medium mb-1">技能要求</p>
                              <p className="text-sm font-bold">{selectedJob.skillReq}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#646D76] font-medium mb-1">薪资待遇</p>
                              <p className="text-sm font-bold text-emerald-600">{selectedJob.salary}</p>
                            </div>
                          </div>
                        </section>

                        <section className="space-y-4">
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-600" />
                            实习详情
                          </h4>
                          <div className="space-y-4 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-[#646D76] font-medium mb-1">岗位评分</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-xl font-black text-orange-600">{selectedJob.score}</p>
                                  <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold">用于匹配排序</span>
                                </div>
                              </div>
                              <button 
                                onClick={() => setIsJobScoreModalOpen(true)}
                                className="text-xs text-blue-600 font-bold hover:underline"
                              >
                                修改评分
                              </button>
                            </div>
                            <div>
                              <p className="text-xs text-[#646D76] font-medium mb-1">实习周期</p>
                              <p className="text-sm font-bold">{selectedJob.internCycle}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#646D76] font-medium mb-1">是否可转正</p>
                              <p className="text-sm font-bold">{selectedJob.canConvert}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#646D76] font-medium mb-1">岗位来源</p>
                              <p className="text-sm font-bold">{selectedJob.source}</p>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Skill Requirement - Training Course Mapping Table */}
                      {selectedJob.skillPoints && selectedJob.skillPoints.length > 0 && (
                        <section className="space-y-4">
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <Target className="w-5 h-5 text-emerald-600" />
                            岗位技能点要求
                          </h4>
                          <div className="border border-[#E1E3E6] rounded-2xl overflow-hidden">
                            <table className="w-full text-left">
                              <thead className="bg-gray-50">
                                <tr className="text-[10px] uppercase font-bold text-[#646D76]">
                                  <th className="px-4 py-3">技能点名称</th>
                                  <th className="px-4 py-3">培养环节</th>
                                  <th className="px-4 py-3">对应课件/切片</th>
                                  <th className="px-4 py-3">对应题库</th>
                                  <th className="px-4 py-3">对应考试</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#E1E3E6]">
                                {selectedJob.skillPoints.map((sp: any) => (
                                  <tr key={sp.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                      <span className="text-sm font-medium">{sp.name}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                        sp.category === 'training' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                                      )}>
                                        {sp.category === 'training' ? '培训可培养' : '实习可培养'}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] bg-gray-100 text-[#646D76] px-1.5 py-0.5 rounded">{sp.sliceType}</span>
                                        <span className="text-xs text-[#646D76] truncate max-w-[150px]">{sp.sliceName}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-[#646D76]">{sp.questionBank}</td>
                                    <td className="px-4 py-3 text-xs text-[#646D76] font-medium">{sp.exam}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </section>
                      )}

                      {/* Matched Students List */}
                      <section>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-600" />
                          匹配学生列表
                        </h4>
                        <div className="border border-[#E1E3E6] rounded-2xl overflow-hidden">
                          <table className="w-full text-left">
                            <thead className="bg-gray-50">
                              <tr className="text-[10px] uppercase font-bold text-[#646D76]">
                                <th className="px-4 py-3">学生姓名</th>
                                <th className="px-4 py-3">学校</th>
                                <th className="px-4 py-3">当前状态</th>
                                <th className="px-4 py-3 text-right">操作</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E1E3E6]">
                              {matchesData
                                .filter(match => match.jobId === selectedJob.id)
                                .map(match => (
                                  <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-sm font-medium">{match.studentName}</td>
                                    <td className="px-4 py-3 text-sm text-[#646D76]">
                                      {students.find(s => s.id === match.studentId)?.school || '某大学'}
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                        match.matchStatus === '已录用' ? "bg-emerald-50 text-emerald-600" : 
                                        match.matchStatus === '未通过' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                      )}>
                                        {match.matchStatus}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                      <button 
                                        onClick={() => {
                                          const stu = students.find(s => s.id === match.studentId);
                                          if (stu) setSelectedStudent(stu);
                                          setActiveTab('学生资源池');
                                          setSelectedJob(null);
                                        }}
                                        className="text-xs text-blue-600 font-bold hover:underline"
                                      >
                                        简历
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
          ) : activeTab === '学生资源池' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">学生资源池</h2>
                  <p className="text-[#646D76] mt-1">管理人才储备，包含学历背景、专业及求职意向。</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                  新增学生
                </button>
              </div>

              {/* Filters */}
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
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#646D76]">学生分级:</span>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {['全部', 'A', 'B', 'C', 'D'].map(g => (
                      <button
                        key={g}
                        onClick={() => setStuGradeFilter(g)}
                        className={cn(
                          "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                          stuGradeFilter === g ? "bg-white text-blue-600 shadow-sm" : "text-[#646D76] hover:text-[#1A1C1E]"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
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
                        <th className="px-6 py-4 font-semibold">分级</th>
                        <th className="px-6 py-4 font-semibold">学校 / 专业</th>
                        <th className="px-6 py-4 font-semibold">行为评分 / 风险</th>
                        <th className="px-6 py-4 font-semibold">学生状态</th>
                        <th className="px-6 py-4 font-semibold text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E3E6]">
                      {students
                        .filter(stu => stuGradeFilter === '全部' || stu.gradeLevel === stuGradeFilter)
                        .map((stu) => (
                        <tr key={stu.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-[#646D76] font-mono">{stu.id}</span>
                              <span className="text-sm font-semibold">{stu.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-xs font-bold px-2 py-0.5 rounded",
                              stu.gradeLevel === 'A' ? "bg-red-50 text-red-600" :
                              stu.gradeLevel === 'B' ? "bg-orange-50 text-orange-600" :
                              stu.gradeLevel === 'C' ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"
                            )}>
                              {stu.gradeLevel}级
                            </span>
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

                        {/* Score Comparison (Before vs After) */}
                        {selectedStudent.improvementHistory && selectedStudent.improvementHistory.length > 0 && (
                          <div className="mt-8 pt-8 border-t border-emerald-100">
                            <p className="text-xs font-bold text-[#646D76] uppercase mb-6 text-center">能力提升对比 (Before vs After)</p>
                            <div className="flex items-center justify-around">
                              <div className="text-center">
                                <div className="w-20 h-20 rounded-full border-4 border-gray-100 flex items-center justify-center mb-2">
                                  <span className="text-2xl font-black text-gray-400">
                                    {selectedStudent.score - selectedStudent.improvementHistory.reduce((acc: number, curr: any) => acc + curr.scoreIncrease, 0)}
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-gray-400">初始评分</p>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <div className="h-0.5 w-24 bg-emerald-100 relative">
                                  <ArrowUpRight className="w-4 h-4 text-emerald-500 absolute -right-2 -top-2" />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600">提升了 {selectedStudent.improvementHistory.reduce((acc: number, curr: any) => acc + curr.scoreIncrease, 0)} 分</span>
                              </div>
                              <div className="text-center">
                                <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center mb-2 shadow-lg shadow-emerald-100">
                                  <span className="text-2xl font-black text-emerald-600">{selectedStudent.score}</span>
                                </div>
                                <p className="text-xs font-bold text-emerald-600">当前评分</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </section>

                      {/* Matching Records Module */}
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <History className="w-5 h-5 text-purple-600" />
                            匹配记录
                          </h4>
                          <button 
                            onClick={() => {
                              setHistorySearchStudent(selectedStudent.name);
                              setActiveTab('数据中心');
                              setSelectedStudent(null);
                            }}
                            className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                          >
                            <History className="w-4 h-4" />
                            查看全流程记录
                          </button>
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

                      {/* Recommendation Limit Module */}
                      <section className="bg-amber-50/30 p-6 rounded-3xl border border-amber-100">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-amber-600" />
                            推荐次数限制
                          </h4>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-[#646D76]">剩余次数</p>
                              <p className="text-2xl font-black text-amber-600">
                                {selectedStudent.recommendationLimit - selectedStudent.recommendationsUsed}
                              </p>
                            </div>
                            <button 
                              onClick={() => {
                                const newLimit = prompt('请输入新的推荐次数上限：', String(selectedStudent.recommendationLimit));
                                if (newLimit !== null) {
                                  const limit = parseInt(newLimit);
                                  if (!isNaN(limit)) {
                                    setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, recommendationLimit: limit } : s));
                                    setSelectedStudent(prev => ({ ...prev, recommendationLimit: limit }));
                                  }
                                }
                              }}
                              className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-200 hover:bg-amber-700 transition-colors"
                            >
                              手动调整上限
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p className="text-xs font-bold text-[#646D76] uppercase">扣减日志</p>
                          {selectedStudent.recommendationLogs.length > 0 ? (
                            <div className="space-y-3">
                              {selectedStudent.recommendationLogs.map((log: any, idx: number) => (
                                <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-50 shadow-sm flex justify-between items-center">
                                  <div>
                                    <p className="text-sm font-bold text-amber-900">{log.behavior}</p>
                                    <p className="text-xs text-[#646D76] mt-1">原因：{log.reason}</p>
                                  </div>
                                  <p className="text-xs text-[#646D76] font-mono">{log.time}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 bg-white/50 rounded-2xl border border-dashed border-amber-200">
                              <p className="text-xs text-[#646D76]">暂无扣减记录</p>
                            </div>
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === '人岗匹配' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">人岗匹配与锁定调度</h2>
                  <p className="text-[#646D76] mt-1">核心调度模块：管理学生与岗位的匹配、锁定及状态流转。</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      // Intelligent Match logic: Using the new strategy engine
                      const availableStudents = students.filter(s => !isStudentBound(s.id));
                      const availableJobs = jobs.filter(j => j.status !== '已满');
                      
                      if (availableStudents.length > 0 && availableJobs.length > 0) {
                        let matchCount = 0;
                        const newMatches: any[] = [];
                        const matchedStudentIds = new Set();

                        // Sort jobs by quality to prioritize top jobs
                        const sortedJobs = [...availableJobs].sort((a, b) => {
                          const entA = enterprises.find(e => e.name === a.company)?.score || 0;
                          const entB = enterprises.find(e => e.name === b.company)?.score || 0;
                          return (b.score + entB) - (a.score + entA);
                        });

                        sortedJobs.forEach(job => {
                          // Find best student for this job among NOT YET matched in this batch
                          const candidates = availableStudents
                            .filter(s => !matchedStudentIds.has(s.id))
                            .map(s => ({
                              ...s,
                              priorityScore: calculatePriorityScore(s, job),
                              filterReason: getFilterReason(s, job)
                            }))
                            .filter(s => s.filterReason === '-')
                            .sort((a, b) => b.priorityScore - a.priorityScore);

                          if (candidates.length > 0) {
                            const bestStudent = candidates[0];
                            matchedStudentIds.add(bestStudent.id);
                            
                            newMatches.push({
                              id: `MAT${String(matches.length + newMatches.length + 1).padStart(3, '0')}`,
                              studentId: bestStudent.id,
                              studentName: bestStudent.name,
                              jobId: job.id,
                              jobTitle: job.title,
                              company: job.company,
                              matchDate: new Date().toISOString().split('T')[0],
                              matchStatus: '待匹配',
                              interviewStatus: '未开始',
                              hireStatus: '待定',
                              owner: '管理员',
                              roleType: job.roleType,
                              lastUpdateTime: new Date().toISOString().split('T')[0],
                              priorityScore: bestStudent.priorityScore,
                              matchSource: 'AI',
                              filterReason: '-'
                            });
                            matchCount++;
                          }
                        });

                        if (matchCount > 0) {
                          setMatches(prev => [...newMatches, ...prev]);
                          alert(`智能匹配完成：成功生成 ${matchCount} 条匹配建议。`);
                        } else {
                          alert('智能匹配未发现符合策略的匹配项。');
                        }
                      } else {
                        alert('暂无符合条件的待匹配学生或可用岗位。');
                      }
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    智能一键匹配
                  </button>
                  <button 
                    onClick={() => setIsManualMatchModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    手动推荐
                  </button>
                </div>
              </div>

              {/* Manual Match Modal */}
              {isManualMatchModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-xl font-bold">手动推荐匹配</h3>
                      <button onClick={() => setIsManualMatchModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#646D76]">选择学生 (未绑定岗位)</label>
                        <select 
                          value={manualMatchStudentId}
                          onChange={(e) => setManualMatchStudentId(e.target.value)}
                          className="w-full bg-gray-50 border border-[#E1E3E6] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">请选择学生</option>
                          {students.filter(s => !isStudentBound(s.id)).sort((a, b) => b.score - a.score).map(s => {
                            const job = jobs.find(j => j.id === manualMatchJobId);
                            const filterReason = job ? getFilterReason(s, job) : '-';
                            return (
                              <option key={s.id} value={s.id} className={filterReason !== '-' ? 'text-red-500' : ''}>
                                {s.name} ({s.school}) - 评分: {s.score} {filterReason !== '-' ? `(受限: ${filterReason})` : ''}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#646D76]">选择岗位</label>
                        <select 
                          value={manualMatchJobId}
                          onChange={(e) => setManualMatchJobId(e.target.value)}
                          className="w-full bg-gray-50 border border-[#E1E3E6] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">请选择岗位</option>
                          {jobs.filter(j => j.status !== '已满').sort((a, b) => b.score - a.score).map(j => (
                            <option key={j.id} value={j.id}>{j.title} ({j.company}) - 评分: {j.score} - 门槛: {j.minStudentScore || 0}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 py-2">
                        <input 
                          type="checkbox" 
                          id="forceMatch" 
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={(e) => (window as any).isForcedMatch = e.target.checked}
                        />
                        <label htmlFor="forceMatch" className="text-sm font-medium text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          强制推荐 (绕过策略引擎限制)
                        </label>
                      </div>
                      <div className="pt-4">
                        <button 
                          onClick={() => createMatch(manualMatchStudentId, manualMatchJobId, '人工', (window as any).isForcedMatch)}
                          disabled={!manualMatchStudentId || !manualMatchJobId}
                          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          确认匹配并推荐
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Candidate Pool Mechanism */}
              <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    岗位候选池 (Top 5 策略推荐)
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#646D76]">查看岗位:</span>
                    <select 
                      value={selectedPoolJobId}
                      onChange={(e) => setSelectedPoolJobId(e.target.value)}
                      className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                    >
                      <option value="">请选择岗位</option>
                      {jobs.filter(j => j.status !== '已满').map(j => (
                        <option key={j.id} value={j.id}>{j.title} ({j.company})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {generateCandidatePool(selectedPoolJobId).map(s => (
                    <div key={s.id} className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 flex flex-col items-center text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{s.name}</p>
                        <p className="text-[10px] text-[#646D76]">{s.school}</p>
                      </div>
                      <div className="px-2 py-0.5 bg-blue-600 text-white text-[10px] rounded-full font-bold">
                        优先级: {s.priorityScore.toFixed(1)}
                      </div>
                      <button 
                        onClick={() => createMatch(s.id, selectedPoolJobId, 'AI')}
                        className="w-full py-1.5 bg-white border border-blue-600 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                      >
                        推荐
                      </button>
                    </div>
                  ))}
                  {!selectedPoolJobId && (
                    <div className="col-span-5 py-8 text-center text-[#646D76] text-sm italic">
                      请选择一个岗位以查看基于策略引擎生成的候选人池
                    </div>
                  )}
                  {selectedPoolJobId && generateCandidatePool(selectedPoolJobId).length === 0 && (
                    <div className="col-span-5 py-8 text-center text-red-500 text-sm italic">
                      该岗位暂无符合策略引擎要求的候选人 (可能受企业门槛或学生评分限制)
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: '待匹配', count: matches.filter(m => m.matchStatus === '待匹配').length, color: 'text-gray-600', bg: 'bg-gray-50' },
                  { label: '已推荐/面试中 (锁定)', count: matches.filter(m => m.matchStatus === '已推荐' || m.matchStatus === '面试中').length, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: '已入职', count: matches.filter(m => m.matchStatus === '已入职').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: '匹配失败/放弃', count: matches.filter(m => m.matchStatus === '已失败' || m.matchStatus === '已放弃').length, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                  <div key={i} className={cn("p-4 rounded-2xl border border-[#E1E3E6] shadow-sm", stat.bg)}>
                    <p className="text-xs font-bold text-[#646D76] uppercase tracking-wider">{stat.label}</p>
                    <p className={cn("text-2xl font-black mt-1", stat.color)}>{stat.count}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#646D76]">匹配状态:</span>
                    <select 
                      value={matchStatusFilter}
                      onChange={(e) => setMatchStatusFilter(e.target.value)}
                      className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                    >
                      <option>全部</option>
                      <option>待匹配</option>
                      <option>已推荐</option>
                      <option>面试中</option>
                      <option>已入职</option>
                      <option>已失败</option>
                      <option>已放弃</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={matchSkillMasteryFilter}
                        onChange={(e) => setMatchSkillMasteryFilter(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-[#646D76] group-hover:text-blue-600 transition-colors">全技能点达标</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={matchCertPassedFilter}
                        onChange={(e) => setMatchCertPassedFilter(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-[#646D76] group-hover:text-blue-600 transition-colors">证书已通过</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs font-medium text-amber-600">学生锁定机制已生效</span>
                  </div>
                </div>
                <div className="text-xs text-[#646D76]">
                  匹配规则：按“学生评分 ↔ 岗位评分”排序，高分优先。
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">匹配 ID</th>
                        <th className="px-6 py-4 font-semibold">学生信息</th>
                        <th className="px-6 py-4 font-semibold">岗位信息</th>
                        <th className="px-6 py-4 font-semibold">技能达标</th>
                        <th className="px-6 py-4 font-semibold">策略评分/来源</th>
                        <th className="px-6 py-4 font-semibold">拦截原因</th>
                        <th className="px-6 py-4 font-semibold">当前进度</th>
                        <th className="px-6 py-4 font-semibold text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E3E6]">
                      {matches
                        .filter(m => {
                          const student = internsData.find(s => s.id === m.studentId);
                          const statusMatch = matchStatusFilter === '全部' || m.matchStatus.startsWith(matchStatusFilter);
                          const skillMatch = !matchSkillMasteryFilter || (student?.skillPointResults?.filter((sp: any) => sp.status === '已达标').length === student?.skillPointResults?.length);
                          const certMatch = !matchCertPassedFilter || (student?.certificateStatus === '已获得');
                          return statusMatch && skillMatch && certMatch;
                        })
                        .sort((a, b) => {
                          const studentA = students.find(s => s.id === a.studentId);
                          const studentB = students.find(s => s.id === b.studentId);
                          const jobA = jobs.find(j => j.id === a.jobId);
                          const jobB = jobs.find(j => j.id === b.jobId);
                          const scoreA = (studentA?.score || 0) + (jobA?.score || 0);
                          const scoreB = (studentB?.score || 0) + (jobB?.score || 0);
                          return scoreB - scoreA;
                        })
                        .map((match) => {
                          const student = students.find(s => s.id === match.studentId);
                        const job = jobs.find(j => j.id === match.jobId);
                        const enterprise = enterprises.find(e => e.name === job?.company);
                        
                        const isLocked = match.matchStatus === '已推荐' || match.matchStatus === '面试中';
                        
                        return (
                          <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-[10px] font-mono text-[#646D76]">{match.id}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                  {match.studentName.charAt(0)}
                                </div>
                                <div>
                                  <button 
                                    onClick={() => {
                                      if (student) setSelectedStudent(student);
                                      setActiveTab('学生资源池');
                                    }}
                                    className="text-sm font-semibold text-blue-600 hover:underline block"
                                  >
                                    {match.studentName}
                                  </button>
                                  <span className="text-[10px] text-[#646D76] font-mono">{match.studentId}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => {
                                  if (job) setSelectedJob(job);
                                  setActiveTab('岗位资源池');
                                }}
                                className="text-sm font-semibold text-blue-600 hover:underline block"
                              >
                                {match.jobTitle}
                              </button>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[#646D76]">{match.company}</span>
                                <RoleTag type={match.roleType} />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="group relative">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className={cn(
                                        "h-full rounded-full transition-all",
                                        (internsData.find(s => s.id === match.studentId)?.skillPointResults?.filter((sp: any) => sp.status === '已达标').length / internsData.find(s => s.id === match.studentId)?.skillPointResults?.length) >= 1 ? "bg-emerald-500" : "bg-blue-500"
                                      )}
                                      style={{ width: `${(internsData.find(s => s.id === match.studentId)?.skillPointResults?.filter((sp: any) => sp.status === '已达标').length / internsData.find(s => s.id === match.studentId)?.skillPointResults?.length) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-bold">
                                    {internsData.find(s => s.id === match.studentId)?.skillPointResults?.filter((sp: any) => sp.status === '已达标').length}/{internsData.find(s => s.id === match.studentId)?.skillPointResults?.length}
                                  </span>
                                </div>
                                {/* Hover Tooltip */}
                                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-in fade-in zoom-in duration-200">
                                  <p className="text-xs font-bold mb-2 border-b border-gray-50 pb-2">技能点达标详情</p>
                                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                    {internsData.find(s => s.id === match.studentId)?.skillPointResults?.map((sp: any, idx: number) => (
                                      <div key={idx} className="flex items-center justify-between">
                                        <span className="text-[10px] text-gray-600">{sp.name}</span>
                                        <span className={cn(
                                          "text-[10px] font-bold",
                                          sp.status === '已达标' ? "text-emerald-600" : "text-amber-600"
                                        )}>
                                          {sp.status === '已达标' ? '✓' : sp.score + '分'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-[10px] text-gray-400">证书状态</span>
                                    <span className={cn(
                                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                                      internsData.find(s => s.id === match.studentId)?.certificateStatus === '已获得' ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"
                                    )}>
                                      {internsData.find(s => s.id === match.studentId)?.certificateStatus || '未获得'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">{(match.priorityScore || 0).toFixed(1)}</span>
                                <span className={cn(
                                  "text-[10px] px-1.5 py-0.5 rounded-full w-fit mt-1",
                                  match.matchSource === 'AI' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                                )}>
                                  {match.matchSource || '人工'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="max-w-[150px]">
                                <p className={cn(
                                  "text-xs truncate",
                                  match.filterReason && match.filterReason !== '-' ? "text-red-500 font-medium" : "text-gray-400"
                                )}>
                                  {match.filterReason || '-'}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select 
                                value={match.matchStatus}
                                onChange={(e) => updateMatchStatus(match.id, e.target.value)}
                                className={cn(
                                  "text-xs font-bold px-3 py-1.5 rounded-xl border border-[#E1E3E6] outline-none cursor-pointer w-32",
                                  match.matchStatus === '已入职' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                                  (match.matchStatus.startsWith('已失败') || match.matchStatus.startsWith('已放弃')) ? "bg-red-50 text-red-600 border-red-100" : 
                                  (match.matchStatus === '已推荐' || match.matchStatus === '面试中') ? "bg-amber-50 text-amber-600 border-amber-100" : 
                                  "bg-gray-50 text-gray-600"
                                )}
                              >
                                <option value="待匹配">待匹配</option>
                                <option value="已推荐">已推荐 (锁定)</option>
                                <option value="面试中">面试中 (锁定)</option>
                                <option value="已入职">已入职</option>
                                <optgroup label="已失败 (释放)">
                                  <option value="已失败_企业拒绝">企业拒绝</option>
                                  <option value="已失败_岗位取消">岗位取消</option>
                                  <option value="已失败_不参加面试">不参加面试 (扣次)</option>
                                  <option value="已失败_拒绝入职">拒绝入职 (扣次)</option>
                                </optgroup>
                                <optgroup label="已放弃 (释放)">
                                  <option value="已放弃_主动放弃">主动放弃岗位 (扣次)</option>
                                </optgroup>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-right space-x-3">
                              <button 
                                onClick={() => {
                                  // Find the match in the matches list to get the latest status
                                  const m = matches.find(item => item.id === match.id);
                                  if (m) {
                                    setSelectedMatch(m);
                                    setActiveTab('数据中心');
                                    setHistorySearchStudent(m.studentName);
                                  }
                                }}
                                className="text-sm font-medium text-blue-600 hover:underline"
                              >
                                全流程
                              </button>
                              <button 
                                onClick={() => setSelectedMatch(match)}
                                className="text-sm font-medium text-blue-600 hover:underline"
                              >
                                详情
                              </button>
                              {!isLocked && (
                                <button 
                                  onClick={() => {
                                    if (confirm('确定要重新匹配该学生吗？')) {
                                      // Logic to reset or remove match
                                      setMatches(prev => prev.filter(m => m.id !== match.id));
                                    }
                                  }}
                                  className="text-sm font-medium text-red-600 hover:underline"
                                >
                                  重新匹配
                                </button>
                              )}
                              {isLocked && (
                                <button 
                                  onClick={() => {
                                    if (confirm('强制释放锁定将使学生可以被推荐至其他岗位，确定吗？')) {
                                      updateMatchStatus(match.id, '已放弃_主动放弃');
                                    }
                                  }}
                                  className="text-sm font-medium text-amber-600 hover:underline"
                                >
                                  释放锁定
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Match Detail Modal */}
              {selectedMatch && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold">匹配详情</h3>
                        <p className="text-sm text-[#646D76] mt-1">ID: {selectedMatch.id}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedMatch(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Menu className="w-6 h-6 rotate-45" />
                      </button>
                    </div>
                    
                    <div className="p-8 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs text-[#646D76] font-bold uppercase">匹配日期</p>
                          <p className="text-sm font-medium">{selectedMatch.matchDate}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-[#646D76] font-bold uppercase">负责人</p>
                          <p className="text-sm font-medium">{selectedMatch.owner}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-[#646D76] font-bold uppercase">当前状态</p>
                          <p className="text-sm font-medium">{selectedMatch.matchStatus}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-[#646D76] font-bold uppercase">备注信息</p>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <p className="text-sm text-gray-700 leading-relaxed">暂无备注信息</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button 
                        onClick={() => setSelectedMatch(null)}
                        className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        关闭
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        更新进度
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === '数据中心' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">全流程记录系统 (数据中心)</h2>
                  <p className="text-[#646D76] mt-1">追踪学生从推荐到入职的全生命周期，支持过程追溯与投诉应对。</p>
                </div>
                <button 
                  onClick={() => {
                    alert('全流程记录数据已导出为 Excel 报表');
                  }}
                  className="px-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  导出全量记录
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#646D76]" />
                  <input 
                    type="text" 
                    placeholder="搜索学生姓名..." 
                    value={historySearchStudent}
                    onChange={(e) => setHistorySearchStudent(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-[#E1E3E6] rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#646D76]" />
                  <input 
                    type="text" 
                    placeholder="搜索企业名称..." 
                    value={historySearchCompany}
                    onChange={(e) => setHistorySearchCompany(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-[#E1E3E6] rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#646D76] whitespace-nowrap">当前状态:</span>
                  <select 
                    value={historyStatusFilter}
                    onChange={(e) => setHistoryStatusFilter(e.target.value)}
                    className="bg-gray-50 border border-[#E1E3E6] rounded-xl text-sm px-3 py-2 w-full outline-none"
                  >
                    <option>全部</option>
                    <option>已推荐</option>
                    <option>面试中</option>
                    <option>已入职</option>
                    <option>已失败</option>
                    <option>已放弃</option>
                  </select>
                </div>
                <button 
                  onClick={() => {
                    setHistorySearchStudent('');
                    setHistorySearchCompany('');
                    setHistoryStatusFilter('全部');
                  }}
                  className="px-4 py-2 text-sm font-medium text-[#646D76] hover:text-gray-900"
                >
                  重置筛选
                </button>
              </div>

              {/* Records Table */}
              <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">匹配 ID</th>
                        <th className="px-6 py-4 font-semibold">学生姓名</th>
                        <th className="px-6 py-4 font-semibold">投递岗位 / 企业</th>
                        <th className="px-6 py-4 font-semibold">当前进度</th>
                        <th className="px-6 py-4 font-semibold">最后更新</th>
                        <th className="px-6 py-4 font-semibold text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E3E6]">
                      {matches
                        .filter(m => !historySearchStudent || m.studentName.includes(historySearchStudent))
                        .filter(m => !historySearchCompany || m.company.includes(historySearchCompany))
                        .filter(m => historyStatusFilter === '全部' || m.matchStatus.startsWith(historyStatusFilter))
                        .map((match) => (
                          <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-[10px] font-mono text-[#646D76]">{match.id}</td>
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold">{match.studentName}</p>
                              <p className="text-[10px] text-[#646D76] font-mono">{match.studentId}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold">{match.jobTitle}</p>
                              <p className="text-xs text-blue-600 font-medium">{match.company}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                match.matchStatus === '已入职' ? "bg-emerald-50 text-emerald-600" : 
                                (match.matchStatus.startsWith('已失败') || match.matchStatus.startsWith('已放弃')) ? "bg-red-50 text-red-600" : 
                                (match.matchStatus === '已推荐' || match.matchStatus === '面试中') ? "bg-amber-50 text-amber-600" : 
                                "bg-gray-50 text-gray-600"
                              )}>
                                {match.matchStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{match.lastUpdateTime}</td>
                            <td className="px-6 py-4 text-right space-x-3">
                              <button 
                                onClick={() => {
                                  // Find the match in the matches list to get the latest status
                                  const m = matches.find(item => item.id === match.id);
                                  if (m) setSelectedMatch(m);
                                }}
                                className="text-xs text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                              >
                                <History className="w-3.5 h-3.5" />
                                查看全流程
                              </button>
                              <button 
                                onClick={() => {
                                  const newStatus = prompt(`更新 ${match.studentName} 的进度 (当前: ${match.matchStatus}):\n可用状态: 已推荐, 面试中, 已入职, 已失败_企业拒绝, 已失败_岗位取消, 已失败_不参加面试, 已失败_拒绝入职, 已放弃_主动放弃`);
                                  if (newStatus) {
                                    updateMatchStatus(match.id, newStatus);
                                  }
                                }}
                                className="text-xs text-amber-600 font-bold hover:underline inline-flex items-center gap-1"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                更新进度
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Process Timeline Modal */}
              {selectedMatch && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white z-10">
                      <div>
                        <h3 className="text-2xl font-bold">全流程追踪记录</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm font-bold text-blue-600">{selectedMatch.studentName}</span>
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                          <span className="text-sm text-[#646D76]">{selectedMatch.jobTitle} @ {selectedMatch.company}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedMatch(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="p-8">
                      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                        
                        {/* 1. 推荐记录 */}
                        <div className="relative flex items-start gap-6 group">
                          <div className="absolute left-0 w-10 h-10 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center z-10 shadow-sm">
                            <UserPlus className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="ml-12 pt-1.5 flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="text-sm font-bold">推荐记录</h4>
                              <span className="text-[10px] text-[#646D76] font-mono">{selectedMatch.recommendationTime || selectedMatch.matchDate}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <p className="text-[#646D76] mb-1">推荐状态</p>
                                  <p className="font-bold text-blue-600">已推荐</p>
                                </div>
                                <div>
                                  <p className="text-[#646D76] mb-1">负责人</p>
                                  <p className="font-bold">{selectedMatch.owner}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. 学生行为记录 (Conditional - if rejected or noShow) */}
                        {(selectedMatch.studentBehavior?.noShow || selectedMatch.studentBehavior?.rejected) && (
                          <div className="relative flex items-start gap-6 group">
                            <div className="absolute left-0 w-10 h-10 rounded-full bg-red-100 border-4 border-white flex items-center justify-center z-10 shadow-sm">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="ml-12 pt-1.5 flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-bold">学生异常行为</h4>
                                <span className="text-[10px] text-[#646D76] font-mono">{selectedMatch.lastUpdateTime}</span>
                              </div>
                              <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <p className="text-[#646D76] mb-1">行为类型</p>
                                    <p className="font-bold text-red-600">
                                      {selectedMatch.studentBehavior.noShow ? '面试爽约' : '拒绝入职'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[#646D76] mb-1">原因说明</p>
                                    <p className="font-bold">{selectedMatch.studentBehavior.reason}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 3. 面试记录 (Conditional) */}
                        {(selectedMatch.interviewTime !== '-' || selectedMatch.interviewStatus !== '未开始') && (
                          <div className="relative flex items-start gap-6 group">
                            <div className="absolute left-0 w-10 h-10 rounded-full bg-amber-100 border-4 border-white flex items-center justify-center z-10 shadow-sm">
                              <Clock className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="ml-12 pt-1.5 flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-bold">面试记录</h4>
                                <span className="text-[10px] text-[#646D76] font-mono">{selectedMatch.interviewTime}</span>
                              </div>
                              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <p className="text-[#646D76] mb-1">是否参加</p>
                                    <p className="font-bold">{selectedMatch.attendedInterview ? '是' : '否'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[#646D76] mb-1">面试结果</p>
                                    <p className={cn(
                                      "font-bold",
                                      selectedMatch.interviewResult?.includes('通过') ? "text-emerald-600" : "text-amber-600"
                                    )}>{selectedMatch.interviewResult || selectedMatch.interviewStatus}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. 企业反馈 (Conditional) */}
                        {selectedMatch.evaluation !== '-' && (
                          <div className="relative flex items-start gap-6 group">
                            <div className="absolute left-0 w-10 h-10 rounded-full bg-purple-100 border-4 border-white flex items-center justify-center z-10 shadow-sm">
                              <FileText className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="ml-12 pt-1.5 flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-bold">企业反馈</h4>
                                <span className="text-[10px] text-[#646D76] font-mono">{selectedMatch.feedbackTime}</span>
                              </div>
                              <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#646D76]">评分:</span>
                                    <div className="flex gap-0.5">
                                      {[1, 2, 3, 4, 5].map(star => (
                                        <div key={star} className={cn(
                                          "w-2 h-2 rounded-full", 
                                          star <= (selectedMatch.enterpriseRating || 4) ? "bg-purple-600" : "bg-purple-200"
                                        )} />
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs text-[#646D76] mb-1">评价内容</p>
                                    <p className="text-sm font-medium italic">"{selectedMatch.evaluation}"</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 5. 到岗记录 */}
                        {(selectedMatch.joined || selectedMatch.matchStatus === '已入职' || selectedMatch.matchStatus.startsWith('已失败')) && (
                          <div className="relative flex items-start gap-6 group">
                            <div className={cn(
                              "absolute left-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm",
                              selectedMatch.joined || selectedMatch.matchStatus === '已入职' ? "bg-emerald-100" : "bg-red-100"
                            )}>
                              {selectedMatch.joined || selectedMatch.matchStatus === '已入职' ? <Target className="w-4 h-4 text-emerald-600" /> : <ShieldAlert className="w-4 h-4 text-red-600" />}
                            </div>
                            <div className="ml-12 pt-1.5 flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-bold">到岗记录 / 最终结果</h4>
                                <span className="text-[10px] text-[#646D76] font-mono">{selectedMatch.lastUpdateTime}</span>
                              </div>
                              <div className={cn(
                                "p-4 rounded-2xl border",
                                selectedMatch.joined || selectedMatch.matchStatus === '已入职' ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"
                              )}>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <p className="text-[#646D76] mb-1">是否入职</p>
                                    <p className={cn("font-bold", selectedMatch.joined || selectedMatch.matchStatus === '已入职' ? "text-emerald-600" : "text-red-600")}>
                                      {selectedMatch.joined || selectedMatch.matchStatus === '已入职' ? '是' : '否'}
                                    </p>
                                  </div>
                                  {selectedMatch.joined || selectedMatch.matchStatus === '已入职' ? (
                                    <div>
                                      <p className="text-[#646D76] mb-1">入职时间</p>
                                      <p className="font-bold">{selectedMatch.joinTime !== '-' ? selectedMatch.joinTime : selectedMatch.lastUpdateTime}</p>
                                    </div>
                                  ) : (
                                    <div>
                                      <p className="text-[#646D76] mb-1">未入职原因</p>
                                      <p className="font-bold text-red-600">{selectedMatch.failReason !== '-' ? selectedMatch.failReason : '学生主动放弃'}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* AI Failure Analysis Section */}
                              {selectedMatch.matchStatus.startsWith('已失败') && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-bold flex items-center gap-2">
                                      <Zap className="w-4 h-4 text-emerald-600" />
                                      AI 失败原因深度分析
                                    </h4>
                                    {!aiFailureAnalysis[selectedMatch.id] && (
                                      <button 
                                        onClick={() => handleAnalyzeFailure(selectedMatch)}
                                        disabled={isAnalyzingFailure[selectedMatch.id]}
                                        className="px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors flex items-center gap-2"
                                      >
                                        {isAnalyzingFailure[selectedMatch.id] ? <Clock className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                                        立即分析
                                      </button>
                                    )}
                                  </div>

                                  {aiFailureAnalysis[selectedMatch.id] ? (
                                    <div className="space-y-4">
                                      <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                                        <p className="text-xs text-emerald-900 leading-relaxed mb-3">
                                          {aiFailureAnalysis[selectedMatch.id]?.summary}
                                        </p>
                                        <div className="grid grid-cols-1 gap-3">
                                          {aiFailureAnalysis[selectedMatch.id]?.reasons?.map((reason, idx) => (
                                            <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-50 shadow-sm">
                                              <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{reason.reason}</span>
                                                <span className="text-[8px] font-bold text-emerald-400">权重: {(reason.weight * 100).toFixed(0)}%</span>
                                              </div>
                                              <p className="text-[10px] text-[#646D76]">{reason.description}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {aiFailureAnalysis[selectedMatch.id]?.recommendations && (
                                        <div className="space-y-3">
                                          <h5 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                                            <BookOpen className="w-3 h-3 text-blue-600" />
                                            系统推荐提升方案
                                          </h5>
                                          <div className="grid grid-cols-1 gap-3">
                                            <div className="space-y-2">
                                              <p className="text-[8px] font-bold text-[#646D76] uppercase">推荐课程</p>
                                              {aiFailureAnalysis[selectedMatch.id]?.recommendations?.recommendedCourses?.map(course => (
                                                <div key={course.id} className="bg-white p-3 rounded-xl border border-blue-50 shadow-sm flex justify-between items-center group">
                                                  <div>
                                                    <p className="text-xs font-bold text-gray-900">{course.title}</p>
                                                    <p className="text-[8px] text-[#646D76] mt-0.5">提升：{course.skillImproved} · +{course.scoreIncrease}分</p>
                                                  </div>
                                                  <button 
                                                    onClick={() => completeCourse(selectedMatch.studentId, course)}
                                                    className="px-2 py-1 bg-blue-600 text-white text-[8px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                  >
                                                    完成学习
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-[8px] font-bold text-[#646D76] uppercase">提升建议</p>
                                              <div className="bg-blue-50/30 p-3 rounded-xl border border-blue-100 space-y-1.5">
                                                {aiFailureAnalysis[selectedMatch.id]?.recommendations?.improvementSuggestions?.map((suggestion, idx) => (
                                                  <div key={idx} className="flex items-start gap-1.5">
                                                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                                    <p className="text-[10px] text-blue-900">{suggestion}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                      <p className="text-[10px] text-[#646D76]">
                                        {isAnalyzingFailure[selectedMatch.id] ? 'AI 正在深度分析失败原因，请稍候...' : '点击“立即分析”获取 AI 诊断建议'}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-3xl">
                      <button 
                        onClick={() => {
                          alert(`正在导出 ${selectedMatch.studentName} 的全流程履历报表...`);
                        }}
                        className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        导出此履历
                      </button>
                      <button 
                        onClick={() => setSelectedMatch(null)}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                      >
                        确认关闭
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === '培训认证' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">培训认证</h2>
                  <p className="text-[#646D76] mt-1">全平台培训能力中枢，管理课程、考试与认证体系。</p>
                </div>
                <div className="flex gap-3">
                  {trainingSubTab === '课程库' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      新增课程
                    </button>
                  )}
                  {trainingSubTab === '学习任务' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      批量推送任务
                    </button>
                  )}
                </div>
              </div>

              {/* Sub Tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                {['课程库', '能力测评', '学习任务', '认证管理', '数据看板'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTrainingSubTab(tab)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                      trainingSubTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-[#646D76] hover:text-gray-900"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {trainingSubTab === '课程库' && (
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#646D76]">技能标签:</span>
                      <select 
                        value={courseSkillFilter}
                        onChange={(e) => setCourseSkillFilter(e.target.value)}
                        className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                      >
                        <option>全部</option>
                        <option>5G NR</option>
                        <option>Ceph</option>
                        <option>BGP</option>
                        <option>PyTorch</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#646D76]">岗位类型:</span>
                      <select 
                        value={courseJobTypeFilter}
                        onChange={(e) => setCourseJobTypeFilter(e.target.value)}
                        className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                      >
                        <option>全部</option>
                        <option>通信工程</option>
                        <option>存储工程师</option>
                        <option>数通工程师</option>
                        <option>AI应用开发</option>
                        <option>硬件测试</option>
                        <option>运维支持</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coursesData
                      .filter(c => courseSkillFilter === '全部' || c.skillTags.includes(courseSkillFilter))
                      .filter(c => courseJobTypeFilter === '全部' || c.jobType === courseJobTypeFilter)
                      .map(course => (
                      <div key={course.id} className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 p-4 flex flex-col justify-between">
                          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full w-fit backdrop-blur-sm">{course.id}</span>
                          <h4 className="text-white font-bold leading-tight">{course.title}</h4>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="flex flex-wrap gap-1">
                            {course.skillTags.map(tag => (
                              <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{tag}</span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-xs text-[#646D76]">
                            <span>{course.duration}</span>
                            <span>{course.studentsCount} 人学习</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                            <span className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded",
                              course.status === '已上线' ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                            )}>
                              {course.status}
                            </span>
                            <button className="text-xs text-blue-600 font-bold hover:underline">编辑课程</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {trainingSubTab === '能力测评' && (
                <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">测评 ID</th>
                          <th className="px-6 py-4 font-semibold">学生姓名 / ID</th>
                          <th className="px-6 py-4 font-semibold">综合评分</th>
                          <th className="px-6 py-4 font-semibold">优势技能</th>
                          <th className="px-6 py-4 font-semibold">薄弱项</th>
                          <th className="px-6 py-4 font-semibold">测评日期</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {assessmentsData.map(assessment => (
                          <tr key={assessment.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-[10px] font-mono text-[#646D76]">{assessment.id}</td>
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold">{assessment.studentName}</p>
                              <p className="text-[10px] text-[#646D76] font-mono">{assessment.studentId}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div 
                                    className={cn(
                                      "h-full transition-all",
                                      assessment.score >= 90 ? "bg-emerald-500" : 
                                      assessment.score >= 80 ? "bg-blue-500" : "bg-amber-500"
                                    )}
                                    style={{ width: `${assessment.score}%` }}
                                  />
                                </div>
                                <span className="text-sm font-bold">{assessment.score}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {assessment.strengths.map(s => (
                                  <span key={s} className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">{s}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {assessment.weaknesses.map(w => (
                                  <span key={w} className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">{w}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{assessment.date}</td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-xs text-blue-600 font-bold hover:underline">查看报告</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {trainingSubTab === '学习任务' && (
                <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">任务 ID</th>
                          <th className="px-6 py-4 font-semibold">任务标题</th>
                          <th className="px-6 py-4 font-semibold">目标学生数</th>
                          <th className="px-6 py-4 font-semibold">状态</th>
                          <th className="px-6 py-4 font-semibold">推送时间</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {learningTasksData.map(task => (
                          <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-[10px] font-mono text-[#646D76]">{task.id}</td>
                            <td className="px-6 py-4 text-sm font-semibold">{task.title}</td>
                            <td className="px-6 py-4 text-sm">{task.targetStudents} 人</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-xs font-medium px-2 py-0.5 rounded-full",
                                task.status === '已推送' ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
                              )}>
                                {task.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{task.pushDate}</td>
                            <td className="px-6 py-4 text-right space-x-3">
                              {task.status === '待推送' && (
                                <button className="text-xs text-blue-600 font-bold hover:underline">立即推送</button>
                              )}
                              <button className="text-xs text-[#646D76] font-bold hover:underline">详情</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {trainingSubTab === '认证管理' && (
                <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">记录 ID</th>
                          <th className="px-6 py-4 font-semibold">学生姓名</th>
                          <th className="px-6 py-4 font-semibold">认证考试</th>
                          <th className="px-6 py-4 font-semibold">考试得分</th>
                          <th className="px-6 py-4 font-semibold">状态</th>
                          <th className="px-6 py-4 font-semibold">发放时间</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {certificationsData.map(cert => (
                          <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-[10px] font-mono text-[#646D76]">{cert.id}</td>
                            <td className="px-6 py-4 text-sm font-semibold">{cert.studentName}</td>
                            <td className="px-6 py-4 text-sm">{cert.examName}</td>
                            <td className="px-6 py-4 text-sm font-bold">{cert.score}</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-xs font-medium px-2 py-0.5 rounded-full",
                                cert.status === '已发放' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                              )}>
                                {cert.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{cert.issueDate}</td>
                            <td className="px-6 py-4 text-right space-x-3">
                              {cert.status === '待审核' && (
                                <button className="text-xs text-blue-600 font-bold hover:underline">审核发放</button>
                              )}
                              <button className="text-xs text-[#646D76] font-bold hover:underline">查看记录</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {trainingSubTab === '数据看板' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h4 className="text-sm font-bold text-[#646D76] mb-6 uppercase">能力提升趋势</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trainingDashboardData.improvementTrend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <Tooltip 
                              contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                            />
                            <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{r: 4, fill: '#3B82F6'}} activeDot={{r: 6}} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h4 className="text-sm font-bold text-[#646D76] mb-6 uppercase">核心指标概览</h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                          <p className="text-xs text-blue-600 font-bold mb-1">培训完成率</p>
                          <p className="text-3xl font-bold text-blue-900">{trainingDashboardData.completionRate}%</p>
                          <div className="mt-4 w-full bg-blue-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-full rounded-full" style={{width: `${trainingDashboardData.completionRate}%`}} />
                          </div>
                        </div>
                        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <p className="text-xs text-emerald-600 font-bold mb-1">认证通过率</p>
                          <p className="text-3xl font-bold text-emerald-900">{trainingDashboardData.passRate}%</p>
                          <div className="mt-4 w-full bg-emerald-200 rounded-full h-1.5">
                            <div className="bg-emerald-600 h-full rounded-full" style={{width: `${trainingDashboardData.passRate}%`}} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 space-y-4">
                        <h5 className="text-xs font-bold text-[#646D76] uppercase">各方向培训分布</h5>
                        {trainingDashboardData.skillDistribution.map(item => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-[#646D76]">{item.value}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1">
                              <div className="bg-blue-400 h-full rounded-full" style={{width: `${item.value}%`}} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === '运营管理' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">运营管理</h2>
                  <p className="text-[#646D76] mt-1">监控平台健康度，管理运营日志与问题闭环。</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white border border-[#E1E3E6] text-[#646D76] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    权限管理
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    导出报告
                  </button>
                </div>
              </div>

              {/* Sub Tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                {['运营日志', '平台健康度', '问题闭环管理', '复盘报表'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setOpSubTab(tab)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                      opSubTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-[#646D76] hover:text-gray-900"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {opSubTab === '运营日志' ? (
                <>
                  {/* Stats Grid - Segmented */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: '今日新增企业', total: '5', intern: '3', regular: '2', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: '今日新增岗位', total: '12', intern: '8', regular: '4', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: '今日推荐人数', total: '30', intern: '20', regular: '10', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                      { label: '今日入岗人数', total: '8', intern: '5', regular: '3', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#646D76] font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.total}</h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-50">
                          <div>
                            <p className="text-[10px] text-[#646D76] uppercase font-bold">实习</p>
                            <p className="text-sm font-bold text-orange-600">{stat.intern}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[#646D76] uppercase font-bold">正式</p>
                            <p className="text-sm font-bold text-blue-600">{stat.regular}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-[#E1E3E6]">
                      <h3 className="font-bold text-lg">每日运营日志</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">日期</th>
                            <th className="px-6 py-4 font-semibold text-center">新增企业 (实/正)</th>
                            <th className="px-6 py-4 font-semibold text-center">新增岗位 (实/正)</th>
                            <th className="px-6 py-4 font-semibold text-center">推荐人数 (实/正)</th>
                            <th className="px-6 py-4 font-semibold text-center">入岗人数 (实/正)</th>
                            <th className="px-6 py-4 font-semibold">负责人</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E1E3E6]">
                          {operationsData.map((op, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm font-medium">{op.date}</td>
                              <td className="px-6 py-4 text-sm text-center">
                                <span className="font-bold">{op.newEnterprise}</span>
                                <span className="text-[10px] text-[#646D76] ml-1">({Math.floor(op.newEnterprise*0.6)}/{op.newEnterprise - Math.floor(op.newEnterprise*0.6)})</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-center">
                                <span className="font-bold">{op.newJob}</span>
                                <span className="text-[10px] text-[#646D76] ml-1">({Math.floor(op.newJob*0.7)}/{op.newJob - Math.floor(op.newJob*0.7)})</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-center">
                                <span className="font-bold text-blue-600">{op.recommended}</span>
                                <span className="text-[10px] text-[#646D76] ml-1">({Math.floor(op.recommended*0.65)}/{op.recommended - Math.floor(op.recommended*0.65)})</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-center">
                                <span className="font-bold text-emerald-600">{op.placed}</span>
                                <span className="text-[10px] text-[#646D76] ml-1">({Math.floor(op.placed*0.8)}/{op.placed - Math.floor(op.placed*0.8)})</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#646D76]">{op.owner}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : opSubTab === '平台健康度' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: '数据同步及时率', value: '98.5%', color: 'text-blue-600' },
                      { label: '建档完成率', value: '95.2%', color: 'text-emerald-600' },
                      { label: '预警问题解决率', value: '88.0%', color: 'text-amber-600' },
                      { label: '实习稳定率', value: '92.4%', color: 'text-purple-600' },
                    ].map((m) => (
                      <div key={m.label} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <p className="text-sm text-[#646D76] font-medium">{m.label}</p>
                        <h3 className={cn("text-2xl font-bold mt-1", m.color)}>{m.value}</h3>
                        <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-600 font-bold">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>较上周 +2.4%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h3 className="font-bold text-lg mb-6">健康度趋势分析</h3>
                      <div className="flex gap-2 mb-6">
                        <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">周</button>
                        <button className="px-3 py-1 bg-gray-50 text-[#646D76] rounded-lg text-xs font-bold">月</button>
                      </div>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={healthMetricsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <Tooltip 
                              contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                            />
                            <Line type="monotone" dataKey="syncRate" name="同步率" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                            <Line type="monotone" dataKey="archiveRate" name="建档率" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                            <Line type="monotone" dataKey="solveRate" name="解决率" stroke="#F59E0B" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h3 className="font-bold text-lg mb-6">平台负载与并发监控</h3>
                      <div className="flex gap-2 mb-6">
                        <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">实时</button>
                        <button className="px-3 py-1 bg-gray-50 text-[#646D76] rounded-lg text-xs font-bold">24小时</button>
                      </div>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[
                            { time: '08:00', load: 45 },
                            { time: '10:00', load: 78 },
                            { time: '12:00', load: 62 },
                            { time: '14:00', load: 85 },
                            { time: '16:00', load: 92 },
                            { time: '18:00', load: 55 },
                          ]}>
                            <defs>
                              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} unit="%" />
                            <Tooltip 
                              contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                            />
                            <Area type="monotone" dataKey="load" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              ) : opSubTab === '问题闭环管理' ? (
                <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-[#E1E3E6] flex justify-between items-center">
                    <h3 className="font-bold text-lg">全平台问题追踪</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold">待处理</button>
                      <button className="px-3 py-1 bg-gray-50 text-[#646D76] rounded-lg text-xs font-bold">已闭环</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">问题 ID</th>
                          <th className="px-6 py-4 font-semibold">类型</th>
                          <th className="px-6 py-4 font-semibold">详情</th>
                          <th className="px-6 py-4 font-semibold">责任人</th>
                          <th className="px-6 py-4 font-semibold">预计闭环时间</th>
                          <th className="px-6 py-4 font-semibold">状态</th>
                          <th className="px-6 py-4 font-semibold text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E3E6]">
                        {problemManagementData.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-xs font-mono text-[#646D76]">{p.id}</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded",
                                p.type === '匹配问题' ? "bg-blue-50 text-blue-600" :
                                p.type === '预警问题' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                              )}>
                                {p.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">{p.detail}</td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{p.owner}</td>
                            <td className="px-6 py-4 text-sm text-[#646D76]">{p.expectedClose}</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "text-xs font-bold px-2.5 py-1 rounded-full",
                                p.status === '已闭环' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                              )}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {p.status !== '已闭环' && (
                                <button className="text-xs text-blue-600 font-bold hover:underline">标记闭环</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-600 p-8 rounded-3xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-2">周/月度复盘报表</h3>
                      <p className="text-blue-100 max-w-md">一键导入全平台核心数据，自动生成匹配工作流结构的复盘报表，提升复盘效率。</p>
                      <button className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4" />
                        平台数据导入
                      </button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10">
                      <FileText className="w-64 h-64 -mb-16 -mr-16" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h4 className="font-bold mb-4">最近生成的报表</h4>
                      <div className="space-y-3">
                        {['2024年3月第一周运营复盘', '2024年2月月度运营总结', '2024年2月第四周运营复盘'].map((report) => (
                          <div key={report} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl group hover:bg-blue-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <span className="text-sm font-medium">{report}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h4 className="font-bold mb-4">报表模板</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center space-y-2 hover:border-blue-300 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold">增长分析模板</span>
                        </div>
                        <div className="p-4 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center space-y-2 hover:border-blue-300 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                            <ShieldAlert className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold">风险监控模板</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === '实习生管理' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">实习生管理</h2>
                  <p className="text-[#646D76] mt-1">监控实习生在岗状态、工作产出及AI风险预警。</p>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#646D76]" />
                    <input 
                      type="text" 
                      placeholder="搜索姓名、企业..." 
                      className="pl-10 pr-4 py-2 bg-white border border-[#E1E3E6] rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    导出名单
                  </button>
                </div>
              </div>

              {/* Sub Tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                {['实习生列表', '工作记录统计', '提交率统计'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setInternSubTab(tab)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                      internSubTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-[#646D76] hover:text-gray-900"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {internSubTab === '实习生列表' ? (
                <>
                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#646D76]">在岗状态:</span>
                      <select 
                        value={internStatusFilter}
                        onChange={(e) => setInternStatusFilter(e.target.value)}
                        className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                      >
                        <option>全部</option>
                        <option>正常</option>
                        <option>离职</option>
                        <option>预警</option>
                        <option>高风险</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#646D76]">实习转正:</span>
                      <select 
                        value={internConvertedFilter}
                        onChange={(e) => setInternConvertedFilter(e.target.value)}
                        className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                      >
                        <option>全部</option>
                        <option>已转正</option>
                        <option>未转正</option>
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">实习 ID / 姓名</th>
                            <th className="px-6 py-4 font-semibold">岗位 ID / 学生 ID</th>
                            <th className="px-6 py-4 font-semibold">企业负责人</th>
                            <th className="px-6 py-4 font-semibold text-center">日报率</th>
                            <th className="px-6 py-4 font-semibold text-center">周报率</th>
                            <th className="px-6 py-4 font-semibold">异常记录</th>
                            <th className="px-6 py-4 font-semibold">离岗信息</th>
                            <th className="px-6 py-4 font-semibold">实习结果</th>
                            <th className="px-6 py-4 font-semibold">状态</th>
                            <th className="px-6 py-4 font-semibold text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E1E3E6]">
                          {interns
                            .filter(i => internStatusFilter === '全部' || i.status === internStatusFilter)
                            .filter(i => {
                              if (internConvertedFilter === '全部') return true;
                              return internConvertedFilter === '已转正' ? i.isConverted : !i.isConverted;
                            })
                            .map((intern) => (
                            <tr key={intern.id} className="hover:bg-gray-50 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="text-[10px] text-[#646D76] font-mono">{intern.id}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">{intern.name}</span>
                                    {intern.isConverted && (
                                      <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold">已转正</span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col text-[10px] text-[#646D76] font-mono">
                                  <span>J: {intern.jobId}</span>
                                  <span>S: {intern.studentId}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#646D76]">{intern.owner}</td>
                              <td className="px-6 py-4 text-center text-sm font-medium">{intern.dailyRate}%</td>
                              <td className="px-6 py-4 text-center text-sm font-medium">{intern.weeklyRate}%</td>
                              <td className="px-6 py-4 text-center">
                                <span className={cn(
                                  "text-xs font-bold",
                                  intern.exceptions > 0 ? "text-red-500" : "text-gray-400"
                                )}>
                                  {intern.exceptions}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col text-xs">
                                  <span className={intern.isOff ? "text-red-500 font-medium" : "text-gray-500"}>
                                    {intern.isOff ? '已离岗' : '在岗'}
                                  </span>
                                  {intern.isOff && <span className="text-[10px] text-[#646D76]">{intern.offTime}</span>}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs font-medium">{intern.result}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={cn(
                                  "text-xs font-medium px-2.5 py-1 rounded-full",
                                  intern.status === '正常' ? "bg-blue-50 text-blue-600" :
                                  intern.status === '预警' ? "bg-amber-50 text-amber-600" :
                                  intern.status === '高风险' ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"
                                )}>
                                  {intern.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => setSelectedIntern(intern)}
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
                </>
              ) : internSubTab === '工作记录统计' ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-[#E1E3E6] shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#646D76]">统计周期:</span>
                      <select 
                        value={workStatsCycleFilter}
                        onChange={(e) => setWorkStatsCycleFilter(e.target.value)}
                        className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                      >
                        <option>全部</option>
                        <option>2024-W10</option>
                        <option>2024-W09</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#646D76]">风险状态:</span>
                      <select 
                        value={workStatsRiskFilter}
                        onChange={(e) => setWorkStatsRiskFilter(e.target.value)}
                        className="bg-gray-50 border border-[#E1E3E6] rounded-lg text-sm px-3 py-1.5 outline-none"
                      >
                        <option>全部</option>
                        <option>正常</option>
                        <option>预警</option>
                        <option>高风险</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E1E3E6] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-gray-50 text-[#646D76] uppercase tracking-wider">
                            <th className="px-4 py-3 font-semibold">周期</th>
                            <th className="px-4 py-3 font-semibold">实习/学生 ID</th>
                            <th className="px-4 py-3 font-semibold">日报 (本周)</th>
                            <th className="px-4 py-3 font-semibold">周报 (本周)</th>
                            <th className="px-4 py-3 font-semibold">任务完成率</th>
                            <th className="px-4 py-3 font-semibold">风险状态</th>
                            <th className="px-4 py-3 font-semibold">处理状态</th>
                            <th className="px-4 py-3 font-semibold">处理人</th>
                            <th className="px-4 py-3 font-semibold text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E1E3E6]">
                          {workStatsData.map((stat, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">{stat.cycle}</td>
                              <td className="px-4 py-3 font-mono text-[10px]">
                                <div>I: {stat.internId}</div>
                                <div>S: {stat.studentId}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-medium">{stat.dailyCount}</div>
                                <div className="text-[10px] text-[#646D76]">{stat.dailyRate}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-medium">{stat.weeklyCount}</div>
                                <div className="text-[10px] text-[#646D76]">{stat.weeklyRate}</div>
                              </td>
                              <td className="px-4 py-3 font-bold text-blue-600">{stat.taskRate}</td>
                              <td className="px-4 py-3">
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full font-bold",
                                  stat.riskStatus === '正常' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                )}>
                                  {stat.riskStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full font-bold",
                                  stat.handleStatus === '已闭环' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                )}>
                                  {stat.handleStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3">{stat.handler}</td>
                              <td className="px-4 py-3 text-right">
                                <button className="text-blue-600 hover:underline font-bold">详情</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: '整体日报提交率', value: '88.5%', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: '整体周报提交率', value: '92.0%', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: '异常记录总数', value: '12条', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                      { label: '风险预警解决率', value: '78%', icon: ShieldAlert, color: 'text-purple-600', bg: 'bg-purple-50' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
                          <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <p className="text-sm text-[#646D76] font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      </div>
                    ))}
                  </div>

                  {['按班级统计', '按产业学院统计', '按企业统计'].map((title) => (
                    <div key={title} className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
                      <h4 className="font-bold mb-4">{title}</h4>
                      <div className="space-y-4">
                        {[
                          { name: title.includes('班级') ? '20级计科1班' : title.includes('学院') ? '信息产业学院' : '华为', rate: 95 },
                          { name: title.includes('班级') ? '20级计科2班' : title.includes('学院') ? '数字经济学院' : '中兴通讯', rate: 88 },
                          { name: title.includes('班级') ? '21级软件1班' : title.includes('学院') ? '智能制造学院' : '百度', rate: 72 },
                        ].map((item) => (
                          <div key={item.name} className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#646D76]">{item.name}</span>
                              <span className="font-bold">{item.rate}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full rounded-full", item.rate > 90 ? "bg-emerald-500" : item.rate > 80 ? "bg-blue-500" : "bg-amber-500")}
                                style={{ width: `${item.rate}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Intern Detail Modal */}
              {selectedIntern && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                          {selectedIntern.name[0]}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{selectedIntern.name}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-[#646D76]">{selectedIntern.company} · {selectedIntern.position}</span>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-sm text-[#646D76]">ID: {selectedIntern.id}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedIntern(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Menu className="w-6 h-6 rotate-45" />
                      </button>
                    </div>
                    
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Basic Info */}
                      <section className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <User className="w-5 h-5 text-blue-600" />
                          基础信息
                        </h4>
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <div className="space-y-1">
                            <p className="text-[10px] text-[#646D76] font-bold uppercase">入岗时间</p>
                            <p className="text-sm font-medium">{selectedIntern.joinDate}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-[#646D76] font-bold uppercase">项目负责人</p>
                            <p className="text-sm font-medium">{selectedIntern.owner}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-[#646D76] font-bold uppercase">实习结果</p>
                            <p className="text-sm font-medium">{selectedIntern.result}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-[#646D76] font-bold uppercase">转正状态</p>
                            <p className="text-sm font-medium">{selectedIntern.isConverted ? '已转正' : '未转正'}</p>
                          </div>
                        </div>
                      </section>

                      {/* Work Records */}
                      <section className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <FileText className="w-5 h-5 text-emerald-600" />
                          工作记录
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <span className="text-sm text-[#646D76]">日报提交率</span>
                            <span className="text-sm font-bold text-blue-600">{selectedIntern.dailyRate}%</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <span className="text-sm text-[#646D76]">周报提交率</span>
                            <span className="text-sm font-bold text-emerald-600">{selectedIntern.weeklyRate}%</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <span className="text-sm text-[#646D76]">任务完成率</span>
                            <span className="text-sm font-bold text-purple-600">{selectedIntern.completionRate}%</span>
                          </div>
                        </div>
                      </section>

                      {/* Enterprise Feedback */}
                      <section className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-amber-600" />
                          企业反馈
                        </h4>
                        <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                          <p className="text-sm text-amber-900 leading-relaxed italic">
                            "该同学在实习期间表现出色，技术学习能力强，能够按时保质完成分配的任务。沟通积极主动，具有良好的团队协作精神。"
                          </p>
                        </div>
                      </section>

                      {/* Risk Warning */}
                      <section className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-red-600" />
                          风险预警
                        </h4>
                        <div className={cn(
                          "p-6 rounded-2xl border",
                          selectedIntern.riskLevel === '高' ? "bg-red-50 border-red-100" :
                          selectedIntern.riskLevel === '中' ? "bg-amber-50 border-amber-100" : "bg-emerald-50 border-emerald-100"
                        )}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              selectedIntern.riskLevel === '高' ? "bg-red-500" :
                              selectedIntern.riskLevel === '中' ? "bg-amber-500" : "bg-emerald-500"
                            )} />
                            <span className="text-sm font-bold uppercase">{selectedIntern.riskLevel}风险状态</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {selectedIntern.riskLevel === '高' ? '检测到连续未提交周报，且企业反馈活跃度下降。' : 
                             selectedIntern.riskLevel === '中' ? '日报提交存在滞后，需加强跟进。' : '目前状态良好，无明显风险。'}
                          </p>
                        </div>
                      </section>
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button 
                        onClick={() => setSelectedIntern(null)}
                        className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        关闭
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        处理预警
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Ability Evaluation Modal */}
              {isAbilityEvalModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-blue-900">实习生能力评价</h3>
                        <p className="text-sm text-blue-700 mt-1">评价结果将同步至管理端，并自动为学生推送补强课程。</p>
                      </div>
                      <button onClick={() => setIsAbilityEvalModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45 text-blue-900" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-[#646D76] uppercase">实习表现评分</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['优秀', '良好', '一般', '不合格'].map(level => (
                            <button 
                              key={level}
                              className="py-2 px-3 border border-[#E1E3E6] rounded-xl text-xs font-bold hover:bg-blue-50 hover:border-blue-200 transition-all"
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-[#646D76] uppercase">标记能力不足项 (将触发课程推送)</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['5G NR 协议', '无线网络优化', 'Ceph 架构原理', 'BGP 路由协议', '深度学习框架', '模型部署优化'].map(skill => (
                            <label key={skill} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                              <span className="text-sm">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">补强建议</label>
                        <textarea 
                          rows={3}
                          placeholder="请输入具体的学习建议..."
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsAbilityEvalModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={() => {
                          setIsAbilityEvalModalOpen(false);
                          // 模拟同步逻辑
                        }}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        提交并推送课程
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Skill Assessment Report Modal */}
              {isSkillReportModalOpen && selectedInternForReport && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">岗位技能评估报告 - {selectedInternForReport.name}</h3>
                        <p className="text-xs text-[#646D76] mt-1">岗位标准：{selectedInternForReport.position} · 班级：金融精英班</p>
                      </div>
                      <button onClick={() => setIsSkillReportModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                      {/* Summary Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                          <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">技能点达标率</p>
                          <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-blue-900">
                              {Math.round((selectedInternForReport.skillPointResults?.filter((r: any) => r.status === '通过').length / (selectedInternForReport.skillPointResults?.length || 1)) * 100)}%
                            </span>
                            <span className="text-xs text-blue-700 mb-1.5">
                              ({selectedInternForReport.skillPointResults?.filter((r: any) => r.status === '通过').length}/{selectedInternForReport.skillPointResults?.length})
                            </span>
                          </div>
                        </div>
                        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">课程学习进度</p>
                          <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-emerald-900">{selectedInternForReport.trainingCompletionRate}%</span>
                            <span className="text-xs text-emerald-700 mb-1.5">已完成</span>
                          </div>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                          <p className="text-[10px] text-purple-600 font-bold uppercase mb-1">证书状态</p>
                          <div className="flex items-end gap-2">
                            <span className="text-xl font-bold text-purple-900">{selectedInternForReport.certificateStatus}</span>
                            <span className="text-[10px] text-purple-700 mb-1">{selectedInternForReport.certificateName}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Detailed Skill Points */}
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <Target className="w-4 h-4 text-blue-600" />
                              培训类技能点考核明细
                            </h4>
                            <div className="space-y-3">
                              {selectedInternForReport.skillPointResults?.filter((item: any) => item.category === 'training').map((item: any, idx: number) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <span className="text-[8px] font-bold text-blue-600 uppercase tracking-wider">{item.module}</span>
                                      <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                    </div>
                                    <span className={cn(
                                      "text-[10px] font-bold px-2 py-0.5 rounded",
                                      item.status === '通过' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                    )}>{item.status}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div className={cn(
                                        "h-full transition-all", 
                                        item.score >= 90 ? "bg-emerald-500" : 
                                        item.score >= 70 ? "bg-blue-500" : "bg-red-500"
                                      )} style={{width: `${item.score}%`}} />
                                    </div>
                                    <span className="text-xs font-bold w-8 text-right">{item.score}分</span>
                                  </div>
                                  <p className="text-[10px] text-[#646D76] mt-2 italic">关联课程：{item.sliceName}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 实习类技能点/任务明细 */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-amber-600" />
                              实习类技能点/任务明细
                            </h4>
                            <div className="space-y-3">
                              {selectedInternForReport.internshipTasks?.map((task: any) => (
                                <div key={task.id} className="p-4 bg-amber-50/30 rounded-2xl border border-amber-100/50">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="text-sm font-bold text-gray-900">{task.name}</p>
                                      <p className="text-[10px] text-[#646D76]">完成日期：{task.date}</p>
                                    </div>
                                    <span className={cn(
                                      "text-[10px] font-bold px-2 py-0.5 rounded",
                                      task.status === '已完成' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                    )}>{task.status}</span>
                                  </div>
                                  {task.status === '已完成' && (
                                    <div className="flex items-center gap-3">
                                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{width: `${task.score}%`}} />
                                      </div>
                                      <span className="text-xs font-bold w-8 text-right">{task.score}分</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                              {(!selectedInternForReport.internshipTasks || selectedInternForReport.internshipTasks.length === 0) && (
                                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                  <p className="text-xs text-[#646D76]">暂无实习任务记录</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 实习导师评价 */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                              实习导师评价
                            </h4>
                            <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                  <User className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold">企业导师：王经理</p>
                                  <p className="text-[10px] text-[#646D76]">华为技术有限公司 · 资深架构师</p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed italic">
                                "该生在实习期间表现出色，特别是在「线上故障应急」任务中展现了极强的冷静分析能力和团队协作精神。技术基础扎实，能够快速适应企业开发环境，建议正式录用。"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Analysis and Recommendations */}
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                              待提升技能点 (得分 &lt; 70)
                            </h4>
                            <div className="space-y-2">
                              {selectedInternForReport.skillPointResults?.filter((s: any) => s.score < 70).length > 0 ? (
                                selectedInternForReport.skillPointResults?.filter((s: any) => s.score < 70).map((s: any) => (
                                  <div key={s.id} className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex justify-between items-center">
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold text-amber-900">{s.name}</span>
                                      <span className="text-[10px] text-amber-600">{s.category === 'training' ? '培训类' : '实习类'}</span>
                                    </div>
                                    <span className="text-xs font-bold text-amber-600">{s.score}分</span>
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                                  <p className="text-xs text-emerald-700 font-bold">暂无待提升技能点，表现优秀！</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              综合上岗判定
                            </h4>
                            <div className={cn(
                              "p-6 rounded-2xl border flex flex-col items-center text-center gap-3",
                              selectedInternForReport.usabilityStatus === '可录用' ? "bg-emerald-50 border-emerald-200" :
                              selectedInternForReport.usabilityStatus === '可上岗' ? "bg-blue-50 border-blue-200" :
                              selectedInternForReport.usabilityStatus === '待提升' ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"
                            )}>
                              <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center",
                                selectedInternForReport.usabilityStatus === '可录用' ? "bg-emerald-100 text-emerald-600" :
                                selectedInternForReport.usabilityStatus === '可上岗' ? "bg-blue-100 text-blue-600" :
                                selectedInternForReport.usabilityStatus === '待提升' ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                              )}>
                                {selectedInternForReport.usabilityStatus === '可录用' || selectedInternForReport.usabilityStatus === '可上岗' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                              </div>
                              <div>
                                <p className="text-lg font-bold">{selectedInternForReport.usabilityStatus}</p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {selectedInternForReport.usabilityStatus === '可录用' ? '该生已完成全部培训及实习任务，技能点全达标，可正式录用。' :
                                   selectedInternForReport.usabilityStatus === '可上岗' ? '该生已满足全部培训类技能要求及证书要求，可安排实习上岗。' :
                                   selectedInternForReport.usabilityStatus === '待提升' ? '该生部分技能点未达标，建议针对性补强后再进行考核。' : '该生多项核心技能缺失，目前不符合岗位要求。'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button 
                        onClick={() => alert('正在导出 PDF 报告...')}
                        className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-4 h-4" /> 导出 PDF 报告
                      </button>
                      <button 
                        onClick={() => setIsSkillReportModalOpen(false)}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                      >
                        确认
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Skill Config Modal */}
              {isSkillConfigModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">配置技能点考核标准</h3>
                        <p className="text-sm text-[#646D76] mt-1">设置技能名称、考核标准并关联资源。</p>
                      </div>
                      <button onClick={() => setIsSkillConfigModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">技能点名称</label>
                        <input type="text" placeholder="例如：通信前台工程师、5G 协议" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">考核标准 (可多选)</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['完成 3 个实战项目', '通过技能认证考试', '日报/周报评分 > 4.0', '导师评价优秀'].map(std => (
                            <label key={std} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                              <span className="text-sm">{std}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">关联培训课程</label>
                          <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl outline-none">
                            <option>选择课程库中的课程</option>
                            {coursesData.slice(0, 5).map(c => <option key={c.id}>{c.title}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">关联认证题库</label>
                          <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl outline-none">
                            <option>选择认证题库</option>
                            <option>5G 基础认证题库</option>
                            <option>5G 基础理论题库</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsSkillConfigModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button onClick={() => setIsSkillConfigModalOpen(false)} className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200">保存配置</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Process Report Modal (School Terminal) */}
              {isReportModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200">
                          {selectedStudent.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-blue-900">{selectedStudent.name} - 全过程实习报告</h3>
                          <p className="text-sm text-blue-700 mt-1">{selectedStudent.major} | {selectedStudent.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200">
                          <Download className="w-4 h-4" /> 导出 PDF 报告
                        </button>
                        <button onClick={() => setIsReportModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                          <Plus className="w-5 h-5 rotate-45 text-blue-900" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                      {/* Timeline Section */}
                      <section className="space-y-6">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <History className="w-5 h-5 text-blue-600" />
                          实习全生命周期时间线
                        </h4>
                        <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
                          {[
                            { date: '2024-01-15', title: '初始能力测评完成', desc: '综合评分：82分，系统生成初始能力画像。', icon: Target, color: 'bg-blue-500' },
                            { date: '2024-02-01', title: '首次岗位推荐', desc: '推荐至 华为 - 通信前台工程师，匹配度 92%。', icon: UserCheck, color: 'bg-indigo-500' },
                            { date: '2024-02-10', title: '面试通过', desc: '通过华为技术初试与复试，表现评级：优秀。', icon: Award, color: 'bg-emerald-500' },
                            { date: '2024-02-15', title: '正式入岗实习', desc: '进入华为通信事业部，开始为期 6 个月的实习。', icon: Building2, color: 'bg-blue-600' },
                            { date: '2024-03-01', title: '首月考核达标', desc: '月度评分 88 分，日报提交率 100%，导师评价：积极主动。', icon: Zap, color: 'bg-amber-500' },
                          ].map((item, idx) => (
                            <div key={idx} className="relative">
                              <div className={cn("absolute -left-8 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center text-white", item.color)}>
                                <item.icon className="w-3 h-3" />
                              </div>
                              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                  <span className="text-[10px] text-[#646D76] font-mono">{item.date}</span>
                                </div>
                                <p className="text-xs text-[#646D76] leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Platform Service Records */}
                      <section className="space-y-6">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-emerald-600" />
                          平台服务与合规记录
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                            <h5 className="text-sm font-bold text-emerald-900 mb-4">服务记录统计</h5>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-emerald-700">累计推荐次数</span>
                                <span className="text-sm font-bold text-emerald-900">5 次</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-emerald-700">面试辅导次数</span>
                                <span className="text-sm font-bold text-emerald-900">2 次</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-emerald-700">心理/职业咨询</span>
                                <span className="text-sm font-bold text-emerald-900">1 次</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                            <h5 className="text-sm font-bold text-blue-900 mb-4">合规性检查</h5>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-blue-700">实习协议签署</span>
                                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full font-bold">已完成</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-blue-700">保险购买状态</span>
                                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full font-bold">已承保</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-blue-700">违规记录</span>
                                <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-bold">无记录</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Internship Skill Point Attainment Status */}
                      <section className="space-y-6">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          实习技能点达标情况
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h5 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
                              已完成实习任务
                              <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full">
                                {selectedStudent.internshipTasks?.filter((t: any) => t.status === '已完成').length || 0} 项
                              </span>
                            </h5>
                            <div className="space-y-3">
                              {selectedStudent.internshipTasks?.filter((t: any) => t.status === '已完成').map((task: any) => (
                                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                  <div>
                                    <p className="text-xs font-bold text-gray-900">{task.name}</p>
                                    <p className="text-[10px] text-[#646D76] mt-0.5">评分：{task.score} | {task.date}</p>
                                  </div>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                              ))}
                              {(!selectedStudent.internshipTasks || selectedStudent.internshipTasks.filter((t: any) => t.status === '已完成').length === 0) && (
                                <p className="text-xs text-gray-400 text-center py-4">暂无已完成任务</p>
                              )}
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h5 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
                              待完成实习任务
                              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full">
                                {selectedStudent.internshipTasks?.filter((t: any) => t.status !== '已完成').length || 0} 项
                              </span>
                            </h5>
                            <div className="space-y-3">
                              {selectedStudent.internshipTasks?.filter((t: any) => t.status !== '已完成').map((task: any) => (
                                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-l-4 border-amber-400">
                                  <div>
                                    <p className="text-xs font-bold text-gray-900">{task.name}</p>
                                    <p className="text-[10px] text-[#646D76] mt-0.5">状态：{task.status}</p>
                                  </div>
                                  <Clock className="w-4 h-4 text-amber-500" />
                                </div>
                              ))}
                              {(!selectedStudent.internshipTasks || selectedStudent.internshipTasks.filter((t: any) => t.status !== '已完成').length === 0) && (
                                <p className="text-xs text-gray-400 text-center py-4">暂无待完成任务</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                          <h5 className="text-sm font-bold text-blue-900 mb-4">综合判定逻辑</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                selectedStudent.usabilityStatus === '可实习' || selectedStudent.usabilityStatus === '可录用' ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"
                              )}>
                                <Check className="w-3 h-3" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-blue-900">可实习 (Ready for Internship)</p>
                                <p className="text-[10px] text-blue-700 mt-0.5">判定标准：培训类技能点全部达标 + 必填证书已获得</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                selectedStudent.usabilityStatus === '可录用' ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"
                              )}>
                                <Check className="w-3 h-3" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-blue-900">可录用 (Ready for Hire)</p>
                                <p className="text-[10px] text-blue-700 mt-0.5">判定标准：培训类 + 实习类技能点全部达标</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Scoring Summary */}
                      <section className="space-y-6">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-600" />
                          实习表现评分摘要
                        </h4>
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                              <p className="text-[10px] text-[#646D76] font-bold uppercase mb-2">综合实习评分</p>
                              <p className="text-4xl font-bold text-blue-600">{selectedStudent.score || 88}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#646D76] font-bold uppercase mb-2">达标状态</p>
                              <p className={cn(
                                "text-xl font-bold",
                                (selectedStudent.score || 88) >= 60 ? "text-emerald-600" : "text-red-600"
                              )}>
                                {(selectedStudent.score || 88) >= 60 ? '合格 (及格线: 60)' : '不合格'}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#646D76] font-bold uppercase mb-2">建议学分发放</p>
                              <p className="text-xl font-bold text-gray-900">4.0 学分</p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                      <button 
                        onClick={() => setIsReportModalOpen(false)}
                        className="px-8 py-3 bg-white border border-[#E1E3E6] text-sm font-bold rounded-2xl hover:bg-gray-50 transition-colors"
                      >
                        关闭报告
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Enterprise Job Modal */}
              {isEntJobModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">发布 / 编辑岗位</h3>
                        <p className="text-sm text-[#646D76] mt-1">设置岗位技能要求、必填证书并关联培训课程。</p>
                      </div>
                      <button onClick={() => setIsEntJobModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">岗位名称</label>
                          <input type="text" placeholder="例如：通信前台工程师" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">岗位类型</label>
                          <select 
                            value={entJobType}
                            onChange={(e) => setEntJobType(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          >
                            <option value="实习">实习</option>
                            <option value="全职">全职</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">所需技能 (可多选)</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['5G', 'NR', 'Ceph', 'BGP', 'OSPF', 'PyTorch', 'TensorFlow', 'Linux'].map(skill => (
                            <label key={skill} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm group-hover:text-blue-600 transition-colors">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">必填证书 (可多选)</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['HCIA-5G 认证', 'HCIP-Storage 认证', 'HCIE-Datacom 认证', 'AI 应用开发高级认证'].map(cert => (
                            <label key={cert} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm group-hover:text-blue-600 transition-colors">{cert}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">关联培训课程 (可多选)</label>
                        <div className="grid grid-cols-2 gap-3">
                          {coursesData.slice(0, 4).map(course => (
                            <label key={course.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm group-hover:text-blue-600 transition-colors line-clamp-1">{course.title}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {entJobType === '实习' && (
                        <div className="grid grid-cols-2 gap-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-blue-600 uppercase">实习周期</label>
                            <select className="w-full px-4 py-3 bg-white border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                              <option>3个月</option>
                              <option>6个月</option>
                              <option>12个月</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-blue-600 uppercase">是否可转正</label>
                            <select className="w-full px-4 py-3 bg-white border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                              <option>是</option>
                              <option>否</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">岗位负责人 (企业内部对接人)</label>
                        <input type="text" placeholder="请输入负责人姓名" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsEntJobModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={() => {
                          setIsEntJobModalOpen(false);
                          // In a real app, this would trigger an API call and a success notification
                        }}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        确认发布
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Skill Config Modal */}
              {isSkillConfigModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">技能点配置</h3>
                        <p className="text-sm text-[#646D76] mt-1">自定义本岗位技能要求与考核方式。</p>
                      </div>
                      <button onClick={() => setIsSkillConfigModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                      {['5G 协议', '无线网优', '存储架构', '网络路由'].map((skill, idx) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold text-lg">{skill}</h4>
                            <button className="text-xs text-red-600 font-bold hover:underline">删除</button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#646D76] uppercase">考核方式</label>
                              <select className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none">
                                <option>在线笔试</option>
                                <option>实操演示</option>
                                <option>面试评估</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#646D76] uppercase">权重 (%)</label>
                              <input type="number" defaultValue={25} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none" />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-all flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> 添加新技能考核点
                      </button>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsSkillConfigModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={() => setIsSkillConfigModalOpen(false)}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        保存配置
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Matched Students Modal */}
              {isMatchedStudentsModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-blue-900">匹配学生列表</h3>
                        <p className="text-sm text-blue-700 mt-1">查看该岗位已推荐、已面试及已入岗的学生。</p>
                      </div>
                      <button onClick={() => setIsMatchedStudentsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45 text-blue-900" />
                      </button>
                    </div>
                    <div className="p-0 max-h-[70vh] overflow-y-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50 text-[#646D76] text-xs uppercase tracking-wider">
                            <th className="px-8 py-4 font-semibold">学生姓名</th>
                            <th className="px-8 py-4 font-semibold">匹配度</th>
                            <th className="px-8 py-4 font-semibold">当前状态</th>
                            <th className="px-8 py-4 font-semibold">推荐时间</th>
                            <th className="px-8 py-4 font-semibold text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {[
                            { name: '张三', match: '95%', status: '已入岗', date: '2024-03-10' },
                            { name: '李四', match: '88%', status: '待面试', date: '2024-03-12' },
                            { name: '王五', match: '82%', status: '已推荐', date: '2024-03-14' },
                            { name: '赵六', match: '79%', status: '已推荐', date: '2024-03-15' },
                          ].map((student, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                              <td className="px-8 py-4 text-sm font-bold">{student.name}</td>
                              <td className="px-8 py-4">
                                <span className="text-sm font-bold text-blue-600">{student.match}</span>
                              </td>
                              <td className="px-8 py-4">
                                <span className={cn(
                                  "text-xs px-2 py-1 rounded-full font-medium",
                                  student.status === '已入岗' ? "bg-emerald-50 text-emerald-600" :
                                  student.status === '待面试' ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"
                                )}>
                                  {student.status}
                                </span>
                              </td>
                              <td className="px-8 py-4 text-sm text-gray-500">{student.date}</td>
                              <td className="px-8 py-4 text-right">
                                <button className="text-xs text-blue-600 font-bold hover:underline">查看详情</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                      <button onClick={() => setIsMatchedStudentsModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">关闭</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Ability Feedback Modal */}
              {isFeedbackModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-amber-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-amber-900">能力不足反馈</h3>
                        <p className="text-sm text-amber-700 mt-1">提交反馈后，平台将自动为实习生推送相关培训。</p>
                      </div>
                      <button onClick={() => setIsFeedbackModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45 text-amber-900" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">薄弱项描述</label>
                        <textarea 
                          rows={4}
                          placeholder="请详细描述实习生在工作中表现出的能力短板..."
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">建议加强的课程</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500/20 outline-none transition-all">
                          <option>由平台智能推荐</option>
                          {coursesData.map(course => (
                            <option key={course.id}>{course.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsFeedbackModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={() => setIsFeedbackModalOpen(false)}
                        className="px-6 py-2 bg-amber-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-200"
                      >
                        提交并推送培训
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Expansion Enterprise Modal */}
              {isExpEntModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">录入 / 维护企业信息</h3>
                        <p className="text-sm text-[#646D76] mt-1">标注企业岗位需求与期望技能。</p>
                      </div>
                      <button onClick={() => setIsExpEntModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">企业名称</label>
                          <input type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">所属行业</label>
                          <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                            <option>互联网 / 软件</option>
                            <option>金融 / 银行</option>
                            <option>电子商务</option>
                            <option>人工智能</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">实习岗位需求数</label>
                          <input type="number" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">正式岗位需求数</label>
                          <input type="number" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">期望技能标签</label>
                        <div className="flex flex-wrap gap-2">
                          {['5G', 'Python', 'Go', 'Ceph', 'BGP', 'Cloud Native', 'Big Data'].map(skill => (
                            <label key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                              <input type="checkbox" className="w-3 h-3 rounded border-gray-300 text-blue-600" />
                              <span className="text-xs">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsExpEntModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={() => setIsExpEntModalOpen(false)}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        保存企业信息
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Student Entry Modal */}
              {isStuModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">录入 / 维护学生信息</h3>
                        <p className="text-sm text-[#646D76] mt-1">打能力标签、标记优势 / 薄弱项。</p>
                      </div>
                      <button onClick={() => setIsStuModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">学生姓名</label>
                          <input type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">学号</label>
                          <input type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">能力标签</label>
                        <div className="flex flex-wrap gap-2">
                          {['5G', 'Ceph', 'BGP', 'PyTorch', '算法'].map(tag => (
                            <label key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                              <input type="checkbox" className="w-3 h-3 rounded border-gray-300 text-blue-600" />
                              <span className="text-xs">{tag}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">优势项</label>
                          <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#646D76] uppercase">薄弱项</label>
                          <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsStuModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={() => setIsStuModalOpen(false)}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        保存信息
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Initial Assessment Modal */}
              {isAssessmentModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-blue-900">发起初始能力测评</h3>
                        <p className="text-sm text-blue-700 mt-1">测评报告将自动同步至学生资源池。</p>
                      </div>
                      <button onClick={() => setIsAssessmentModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45 text-blue-900" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">选择测评学生</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                          {students.slice(0, 5).map(s => (
                            <option key={s.id}>{s.name} ({s.id})</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">测评维度</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['基础理论', '编程实操', '逻辑思维', '沟通表达'].map(dim => (
                            <label key={dim} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                              <span className="text-sm">{dim}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsAssessmentModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={() => setIsAssessmentModalOpen(false)}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        开始测评
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Recommend Job to Student Modal */}
              {isRecommendJobModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-blue-900">推荐岗位给学生</h3>
                        <p className="text-sm text-blue-700 mt-1">选择一名学生推荐该岗位：{selectedJobToRecommend?.title}</p>
                      </div>
                      <button onClick={() => setIsRecommendJobModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45 text-blue-900" />
                      </button>
                    </div>
                    <div className="p-0 max-h-[60vh] overflow-y-auto">
                      <table className="w-full text-left">
                        <thead className="sticky top-0 bg-gray-50 z-10">
                          <tr className="text-[#646D76] text-xs uppercase tracking-wider">
                            <th className="px-8 py-4 font-semibold">学生姓名</th>
                            <th className="px-8 py-4 font-semibold">学校 / 专业</th>
                            <th className="px-8 py-4 font-semibold">匹配度 (预估)</th>
                            <th className="px-8 py-4 font-semibold text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {students.slice(0, 10).map(stu => (
                            <tr key={stu.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-8 py-4 text-sm font-bold">{stu.name}</td>
                              <td className="px-8 py-4 text-sm text-gray-500">{stu.school} · {stu.major}</td>
                              <td className="px-8 py-4">
                                <span className="text-sm font-bold text-blue-600">85%</span>
                              </td>
                              <td className="px-8 py-4 text-right">
                                <button 
                                  onClick={() => handleRecommendJobToStudent(stu.id)}
                                  className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                                >
                                  确认推荐
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                      <button onClick={() => setIsRecommendJobModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Interview Feedback Modal */}
              {isInterviewFeedbackModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-blue-900">反馈面试结果</h3>
                        <p className="text-sm text-blue-700 mt-1">请提交该候选人的面试结果及评价。</p>
                      </div>
                      <button onClick={() => setIsInterviewFeedbackModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45 text-blue-900" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">面试结果</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['通过', '淘汰'].map(res => (
                            <button
                              key={res}
                              onClick={() => setFeedbackResult(res)}
                              className={cn(
                                "py-3 rounded-xl text-sm font-bold border transition-all",
                                feedbackResult === res 
                                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200" 
                                  : "bg-white text-[#1A1C1E] border-[#E1E3E6] hover:bg-gray-50"
                              )}
                            >
                              {res}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">详细评价 (可选)</label>
                        <textarea 
                          rows={4}
                          placeholder="请输入面试评价..."
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsInterviewFeedbackModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={handleInterviewFeedbackSubmit}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        提交反馈
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Assign Teacher Modal */}
              {isAssignTeacherModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-gray-900">分配跟进老师</h3>
                        <p className="text-sm text-[#646D76] mt-1">指定一名老师负责该学生的实习就业跟进。</p>
                      </div>
                      <button onClick={() => setIsAssignTeacherModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#646D76] uppercase">选择老师</label>
                        <select 
                          value={assignedTeacher}
                          onChange={(e) => setAssignedTeacher(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        >
                          <option value="">请选择老师</option>
                          <option value="李老师">李老师 (就业办)</option>
                          <option value="王老师">王老师 (校企合作部)</option>
                          <option value="张老师">张老师 (学生处)</option>
                          <option value="赵老师">赵老师 (辅导员)</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsAssignTeacherModalOpen(false)} className="px-6 py-2 bg-white border border-[#E1E3E6] text-sm font-bold rounded-xl">取消</button>
                      <button 
                        onClick={handleAssignTeacher}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200"
                      >
                        确认分配
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Student Score Update Modal */}
              {isStuScoreModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                    <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
                      <h3 className="text-lg font-bold">维护学生评分 - {selectedStudent.name}</h3>
                      <button onClick={() => setIsStuScoreModalOpen(false)}>
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
                        setIsStuScoreModalOpen(false);
                      }}
                      className="p-6 space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#646D76]">学历评分</label>
                          <input name="education" type="number" defaultValue={selectedStudent.scoreBreakdown?.education} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#646D76]">证书评分</label>
                          <input name="certificates" type="number" defaultValue={selectedStudent.scoreBreakdown?.certificates} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#646D76]">成绩评分</label>
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
                        <button type="button" onClick={() => setIsStuScoreModalOpen(false)} className="flex-1 py-2 bg-gray-100 text-sm font-bold rounded-xl">取消</button>
                        <button type="submit" className="flex-1 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200">保存更新</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Job Score Update Modal */}
              {isJobScoreModalOpen && selectedJob && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
                    <div className="p-6 bg-orange-600 text-white flex justify-between items-center">
                      <h3 className="text-lg font-bold">修改岗位评分</h3>
                      <button onClick={() => setIsJobScoreModalOpen(false)}>
                        <Plus className="w-6 h-6 rotate-45" />
                      </button>
                    </div>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        updateJobScore(selectedJob.id, Number(formData.get('score')));
                        setIsJobScoreModalOpen(false);
                      }}
                      className="p-6 space-y-4"
                    >
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#646D76]">岗位评分 (0-100)</label>
                        <input name="score" type="number" defaultValue={selectedJob.score} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20" />
                      </div>
                      <div className="pt-4 flex gap-3">
                        <button type="button" onClick={() => setIsJobScoreModalOpen(false)} className="flex-1 py-2 bg-gray-100 text-sm font-bold rounded-xl">取消</button>
                        <button type="submit" className="flex-1 py-2 bg-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-200">保存</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Enterprise Score Update Modal */}
              {isEntScoreModalOpen && selectedEnterprise && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
                    <div className="p-6 bg-orange-600 text-white flex justify-between items-center">
                      <h3 className="text-lg font-bold">修改企业评分</h3>
                      <button onClick={() => setIsEntScoreModalOpen(false)}>
                        <Plus className="w-6 h-6 rotate-45" />
                      </button>
                    </div>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        updateEnterpriseScore(selectedEnterprise.id, Number(formData.get('score')));
                        setIsEntScoreModalOpen(false);
                      }}
                      className="p-6 space-y-4"
                    >
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#646D76]">企业评分 (0-100)</label>
                        <input name="score" type="number" defaultValue={selectedEnterprise.score} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20" />
                      </div>
                      <div className="pt-4 flex gap-3">
                        <button type="button" onClick={() => setIsEntScoreModalOpen(false)} className="flex-1 py-2 bg-gray-100 text-sm font-bold rounded-xl">取消</button>
                        <button type="submit" className="flex-1 py-2 bg-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-200">保存</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <LayoutDashboard className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{activeTab} 页面正在开发中</h2>
                <p className="text-[#646D76]">此模块的功能将在后续版本中上线。</p>
              </div>
              <button 
                onClick={() => setActiveTab('Dashboard')}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium"
              >
                返回控制台
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

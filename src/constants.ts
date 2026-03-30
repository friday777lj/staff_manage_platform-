/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Building2, 
  Briefcase, 
  UserCheck, 
  Search, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Target, 
  Clock,
  Activity,
  Database,
  LayoutDashboard,
  Settings,
  FileText,
  History,
  BarChart
} from 'lucide-react';
import { Stat, RiskWarning, ChartData, Student, Job, Enterprise, Match, Intern, Course, Certification, OperationLog, HealthMetric } from './types';

export const stats: Stat[] = [
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

export const riskWarnings: RiskWarning[] = [
  { label: '高风险实习生', count: 12, color: 'text-red-600', bg: 'bg-red-50', tab: '实习生管理' },
  { label: '能力预警实习生', count: 18, color: 'text-orange-600', bg: 'bg-orange-50', tab: '实习生管理' },
  { label: '需关注实习生', count: 28, color: 'text-amber-600', bg: 'bg-amber-50', tab: '实习生管理' },
  { label: '未解决匹配问题', count: 15, color: 'text-blue-600', bg: 'bg-blue-50', tab: '人岗匹配' },
];

export const weeklyTrendData: ChartData[] = [
  { name: '周一', recommended: 45, placed: 12 },
  { name: '周二', recommended: 52, placed: 18 },
  { name: '周三', recommended: 48, placed: 15 },
  { name: '周四', recommended: 61, placed: 22 },
  { name: '周五', recommended: 55, placed: 20 },
  { name: '周六', recommended: 32, placed: 8 },
  { name: '周日', recommended: 28, placed: 5 },
];

export const growthTrendData: ChartData[] = [
  { month: '1月', rate: 65 },
  { month: '2月', rate: 68 },
  { month: '3月', rate: 75 },
  { month: '4月', rate: 72 },
  { month: '5月', rate: 80 },
  { month: '6月', rate: 85 },
];

export const trainingTrendData: ChartData[] = [
  { month: '1月', completion: 65, cert: 58 },
  { month: '2月', completion: 72, cert: 62 },
  { month: '3月', completion: 78, cert: 70 },
  { month: '4月', completion: 75, cert: 68 },
  { month: '5月', completion: 82, cert: 75 },
  { month: '6月', completion: 85, cert: 78 },
];

export const healthChartData: ChartData[] = [
  { week: 'W1', syncRate: 98.5, archiveRate: 92.4, solveRate: 88.2 },
  { week: 'W2', syncRate: 99.1, archiveRate: 94.1, solveRate: 91.5 },
  { week: 'W3', syncRate: 97.8, archiveRate: 91.8, solveRate: 89.4 },
  { week: 'W4', syncRate: 99.4, archiveRate: 95.6, solveRate: 93.1 },
];

export const schoolEmploymentTrend = [
  { month: '1月', rate: 65 },
  { month: '2月', rate: 68 },
  { month: '3月', rate: 75 },
  { month: '4月', rate: 72 },
  { month: '5月', rate: 80 },
  { month: '6月', rate: 85 },
];

export const majorEmploymentData = [
  { major: '通信工程', count: 450 },
  { major: '计算机科学', count: 380 },
  { major: '人工智能', count: 320 },
  { major: '网络安全', count: 280 },
  { major: '软件工程', count: 240 },
];

export const enterpriseDistributionData = [
  { name: '互联网', value: 45 },
  { name: '金融', value: 20 },
  { name: '制造', value: 15 },
  { name: '教育', value: 10 },
  { name: '其他', value: 10 },
];

export const matchEfficiencyData = [
  { day: '周一', efficiency: 82, target: 80 },
  { day: '周二', efficiency: 85, target: 80 },
  { day: '周三', efficiency: 78, target: 80 },
  { day: '周八', efficiency: 90, target: 80 },
  { day: '周五', efficiency: 88, target: 80 },
];

export const internPerformanceData = [
  { name: '陈小明', score: 95 },
  { name: '林静', score: 88 },
  { name: '王大力', score: 75 },
  { name: '张美美', score: 82 },
];


export const getMenuItems = (activeTerminal: string) => {
  switch (activeTerminal) {
    case '企业端':
      return [
        { name: '数据概览', icon: LayoutDashboard },
        { name: '我的岗位', icon: Briefcase },
        { name: '我的实习生', icon: GraduationCap },
        { name: '培训认证', icon: BookOpen },
        { name: '技能点配置', icon: Settings },
      ];
    case '岗位拓展端':
      return [
        { name: '我的企业', icon: Building2 },
        { name: '我的岗位', icon: Briefcase },
        { name: '岗位跟进', icon: UserCheck },
      ];
    case '学生拓展端':
      return [
        { name: '我的学校', icon: Building2 },
        { name: '我的学生', icon: Users },
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
      ];
    case '学校端':
      return [
        { name: '实习概览', icon: LayoutDashboard },
        { name: '过程监控', icon: UserCheck },
        { name: '评分体系', icon: Award },
        { name: '数据可视化', icon: BarChart },
      ];
    default: // 管理端
      return [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: '企业资源池', icon: Building2 },
        { name: '岗位资源池', icon: Briefcase },
        { name: '学生资源池', icon: Users },
        { name: '人岗匹配', icon: UserCheck },
        { name: '实习生管理', icon: GraduationCap },
        { name: '培训认证', icon: BookOpen },
        { name: '数据中心', icon: History },
        { name: '运营管理', icon: Settings },
      ];
  }
};

export const studentsData: Student[] = [
  { 
    id: 'STU001', 
    name: '陈小明', 
    school: '北京邮电大学', 
    major: '通信工程', 
    grade: '大四', 
    status: '待面试',
    score: 88,
    gradeLevel: 'A',
    recommendationLimit: 3,
    recommendationsUsed: 1,
    recommendationLogs: [
      { jobId: 'JOB001', date: '2024-03-11', status: '面试中' }
    ],
    behaviorScore: 100,
    riskLevel: '低',
    penaltyHistory: [],
    historicalPerformanceWeight: 1.0,
    skillTags: ['5G', '无线网优', 'Python'],
    improvementHistory: [],
    lastScoreUpdateTime: '2024-03-01',
    jobType: '实习',
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
    jobType: '实习',
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
    jobType: '正式',
    scoreBreakdown: {
      education: 80,
      certificates: 70,
      grades: 75,
      projects: 78,
      internships: 72
    }
  },
];

export const jobsData: Job[] = [
  { 
    id: 'JOB001', 
    title: '通信前台工程师', 
    company: '华为', 
    location: '深圳', 
    salary: '300-500/天', 
    type: '技术', 
    roleType: '实习', 
    status: '热招中',
    score: 95,
    description: '负责 5G 基站现场调试与网络优化...',
    requirements: ['熟悉 5G NR 协议', '具备路测分析能力'],
    skills: ['5G', '无线网优', '路测'],
    requiredSkills: ['5G', '无线网优'],
    postedDate: '2024-03-10'
  },
  { 
    id: 'JOB002', 
    title: '存储工程师', 
    company: '浪潮信息', 
    location: '济南', 
    salary: '250-400/天', 
    type: '技术', 
    roleType: '实习', 
    status: '热招中',
    score: 92,
    description: '负责分布式存储系统架构设计与维护...',
    requirements: ['熟悉 Ceph/HDFS', '了解 NVMe 协议'],
    skills: ['分布式存储', 'Linux', 'RAID'],
    requiredSkills: ['分布式存储', 'Linux'],
    postedDate: '2024-03-08'
  },
  { 
    id: 'JOB003', 
    title: '数通工程师', 
    company: '新华三', 
    location: '杭州', 
    salary: '25k-45k', 
    type: '技术', 
    roleType: '正式', 
    status: '热招中',
    score: 90,
    description: '负责大型园区网络架构设计与安全防护...',
    requirements: ['精通 OSPF/BGP', '熟悉防火墙配置'],
    skills: ['路由交换', '网络安全', 'SDN'],
    requiredSkills: ['路由交换', '网络安全'],
    postedDate: '2024-03-11'
  },
  { 
    id: 'JOB004', 
    title: '软件开发工程师', 
    company: '腾讯', 
    location: '深圳', 
    salary: '25k-45k', 
    type: '技术', 
    roleType: '正式', 
    status: '热招中',
    score: 88,
    description: '负责腾讯云核心组件开发...',
    requirements: ['Java/Go 基础扎实', '熟悉分布式系统'],
    skills: ['Go', 'K8s', 'Docker'],
    requiredSkills: ['Go', 'K8s'],
    postedDate: '2024-03-05'
  },
  { 
    id: 'JOB005', 
    title: 'AI应用开发工程师', 
    company: '百度', 
    location: '北京', 
    salary: '30k-60k', 
    type: '技术', 
    roleType: '正式', 
    status: '热招中',
    score: 94,
    description: '负责大模型应用层开发与优化...',
    requirements: ['熟悉深度学习框架', '了解模型部署'],
    skills: ['PyTorch', 'NLP', 'LLM'],
    requiredSkills: ['PyTorch', 'LLM'],
    postedDate: '2024-03-01'
  },
  { 
    id: 'JOB006', 
    title: '硬件测试', 
    company: '中兴通讯', 
    location: '深圳', 
    salary: '15k-25k', 
    type: '技术', 
    roleType: '正式', 
    status: '热招中',
    score: 85,
    description: '负责通信设备硬件信号完整性测试...',
    requirements: ['熟练使用示波器', '了解 EMC 规范'],
    skills: ['硬件测试', 'EMC', '示波器'],
    requiredSkills: ['硬件测试', '示波器'],
    postedDate: '2024-03-09'
  },
];

export const enterprisesData: Enterprise[] = [
  { 
    id: 'ENT001', 
    name: '华为技术', 
    industry: 'ICT/通信', 
    size: '10000人以上', 
    location: '深圳', 
    status: '合作中',
    score: 98,
    internshipDemand: 150,
    contact: '王经理',
    phone: '138****8888',
    lastFollowUp: '2024-03-10'
  },
  { 
    id: 'ENT002', 
    name: '中兴通讯', 
    industry: 'ICT/通信', 
    size: '10000人以上', 
    location: '深圳', 
    status: '合作中',
    score: 95,
    internshipDemand: 120,
    contact: '李经理',
    phone: '139****9999',
    lastFollowUp: '2024-03-11'
  },
  { 
    id: 'ENT003', 
    name: '新华三', 
    industry: 'ICT/数通', 
    size: '10000人以上', 
    location: '杭州', 
    status: '合作中',
    score: 94,
    internshipDemand: 200,
    contact: '张经理',
    phone: '137****7777',
    lastFollowUp: '2024-03-05'
  },
  { 
    id: 'ENT004', 
    name: '浪潮信息', 
    industry: 'ICT/存储', 
    size: '10000人以上', 
    location: '济南', 
    status: '考察中',
    score: 90,
    internshipDemand: 80,
    contact: '赵经理',
    phone: '136****6666',
    lastFollowUp: '2024-03-01'
  },
  { 
    id: 'ENT005', 
    name: '百度', 
    industry: 'AI/人工智能', 
    size: '10000人以上', 
    location: '北京', 
    status: '合作中',
    score: 92,
    internshipDemand: 100,
    contact: '孙经理',
    phone: '135****5555',
    lastFollowUp: '2024-03-09'
  },
];

export const matchesData: Match[] = [
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
    studentId: 'STU005', 
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
    recommendationTime: '2024-03-09 08:30',
    attendedInterview: true,
    interviewResult: '面试通过',
    interviewTime: '2024-03-10 10:00',
    joined: true,
    joinTime: '2024-03-11',
    enterpriseRating: 5,
    studentBehavior: { noShow: false, rejected: false, reason: '-' }
  },
];

export const internsData: Intern[] = [
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
    diagnosisResult: '能力达标',
    pendingCoursesCount: 0,
    certStatus: '已认证',
    diagnosis: {
      weaknesses: ['文档规范性有待提高'],
      trainingRecords: [
        { name: '企业文化培训', status: '已完成', date: '2024-01-20' },
        { name: '通信安全规范', status: '已完成', date: '2024-01-25' }
      ],
      certificates: ['HCIA-5G 认证']
    },
    skillPointResults: [
      { id: 'SP001', name: '5G 基础理论', category: 'training', score: 95, targetScore: 80, status: '达标' },
      { id: 'SP002', name: 'Linux 系统操作', category: 'training', score: 88, targetScore: 80, status: '达标' },
      { id: 'SP003', name: '线上故障应急', category: 'internship', score: 85, targetScore: 80, status: '达标' },
      { id: 'SP004', name: '跨部门协作', category: 'internship', score: 90, targetScore: 80, status: '达标' },
      { id: 'SP005', name: '业务场景适配', category: 'internship', score: 75, targetScore: 80, status: '未达标' },
    ],
    internshipTasks: [
      { id: 'TASK001', title: '参与分布式架构故障排查', description: '在导师指导下完成一次线上故障的定位与修复', status: '已完成', score: 90, feedback: '表现出色，定位准确', deadline: '2024-03-20' },
      { id: 'TASK002', title: '跨部门需求评审会', description: '作为技术代表参与一次跨部门需求评审', status: '进行中', deadline: '2024-03-28' },
    ],
    riskTags: ['进度领先']
  },
  { 
    id: 'INT002', 
    jobId: 'JOB002', 
    studentId: 'STU002', 
    name: '林静', 
    company: '浪潮信息', 
    position: '存储工程师', 
    owner: '王经理', 
    dailyRate: 88, 
    weeklyRate: 92, 
    exceptions: 1, 
    isOff: false, 
    offTime: '-', 
    result: '良好', 
    status: '正常', 
    riskLevel: '低', 
    isConverted: false, 
    joinDate: '2024-02-01', 
    completionRate: 75,
    diagnosisResult: '需补强',
    pendingCoursesCount: 2,
    certStatus: '认证中',
    diagnosis: {
      weaknesses: ['协议理解深度不足'],
      trainingRecords: [
        { name: '存储系统实战', status: '进行中', date: '2024-02-15' }
      ],
      certificates: []
    },
    skillPointResults: [
      { id: 'SP006', name: 'Ceph 架构原理', category: 'training', score: 65, targetScore: 80, status: '未达标' },
      { id: 'SP007', name: 'Python 脚本开发', category: 'training', score: 82, targetScore: 80, status: '达标' },
      { id: 'SP008', name: '大规模数据迁移', category: 'internship', score: 60, targetScore: 80, status: '未达标' },
    ],
    internshipTasks: [
      { id: 'TASK003', title: '存储集群扩容实战', description: '独立完成 3 个节点的扩容操作', status: '待评价', score: 0, deadline: '2024-03-25' },
    ],
    riskTags: ['技能待补强']
  },
];

export const terminals = ['管理端', '企业端', '岗位拓展端', '学生拓展端', '学生端', '学校端'];

export const coursesData: Course[] = [
  {
    id: 'CRS001',
    title: '5G NR 物理层深度解析',
    category: '通信技术',
    duration: '12小时',
    enrolled: 1200,
    rating: 4.8,
    instructor: '张老师',
    description: '深入浅出 5G NR 核心原理与物理层协议。',
    skills: ['5G', 'NR', 'Physical Layer']
  },
  {
    id: 'CRS002',
    title: '分布式存储系统实战',
    category: '存储技术',
    duration: '20小时',
    enrolled: 850,
    rating: 4.9,
    instructor: '李老师',
    description: '构建可扩展、高可用的分布式存储系统。',
    skills: ['Ceph', 'HDFS', 'Distributed Systems']
  }
];

export const certificationsData: Certification[] = [
  {
    id: 'CERT001',
    name: 'HCIA-5G 认证',
    category: '通信',
    issuer: '华为认证中心',
    validity: '永久',
    difficulty: '中等',
    description: '验证基础 5G 网络开发与优化能力。',
    requirements: ['完成 5G 基础课程', '通过 5G 能力诊断']
  }
];

export const operationsData: OperationLog[] = [
  {
    id: 'LOG001',
    time: '2024-03-12 10:00:00',
    module: '人岗匹配',
    action: 'AI 自动推荐',
    operator: '系统',
    status: '成功',
    details: '为 STU001 推荐了 JOB003'
  }
];

export const healthMetricsData = [
  { label: 'CPU 使用率', value: '45%', status: '正常', icon: Activity },
  { label: '内存占用', value: '62%', status: '正常', icon: Database },
  { label: '接口延迟', value: '120ms', status: '正常', icon: Clock },
];

export const learningTasksData = [
  { id: 'LT001', title: '参与分布式架构故障排查', student: '陈小明', mentor: '张经理', status: '已完成', score: 90, deadline: '2024-03-20' },
  { id: 'LT002', title: '跨部门需求评审会', student: '陈小明', mentor: '张经理', status: '进行中', deadline: '2024-03-28' },
  { id: 'LT003', title: '存储集群扩容实战', student: '林静', mentor: '王经理', status: '待评价', deadline: '2024-03-25' },
];

export const assessmentsData = [
  { id: 'AS001', student: '陈小明', score: 88, strengths: ['技术基础扎实', '沟通能力强'], weaknesses: ['文档规范性有待提高'], date: '2024-03-15' },
  { id: 'AS002', student: '林静', score: 75, strengths: ['学习态度认真'], weaknesses: ['协议理解深度不足', '实操经验欠缺'], date: '2024-03-10' },
];

export const platformLoadData: HealthMetric[] = [
  { time: '10:00', load: 45, concurrency: 500 },
  { time: '11:00', load: 55, concurrency: 800 },
  { time: '12:00', load: 40, concurrency: 400 },
];

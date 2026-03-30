import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-3-flash-preview";

export interface StudentInfo {
  name: string;
  school: string;
  major: string;
  grade: string;
  scoreBreakdown: {
    education: number;
    certificates: number;
    grades: number;
    projects: number;
    internships: number;
  };
}

export interface ScoreOutput {
  score: number;
  grade: string;
  explanation: string;
}

export interface FailureReasonInput {
  interviewRecord: string;
  enterpriseFeedback: string;
  studentBehavior: string;
}

export interface FailureReasonOutput {
  reasons: {
    reason: string;
    description: string;
    weight: number;
  }[];
  summary: string;
}

export interface LearningPathInput {
  weaknesses: string[];
}

export interface Course {
  id: string;
  title: string;
  skillImproved: string;
  scoreIncrease: number;
}

export interface LearningPathOutput {
  recommendedCourses: Course[];
  improvementSuggestions: string[];
}

/**
 * AI 能力模块 - 独立服务
 */
export const generateStudentScore = async (student: StudentInfo): Promise<ScoreOutput> => {
  const response = await ai.models.generateContent({
    model,
    contents: `请根据以下学生信息生成综合评分、等级（A/B/C）及评分说明：
    学生：${student.name}
    学校：${student.school}
    专业：${student.major}
    年级：${student.grade}
    评分维度：
    - 教育背景：${student.scoreBreakdown.education}
    - 证书：${student.scoreBreakdown.certificates}
    - 成绩：${student.scoreBreakdown.grades}
    - 项目：${student.scoreBreakdown.projects}
    - 实习：${student.scoreBreakdown.internships}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "综合评分 (0-100)" },
          grade: { type: Type.STRING, description: "等级 (A/B/C)" },
          explanation: { type: Type.STRING, description: "评分详细说明" },
        },
        required: ["score", "grade", "explanation"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const analyzeFailureReason = async (input: FailureReasonInput): Promise<FailureReasonOutput> => {
  const response = await ai.models.generateContent({
    model,
    contents: `请分析面试失败的原因并按影响权重排序：
    面试记录：${input.interviewRecord}
    企业反馈：${input.enterpriseFeedback}
    学生行为：${input.studentBehavior}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasons: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                reason: { type: Type.STRING, description: "原因简述" },
                description: { type: Type.STRING, description: "详细描述" },
                weight: { type: Type.NUMBER, description: "影响权重 (0-1)" },
              },
              required: ["reason", "description", "weight"],
            },
          },
          summary: { type: Type.STRING, description: "总体分析总结" },
        },
        required: ["reasons", "summary"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const recommendLearningPath = async (input: LearningPathInput): Promise<LearningPathOutput> => {
  const response = await ai.models.generateContent({
    model,
    contents: `根据学生的评分短板，推荐学习课程和提升建议：
    短板：${input.weaknesses.join(", ")}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedCourses: {
            type: Type.ARRAY,
            items: { 
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                skillImproved: { type: Type.STRING },
                scoreIncrease: { type: Type.NUMBER },
              },
              required: ["id", "title", "skillImproved", "scoreIncrease"],
            },
            description: "推荐课程列表",
          },
          improvementSuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "具体的提升建议",
          },
        },
        required: ["recommendedCourses", "improvementSuggestions"],
      },
    },
  });

  return JSON.parse(response.text);
};

// Aliases for App.tsx compatibility
export const analyzeScore = async (student: any): Promise<string> => {
  const result = await generateStudentScore(student);
  return `评分: ${result.score}\n等级: ${result.grade}\n说明: ${result.explanation}`;
};

export const analyzeFailure = async (match: any): Promise<string> => {
  const input: FailureReasonInput = {
    interviewRecord: match.interviewResult || "无记录",
    enterpriseFeedback: match.failReason || "无反馈",
    studentBehavior: match.studentBehavior?.reason || "无异常行为"
  };
  const result = await analyzeFailureReason(input);
  return `总结: ${result.summary}\n主要原因: ${result.reasons.map(r => r.reason).join(", ")}`;
};

export const analyzePath = async (student: any, job?: any): Promise<string> => {
  const input: LearningPathInput = {
    weaknesses: student.diagnosis?.weaknesses || ["专业技能"]
  };
  const result = await recommendLearningPath(input);
  return `建议: ${result.improvementSuggestions.join("\n")}\n推荐课程: ${result.recommendedCourses.map(c => c.title).join(", ")}`;
};

export const aiService = {
  generateStudentScore,
  analyzeFailureReason,
  recommendLearningPath,
  analyzeScore,
  analyzeFailure,
  analyzePath
};

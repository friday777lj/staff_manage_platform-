/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Student, Job } from './types';

/**
 * Utility for tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatePriorityScore = (student: Student, job: Job) => {
  let score = student.score;
  
  // Role type bonus
  if (student.jobType === job.roleType) score += 10;
  
  // Skill match bonus
  const matchingSkills = student.skillTags.filter(skill => job.requiredSkills.includes(skill));
  score += matchingSkills.length * 5;
  
  // Risk penalty
  if (student.riskLevel === '高') score -= 30;
  if (student.riskLevel === '中') score -= 10;
  
  return Math.min(100, Math.max(0, score));
};

export const getFilterReason = (student: Student, job: Job) => {
  if (student.riskLevel === '高') return '高风险学生拦截';
  if (student.jobType !== job.roleType) return '岗位类型不匹配';
  
  const matchingSkills = student.skillTags.filter(skill => job.requiredSkills.includes(skill));
  if (matchingSkills.length === 0) return '技能要求不符';
  
  return '-';
};

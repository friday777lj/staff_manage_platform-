/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../../utils';

interface RoleTagProps {
  type: string;
}

export const RoleTag: React.FC<RoleTagProps> = ({ type }) => (
  <span className={cn(
    "text-[10px] font-bold px-1.5 py-0.5 rounded ml-2 uppercase",
    type === '实习' ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
  )}>
    {type}
  </span>
);

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import DataOverview from './Enterprise/DataOverview';
import InternManagement from './Enterprise/InternManagement';
import SkillConfig from './Enterprise/SkillConfig';

interface EnterpriseTerminalProps {
  activeTab: string;
  growthTrendData: any[];
  trainingTrendData: any[];
  interns: any[];
  entInternJobFilter: string;
  setEntInternJobFilter: (filter: string) => void;
  entInternPerfFilter: string;
  setEntInternPerfFilter: (filter: string) => void;
  selectedInternDetail: any;
  setSelectedInternDetail: (intern: any) => void;
  setIsSkillConfigModalOpen: (open: boolean) => void;
}

export const EnterpriseTerminal: React.FC<EnterpriseTerminalProps> = ({
  activeTab,
  growthTrendData,
  trainingTrendData,
  interns,
  entInternJobFilter,
  setEntInternJobFilter,
  entInternPerfFilter,
  setEntInternPerfFilter,
  selectedInternDetail,
  setSelectedInternDetail,
  setIsSkillConfigModalOpen
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {activeTab === '数据概览' && (
        <DataOverview 
          growthTrendData={growthTrendData}
          trainingTrendData={trainingTrendData}
        />
      )}

      {activeTab === '我的实习生' && (
        <InternManagement 
          interns={interns}
          entInternJobFilter={entInternJobFilter}
          setEntInternJobFilter={setEntInternJobFilter}
          entInternPerfFilter={entInternPerfFilter}
          setEntInternPerfFilter={setEntInternPerfFilter}
          selectedInternDetail={selectedInternDetail}
          setSelectedInternDetail={setSelectedInternDetail}
        />
      )}

      {activeTab === '技能点配置' && (
        <SkillConfig 
          setIsSkillConfigModalOpen={setIsSkillConfigModalOpen}
        />
      )}
    </div>
  );
};

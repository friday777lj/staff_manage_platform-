import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Legend
} from 'recharts';

interface DataOverviewProps {
  growthTrendData: any[];
  trainingTrendData: any[];
}

const DataOverview: React.FC<DataOverviewProps> = ({ growthTrendData, trainingTrendData }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">企业数据概览</h2>
          <p className="text-[#646D76] mt-1">实时监控我司岗位需求与实习生培养进度。</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <p className="text-sm text-[#646D76] font-medium mb-2">岗位技能覆盖率</p>
          <p className="text-3xl font-bold">92.5%</p>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-blue-600 h-full rounded-full" style={{width: '92.5%'}} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <p className="text-sm text-[#646D76] font-medium mb-2">实习生能力达标率</p>
          <p className="text-3xl font-bold">78.2%</p>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-emerald-600 h-full rounded-full" style={{width: '78.2%'}} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <p className="text-sm text-[#646D76] font-medium mb-2">培训任务完成率</p>
          <p className="text-3xl font-bold">85.0%</p>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-amber-600 h-full rounded-full" style={{width: '85%'}} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <h3 className="font-bold mb-6">实习生能力成长趋势</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthTrendData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="rate" name="达标率" stroke="#10b981" fillOpacity={1} fill="url(#colorRate)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <h3 className="font-bold mb-6">培训完成率 / 认证通过率趋势</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="completion" name="完成率" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="passRate" name="通过率" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataOverview;

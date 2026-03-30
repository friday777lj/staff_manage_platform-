import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, PieChart as RePieChart, 
  Pie, Cell, LineChart as ReLineChart, Line, Legend
} from 'recharts';
import { 
  schoolEmploymentTrend, majorEmploymentData, 
  enterpriseDistributionData, weeklyTrendData, matchEfficiencyData,
  internPerformanceData
} from '../../constants';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">数据可视化中心</h2>
          <p className="text-[#646D76] mt-1">深度分析平台运营效率、就业趋势与人才画像。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <h3 className="font-bold mb-6">院校就业率趋势 (近6个月)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={schoolEmploymentTrend}>
                <defs>
                  <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="rate" name="就业率" stroke="#2563eb" fillOpacity={1} fill="url(#colorEmp)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <h3 className="font-bold mb-6">热门专业就业分布</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={majorEmploymentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F3F5" />
                <XAxis type="number" hide />
                <YAxis dataKey="major" type="category" axisLine={false} tickLine={false} tick={{fill: '#1A1C1E', fontSize: 12}} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" name="就业人数" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <h3 className="font-bold mb-6">企业行业分布</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={enterpriseDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {enterpriseDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="bottom" height={36}/>
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E1E3E6] shadow-sm">
          <h3 className="font-bold mb-6">匹配效率分析 (本周)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={matchEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#646D76', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="top" align="right" iconType="circle" />
                <Line type="monotone" dataKey="efficiency" name="匹配效率" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="target" name="目标值" stroke="#E1E3E6" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

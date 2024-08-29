import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "13/05/24",
    request: 12,
    earning: 2400
  },
  {
    name: "14/05/24",
    request: 2,
    earning: 1398
  },
  {
    name: "15/05/24",
    request: 6,
    earning: 9800
  },
  {
    name: "16/05/24",
    request: 19,
    earning: 3908
  },
  {
    name: "17/05/24",
    request: 4,
    earning: 4800
  },
  {
    name: "18/05/24",
    request: 12,
    earning: 3800
  },
  {
    name: "19/05/24",
    request: 12,
    earning: 4300
  },
];
const Chart = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="request"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="earning"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
         
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;

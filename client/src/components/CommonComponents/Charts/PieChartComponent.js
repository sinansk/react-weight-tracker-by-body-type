import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import { useMediaQuery } from "../../../utils/useMediaQuery";

const PieChartComponent = ({ data, haveLabel = true }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const customTooltipFormatter = (value, name, entry) => {
    // `value` verisi isteğe bağlı olarak özelleştirilebilir
    const formattedValue = parseFloat(value).toFixed(2) + "g";
    return [`${formattedValue}`, entry.payload.name];
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (!data) {
    return null
  }
  return (
    <div className="flex flex-col items-center mx-auto w-fit">
      <PieChart width={isMobile ? 150 : 200} height={isMobile ? 150 : 200}>
        <Pie
          data={data}
          cx={isMobile ? 75 : 100}
          cy={isMobile ? 75 : 100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={isMobile ? 60 : 80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}

        </Pie>
        <Tooltip formatter={customTooltipFormatter} />
      </PieChart>

      <div className="flex items-center gap-3 mx-auto mt-auto">
        {haveLabel ?
          data.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-gray-200">{item.name}</span>
            </div>
          ))
          : (
            <div className="h-6"></div>
          )

        }

      </div>

    </div>

  );
}

export default PieChartComponent
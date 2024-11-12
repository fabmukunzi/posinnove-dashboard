import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MyChart: React.FC = () => {
  const data: ChartData<'line'> = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Project',
        data: [12, 20, 100, 10, 45, 17, 100, 40, 17, 100, 40, 10],
        borderColor: 'rgba(0, 123, 255, 1)',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(0, 123, 255, 0.459)');
          gradient.addColorStop(1, 'rgba(255, 193, 7, 0)');
          return gradient;
        },
        fill: 'origin',
      },
      {
        label: 'User',
        data: [100, 30, 40, 50, 60, 70, 80, 90, 17, 70, 30, 20],
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(40, 167, 70, 0.454)');
          gradient.addColorStop(1, 'rgba(255, 193, 7, 0)');
          return gradient;
        },
        fill: 'origin',
      },
      {
        label: 'Subscribers',
        data: [20, 5, 45, 30, 65, 75, 85, 95, 1, 10, 70, 10],
        borderColor: 'rgba(255, 193, 7, 1)',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(255, 193, 7, 0.532)');
          gradient.addColorStop(1, 'rgba(255, 193, 7, 0)');
          return gradient;
        },
        fill: 'origin',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    plugins: {
      filler: {
        propagate: false,
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: false,
        },
      },
    },
    interaction: {
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[70vh] w-full bg-white rounded-2xl">
      <Line data={data} options={options} className="w-full p-4" />
    </div>
  );
};

export default MyChart;

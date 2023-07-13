import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const TasksChart = ({ tasksData }) => {
  const chartRef = useRef(null);
  let chart;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Create the chart
    const createChart = () => {
      const labels = tasksData.map((data) => data.label);
      const assignedData = tasksData.map((data) => data.assigned);
      const completedData = tasksData.map((data) => data.completed);

      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Assigned',
              data: assignedData,
              backgroundColor: '#4F46E5',
            },
            {
              label: 'Completed',
              data: completedData,
              backgroundColor: '#27AE60',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
              precision: 0,
            },
          },
        },
      });
    };

    const resizeChart = () => {
      if (chart) {
        chart.destroy();
      }
      createChart();
    };

    createChart();

    // Update the chart on window resize
    window.addEventListener('resize', resizeChart);

    // Destroy the chart when the component unmounts
    return () => {
      window.removeEventListener('resize', resizeChart);
      if (chart) {
        chart.destroy();
      }
    };
  }, [tasksData]);

  return (
    <div className="bg-white container rounded-lg shadow-md p-4">
      <h2 className="text-lg text-black font-semibold mb-2">Tasks Overview</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default TasksChart;

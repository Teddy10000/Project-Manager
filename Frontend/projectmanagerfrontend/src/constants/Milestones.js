import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale } from 'chart.js';
import { BarController, BarElement, Title } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title);

const MilestonesChart = ({ milestonesData }) => {
  const chartRef = useRef(null);
  let chart;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Create the chart
    const createChart = () => {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: milestonesData.map((data) => data.projectName),
          datasets: [
            {
              label: 'Progress',
              data: milestonesData.map((data) => data.progress),
              backgroundColor: '#4F46E5',
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          scales: {
            x: {
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
  }, [milestonesData]);

  return (
    <div className="bg-white max-w-md rounded-lg shadow-md p-4">
      <h2 className="text-lg text-black font-semibold mb-2">Milestones Reached</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MilestonesChart;


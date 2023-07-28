import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProjectSummaryChart = () => {
  const piechartRef = useRef(null);
  let piechart;

  useEffect(() => {
    const ctx = piechartRef.current.getContext('2d');

    // Create the chart
    const createChart = () => {
      piechart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Projects in Progress', 'Completed Projects', 'Upcoming Projects'],
          datasets: [
            {
              label: 'Projects',
              data: [8, 15, 5],
              backgroundColor: ['#4F46E5', '#34D399', '#F43F5E'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    };

    const resizeChart = () => {
      if (piechart) {
        piechart.destroy();
      }
      createChart();
    };

    createChart();

    // Update the chart on window resize
    window.addEventListener('resize', resizeChart);

    // Destroy the chart when the component unmounts
    return () => {
      window.removeEventListener('resize', resizeChart);
      if (piechart) {
        piechart.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white max-w-md  shadow-md p-4">
      <h2 className="text-lg text-black font-semibold mb-2">Project Summary</h2>
      <canvas ref={piechartRef} />
    </div>
  );
};

export default ProjectSummaryChart;


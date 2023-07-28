import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { LinearScale } from 'chart.js';
import { BarController } from 'chart.js';
import { CategoryScale } from 'chart.js';
import { BarElement } from 'chart.js';

Chart.register(BarElement);

Chart.register(CategoryScale);

Chart.register(BarController);

Chart.register(LinearScale);

const TotalTasksChart = ({ totalTasks }) => {
    const chartRef = useRef(null);
  let chart;
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
  
      // Create the chart
      const createChart = () => {   
       chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Tasks'],
          datasets: [
            {
              label: 'Tasks',
              data: [totalTasks],
              backgroundColor: '#4F46E5',
            },
          ],
        },
        options: {
            responsive:true,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
            }, 
      }); }
      const resizeChart = () => {
        if (chart) {
          chart.destroy();
        }
        createChart()
      };

      createChart()

      // Update the chart on window resize
      window.addEventListener('resize', resizeChart);
  
  
      // Destroy the chart when the component unmounts
      return () => {
        window.removeEventListener('resize', resizeChart);
        if (chart) {
          chart.destroy();
        }
      };
    }, [totalTasks]);
  
    return (
      <div className="bg-white rounded-lg  shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Total Tasks</h2>
        <canvas ref={chartRef} />
      </div>
    );
  };
  
  export default TotalTasksChart;

import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface DoughnutChartProps {
  percentage: number;
}

function DoughnutChart({ percentage }: DoughnutChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = chartRef.current?.getContext('2d');

    if (context) {
      const gradient = context.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(1, '#5d73e8');
      gradient.addColorStop(0, '#35dbe6');

      const chartInstance = new Chart(context, {
        type: 'doughnut',
        data: {
          labels: ['Achieved', 'Remaining'],
          datasets: [
            {
              label: 'Progress',
              data: [percentage, 100 - percentage],
              backgroundColor: [gradient, '#ffffff00'],
              borderWidth: 0,
              borderRadius: 30,
            },
          ],
        },
        options: {
          cutout: '60%',
          rotation: 180,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false, // 툴팁 비활성화
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
    return undefined;
  }, [percentage]);
  return (
    <div className='size-150 tablet:size-180 bg-background-tertiary rounded-full flex justify-center items-center'>
      <div className='absolute size-90 tablet:size-108 bg-background-secondary rounded-full'></div>
      <canvas className='absolute -scale-x-100' ref={chartRef}></canvas>
    </div>
  );
}

export default DoughnutChart;

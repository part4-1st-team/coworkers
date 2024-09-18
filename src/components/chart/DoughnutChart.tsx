// components/GradientCircularProgressbar.tsx
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DoughnutChart: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className='relative w-150 h-150'>
      <svg className='absolute w-0 h-0'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='var(--brand-tertiary)' />
            <stop offset='100%' stopColor='var(--brand-primary)' />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgressbar
        value={value}
        styles={buildStyles({
          pathColor: 'url(#gradient)',
          trailColor: 'var(--background-tertiary)',
          rotation: 0.25,
        })}
        strokeWidth={20}
      />
    </div>
  );
};

export default DoughnutChart;

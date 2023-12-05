import React, { SVGProps } from 'react';

export default function IconSchedule({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg width='24' height='25' viewBox='0 0 24 25' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <rect
        x='2'
        y='5.83325'
        width='20'
        height='16.6667'
        rx='2'
        stroke='white'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path d='M7.18359 2.5V5.83333' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M16.8164 2.5V5.83333' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M2 10.6484H22' stroke='white' strokeWidth='1.5' />
    </svg>
  );
}

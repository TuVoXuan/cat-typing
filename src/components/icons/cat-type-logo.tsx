import * as React from "react";
import { SVGProps } from "react";
const CatTypeLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={24}
    fill="none"
    viewBox="0 0 40 24"
    {...props}
  >
    <rect
      width={37}
      height={21}
      x={1.5}
      y={1.5}
      stroke="currentColor"
      strokeWidth={3}
      rx={5.5}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.5}
      d="M13.25 17.75h5.5M6.25 17.75h2.5M21 12h10"
    />
    <path
      fill="currentColor"
      d="M24.75 18a1.25 1.25 0 1 0 2.5 0h-2.5Zm2.5-4v-1.25h-2.5V14h2.5ZM26 18h1.25v-4h-2.5v4H26Z"
    />
    <circle cx={33.5} cy={17.5} r={1.5} fill="currentColor" />
    <circle cx={20.5} cy={6.5} r={1.5} fill="currentColor" />
    <circle cx={6.5} cy={6.5} r={1.5} fill="currentColor" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.5}
      d="M25.25 6.75h8.5"
    />
    <path
      fill="currentColor"
      d="M16.746 11.948c.696.48.887 1.456.226 1.983-.404.322-.858.58-1.347.763a4.859 4.859 0 0 1-3.009.126 4.922 4.922 0 0 1-2.519-1.675 5.057 5.057 0 0 1-.34-5.81 4.946 4.946 0 0 1 2.308-1.964 4.86 4.86 0 0 1 4.425.359c.72.445.645 1.438.01 1.997-.387.343-.979.28-1.438.04a2.453 2.453 0 0 0-2.07-.093 2.485 2.485 0 0 0-1.16.987 2.54 2.54 0 0 0 .17 2.92c.326.407.768.701 1.267.84a2.442 2.442 0 0 0 2.048-.342c.426-.294 1.004-.425 1.43-.131Z"
    />
  </svg>
);
export default CatTypeLogo;

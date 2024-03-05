import { animate } from 'framer-motion'
import { Code, LayoutTemplate, Shapes } from 'lucide-react';

export default function Heading() {
  const onMouseEnterInterfaces = (e: any) => {
    e.stopPropagation();
    animate([['#first', { y: -45, x: -40, rotateZ: '-10deg', opacity: 1 }, { type: 'spring', bounce: 0.5, duration: 0.5 }]]);
    animate([['#second', { y: 50, x: 20, rotateZ: '10deg', opacity: 1 }, { type: 'spring', bounce: 0.5, duration: 0.5 }]]);
  }

  const onMouseLeaveInterfaces = (e: any) => {
    e.stopPropagation();
    animate([['#first', { y: 0, x: 0, rotateZ: 0, opacity: 0 }, { duration: 0.25 }]]);
    animate([['#second', { y: 0, x: 0, rotateZ: 0, opacity: 0 }, { duration: 0.25 }]]);
  }

  const onMouseEnterSystems = (e: any) => {
    e.stopPropagation();
    animate([['#firstSystems', { y: 45, x: -20, rotateZ: '-10deg', opacity: 1 }, { type: 'spring', bounce: 0.5, duration: 0.5 }]]);
    animate([['#secondSystems', { y: -56, x: 20, rotateZ: '15deg', opacity: 1 }, { type: 'spring', bounce: 0.5, duration: 0.5 }]]);
  }

  const onMouseLeaveSystems = (e: any) => {
    e.stopPropagation();
    animate([['#firstSystems', { y: 0, x: 0, rotateZ: 0, opacity: 0 }, { duration: 0.25 }]]);
    animate([['#secondSystems', { y: 0, x: 0, rotateZ: 0, opacity: 0 }, { duration: 0.25 }]]);
  }

  return (
    <h1 className="font-display text-white font-bold text-4xl md:text-5xl lg:text-7xl inline relative">
      Construyo productos digitales.
      <div className="inline relative">
        <div id="first" className="absolute text-sm md:text-base font-sans bg-yellow-300 text-yellow-950 shadow-md top-0 mt-10 left-0 px-3 py-1 rounded-full opacity-0 hidden md:flex items-center gap-1 z-50">
          <Shapes size={16} strokeWidth={2.5} />
          <span className="inline">
            Visual Design
          </span>
        </div>
        <span
          onMouseEnter={onMouseEnterInterfaces}
          onMouseLeave={onMouseLeaveInterfaces}
          className="relative inline-block z-[9950] text-[#FFB3C0]"
        >
          Interfaces
        </span>.
        <div id="second" className="absolute text-sm md:text-base font-sans bg-blue-300 text-blue-950 shadow-md bottom-0 mb-5 right-0 px-3 py-1 rounded-full opacity-0 hidden md:flex items-center gap-1 z-50">
          <LayoutTemplate size={16} strokeWidth={2.5} />
          <span className="inline">
            Marketing Sites
          </span>
        </div>
      </div>
      <br />
      <div className="inline relative">
        <div id="firstSystems" className="absolute text-sm md:text-base font-sans bg-teal-300 text-teal-950 shadow-md bottom-0 mb-5 -ml-4 left-0 px-3 py-1 rounded-full opacity-0 hidden md:flex items-center gap-1 z-50">
          <Shapes size={16} strokeWidth={2.5} />
          <span className="inline">
            Software
          </span>
        </div>
        <span
          onMouseEnter={onMouseEnterSystems}
          onMouseLeave={onMouseLeaveSystems}
          className="relative inline-block z-[9950] text-[#FFA36F]"
        >
          Sistemas
        </span>.
        <div id="secondSystems" className="absolute text-sm md:text-base font-sans bg-indigo-300 text-indigo-950 shadow-md top-0 mt-10 md:mt-16 right-0 -mr-12 px-3 py-1 rounded-full opacity-0 hidden md:flex items-center gap-1 z-50 w-max">
          <Code size={16} strokeWidth={2.5} />
          <span className="inline-flex">
            Frontend/Backend
          </span>
        </div>
      </div>
    </h1>
  )
}
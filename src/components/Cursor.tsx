import { EyeIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

const OFFSET_CURSOR = 22;

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a');
    const cursor = document.getElementById('cursor') as HTMLDivElement;
    const cursorProject = document.getElementById('cursor-project') as HTMLDivElement;
    const footer = document.getElementById('footer') as HTMLDivElement;
    const services = document.getElementById('services') as HTMLDivElement;
    const projects = document.querySelectorAll<HTMLDivElement>('.project');
    cursor.style.transform = 'scale(1)';

    const onMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)';
    };

    const onMouseLeave = () => {
      cursor.style.transform = 'scale(1)';
    };

    const handleOnMouseMove = (event: MouseEvent) => {
      const position = { x: event.clientX, y: event.clientY };
      if (ref.current) {
        ref.current.style.transform = `translateX(${position.x - OFFSET_CURSOR}px) translateY(${position.y - OFFSET_CURSOR}px) translateZ(0px)`;
      }
    };

    const handleOnMouseEnter = () => {
      cursor.style.backgroundColor = 'rgba(0, 0, 0, .2)';
    }
    const handleOnMouseLeave = () => {
      cursor.style.backgroundColor = 'rgba(255, 179, 192, .2)';
    }

    document.addEventListener('mousemove', handleOnMouseMove);
    footer.addEventListener('mouseenter', handleOnMouseEnter);
    footer.addEventListener('mouseleave', handleOnMouseLeave);

    if (services) {
      services.addEventListener('mouseenter', handleOnMouseEnter);
      services.addEventListener('mouseleave', handleOnMouseLeave);
    }

    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnter);
      link.addEventListener('mouseleave', onMouseLeave)
    });

    const onMouseEnterProject = (event: MouseEvent) => {
      cursor.style.transform = 'scale(0)';
      cursorProject.style.transform = 'scale(1)';
      cursorProject.style.opacity = '1';
      document.body.style.cursor = 'none !important';
    }
    const onMouseLeaveProject = (event: MouseEvent) => {
      cursor.style.transform = 'scale(1)'
      cursorProject.style.transform = 'scale(0)';
      cursorProject.style.opacity = '0';
      document.body.style.cursor = 'default';
    }

    projects.forEach((project) => {
      project.addEventListener('mouseenter', onMouseEnterProject);
      project.addEventListener('mouseleave', onMouseLeaveProject);
    })

    return () => {
      document.removeEventListener('mousemove', handleOnMouseMove);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnter);
        link.removeEventListener('mouseleave', onMouseLeave);
      })
      footer.removeEventListener('mouseenter', () => {});
      footer.removeEventListener('mouseleave', () => {});
      services.removeEventListener('mouseenter', () => {});
      services.removeEventListener('mouseleave', () => {});
    }
  }, []);

  return (
    <div ref={ref} className="hidden md:block fixed top-0 left-0 z-[99999] pointer-events-none transition-all duration-[.3s] ease-[cubic-bezier(.075,.82,.165,1)] will-change-transform origin-[center_center]">
      <div id="cursor" className="absolute bg-[#FFB3C0]/20 w-10 h-10 rounded-full z-[9999] transform-none transition-all duration-[.3s] ease-[cubic-bezier(.075,.82,.165,1)]" />
      <div id="cursor-project" className="rounded-full -ml-[36px] -mt-[36px] text-white text-sm font-semibold flex items-center justify-center bg-black/85 backdrop-blur-md transform-none transition-all duration-[.4s] ease-[cubic-bezier(.325,.82,.350,1)] relative" style={{ transform: 'scale(0)', opacity: '0'}}>
        <svg className="animate-spinSlow duration-500" xmlns="http://www.w3.org/2000/svg" width={120} height={120} viewBox="0 0 243 243" fill="none">
          <circle cx="121.5" cy="121.5" r="121.5" fill="#000"/>
          <path fill="#fff" d="m113.16 208.06 6.05 20.81-4.4-.47-4.14-14.45-7.06 13.23-4.48-.49 10.41-19.02 3.62.4ZM92.79 203.41a7.49 7.49 0 0 1 4.43 3.64c.9 1.73 1 3.64.3 5.73a7.2 7.2 0 0 1-9.38 4.6 7.04 7.04 0 0 1-4.1-3.3c-.88-1.57-.97-3.4-.27-5.49.2-.58.36-1 .48-1.23l10 3.36c.19-.9.04-1.72-.45-2.44a4.27 4.27 0 0 0-2.17-1.53c-1.57-.53-2.9-.36-4.01.52l-2.05-2.95c2.05-1.54 4.45-1.84 7.22-.9Zm.5 9.76-6.27-2.11c-.1.82.08 1.52.51 2.1.42.59 1 1 1.73 1.24a4 4 0 0 0 2.26.1 2.73 2.73 0 0 0 1.76-1.33ZM78.64 197.57l-7.27 12.09-3.31-2 1.16-1.93a3.5 3.5 0 0 1-2.02.8c-.81.06-1.55-.12-2.23-.52a4.54 4.54 0 0 1-1.02-.82l2.02-3.36c.42.5.87.89 1.34 1.17.79.48 1.6.57 2.43.28.8-.28 1.51-.93 2.11-1.92l3.48-5.78 3.31 1.99ZM54.65 168.63l2.17 3.2-16.56 11.23-2.17-3.2 1.31-.89a4.4 4.4 0 0 1-2.01-.61 6.05 6.05 0 0 1-2.7-6.84 7.58 7.58 0 0 1 3.23-4.5 7.58 7.58 0 0 1 5.37-1.32 6.05 6.05 0 0 1 5.35 5.03c.1.81.04 1.51-.18 2.1l6.2-4.2Zm-8.8 5.18c.23-.95.04-1.87-.56-2.75a3.27 3.27 0 0 0-2.33-1.53c-.96-.14-1.9.1-2.84.74a3.92 3.92 0 0 0-1.74 2.37c-.23.93-.05 1.84.56 2.73.6.88 1.38 1.4 2.34 1.54.95.13 1.9-.12 2.83-.76a3.99 3.99 0 0 0 1.75-2.34ZM40.76 156.27l-13.11 5.22-1.43-3.59 2.1-.84a3.49 3.49 0 0 1-2.1-.59 3.65 3.65 0 0 1-1.45-1.76 4.53 4.53 0 0 1-.33-1.27L28.1 152c.03.66.15 1.24.36 1.74.34.86.93 1.42 1.76 1.7.82.26 1.77.18 2.85-.25l6.27-2.5 1.43 3.59ZM31.8 129.96a7.25 7.25 0 0 1 2.94 4.84 7.25 7.25 0 0 1-1.24 5.52 7.1 7.1 0 0 1-4.82 3 7.06 7.06 0 0 1-5.5-1.3 7.2 7.2 0 0 1-2.97-4.84 7.2 7.2 0 0 1 1.27-5.52 7.06 7.06 0 0 1 4.8-3 7.1 7.1 0 0 1 5.53 1.3Zm-.62 5.42a3.27 3.27 0 0 0-1.43-2.28 3.78 3.78 0 0 0-2.84-.56c-1.08.18-1.9.65-2.48 1.44-.6.76-.82 1.64-.66 2.62.17 1 .66 1.78 1.47 2.33.8.54 1.73.72 2.8.54a3.85 3.85 0 0 0 2.52-1.41 3.4 3.4 0 0 0 .62-2.68ZM39.26 117.06l-.22 4.2-6.52-3.33-13.62 5.2.23-4.22 9.33-3.29-8.93-4.24.24-4.25 19.5 9.93ZM36.87 97.02a7.49 7.49 0 0 1-3.4 4.62 7.05 7.05 0 0 1-5.7.61 7.2 7.2 0 0 1-5.11-9.12 7.04 7.04 0 0 1 3.09-4.27c1.52-.96 3.34-1.15 5.46-.56.6.16 1.02.3 1.26.4l-2.82 10.18c.91.14 1.72-.06 2.41-.6a4.27 4.27 0 0 0 1.42-2.23c.44-1.6.2-2.93-.74-3.99l2.83-2.2c1.65 1.96 2.08 4.35 1.3 7.16Zm-9.72 1.02 1.77-6.36a2.82 2.82 0 0 0-2.08.62 3.42 3.42 0 0 0-1.14 1.8 4 4 0 0 0 .02 2.25c.22.75.7 1.3 1.43 1.69ZM44.27 78.84a7.4 7.4 0 0 1-4.35 3.74c-1.91.6-3.8.4-5.66-.58a7.02 7.02 0 0 1-3.63-4.35 7.35 7.35 0 0 1 .62-5.7 7.22 7.22 0 0 1 2.85-2.97 7.2 7.2 0 0 1 3.88-1.04l.02 3.81a3.91 3.91 0 0 0-2.07.4c-.63.31-1.12.8-1.49 1.48-.47.9-.56 1.83-.25 2.78.31.93.94 1.65 1.9 2.15.94.5 1.89.62 2.84.36a3.44 3.44 0 0 0 2.15-1.77c.36-.68.49-1.37.39-2.06-.1-.71-.37-1.36-.83-1.94l3.17-2.12a7.4 7.4 0 0 1 .46 7.81ZM56.56 61.35a5.8 5.8 0 0 1-3.51 2.12c-1.32.2-2.61-.25-3.87-1.32l-4.41-3.75-1.85 2.17-2.58-2.19 1.85-2.17-3-2.54 2.51-2.95 2.99 2.54 2.58-3.03 2.58 2.2-2.58 3.03 3.83 3.25c.66.56 1.25.82 1.78.77.52-.05 1.05-.4 1.6-1.05.39-.46.67-.91.83-1.37l2.6 2.21a8.48 8.48 0 0 1-1.35 2.08ZM71.03 46.25c-.3 2-1.27 3.62-2.9 4.86a7.25 7.25 0 0 1-5.46 1.49 7.1 7.1 0 0 1-4.9-2.86 7.06 7.06 0 0 1-1.43-5.48 7.2 7.2 0 0 1 2.88-4.88 7.2 7.2 0 0 1 5.47-1.47 7.06 7.06 0 0 1 4.9 2.84 7.1 7.1 0 0 1 1.44 5.5Zm-5.08 1.98c.79-.6 1.24-1.38 1.34-2.33.1-.98-.17-1.9-.83-2.77a3.68 3.68 0 0 0-2.43-1.52 3.23 3.23 0 0 0-2.63.65 3.35 3.35 0 0 0-1.37 2.39c-.1.95.18 1.86.84 2.73a3.84 3.84 0 0 0 2.42 1.56 3.4 3.4 0 0 0 2.66-.7ZM101.47 30.4a3.74 3.74 0 0 1-2.88-.5 3.73 3.73 0 0 1-1.7-2.42 3.64 3.64 0 0 1 .53-2.9 3.7 3.7 0 0 1 2.4-1.68 3.73 3.73 0 0 1 2.92.52c.89.55 1.45 1.35 1.68 2.4a3.78 3.78 0 0 1-2.95 4.58ZM138.22 34.7l-3.77-21.35 4.33.95 2.54 14.8 8.45-12.38 4.41.97-12.4 17.79-3.56-.79ZM157.97 41.52a7.5 7.5 0 0 1-4.02-4.1 7.06 7.06 0 0 1 .32-5.73 7.2 7.2 0 0 1 9.83-3.57 7.04 7.04 0 0 1 3.71 3.74c.7 1.66.6 3.48-.32 5.48-.27.57-.47.96-.61 1.18l-9.58-4.43c-.29.88-.22 1.71.19 2.48.43.76 1.1 1.35 1.98 1.76 1.5.7 2.86.67 4.05-.09l1.72 3.16c-2.2 1.3-4.63 1.34-7.27.12Zm.56-9.75 6 2.77c.18-.8.09-1.52-.29-2.15a3.42 3.42 0 0 0-1.58-1.42 4 4 0 0 0-2.23-.35c-.78.1-1.4.48-1.9 1.15ZM171.4 48.86l8.53-11.24 3.08 2.34-1.36 1.8a3.5 3.5 0 0 1 2.1-.57c.8.03 1.52.28 2.15.76.39.3.7.6.93.92l-2.37 3.12a5.55 5.55 0 0 0-1.2-1.3 2.76 2.76 0 0 0-2.4-.55c-.83.2-1.6.76-2.3 1.69l-4.09 5.37-3.07-2.34ZM192.11 80.22l-1.8-3.41 17.67-9.38 1.81 3.42-1.4.74a4.4 4.4 0 0 1 1.94.83 6.05 6.05 0 0 1 1.94 7.09 7.58 7.58 0 0 1-3.69 4.12 7.58 7.58 0 0 1-5.49.74 6.05 6.05 0 0 1-4.77-5.58 4.4 4.4 0 0 1 .4-2.07l-6.6 3.5Zm9.3-4.2c-.31.92-.22 1.85.28 2.8.5.95 1.22 1.54 2.15 1.77.94.24 1.9.1 2.9-.43s1.66-1.25 1.98-2.16c.34-.9.25-1.83-.25-2.78a3.37 3.37 0 0 0-2.16-1.79 4 4 0 0 0-2.9.45 4 4 0 0 0-2 2.14ZM204.6 94.01l13.59-3.77 1.03 3.72-2.17.6c.73.05 1.4.33 2.01.82.63.51 1.05 1.15 1.26 1.9.13.48.2.91.19 1.3l-3.78 1.05a5.52 5.52 0 0 0-.17-1.77 2.76 2.76 0 0 0-1.58-1.87 4.17 4.17 0 0 0-2.85-.06l-6.5 1.8-1.04-3.72ZM210.65 121.13a7.25 7.25 0 0 1-2.4-5.13 7.25 7.25 0 0 1 1.83-5.35 7.09 7.09 0 0 1 5.12-2.46 7.06 7.06 0 0 1 5.33 1.9 7.2 7.2 0 0 1 2.43 5.12 7.2 7.2 0 0 1-1.86 5.35 7.06 7.06 0 0 1-5.1 2.46 7.1 7.1 0 0 1-5.35-1.89Zm1.2-5.32c.06 1 .45 1.8 1.18 2.42.75.64 1.67.93 2.76.87a3.69 3.69 0 0 0 2.63-1.16c.67-.7.99-1.54.93-2.54a3.35 3.35 0 0 0-1.2-2.48 3.74 3.74 0 0 0-2.74-.84 3.85 3.85 0 0 0-2.65 1.14 3.4 3.4 0 0 0-.9 2.59ZM201.84 133.16l.68-4.16 6.12 4.01 14.1-3.7-.68 4.19-9.64 2.25 8.42 5.18-.7 4.2-18.3-11.97ZM202.05 153.34c.8-2 2.09-3.4 3.88-4.23 1.78-.81 3.69-.8 5.73 0a7.2 7.2 0 0 1 4.1 9.62 7.04 7.04 0 0 1-3.53 3.91c-1.62.8-3.45.8-5.5-.02a10.9 10.9 0 0 1-1.2-.55l3.9-9.8a3.08 3.08 0 0 0-2.46.32 4.27 4.27 0 0 0-1.65 2.08c-.61 1.54-.51 2.88.3 4.04l-3.06 1.88c-1.42-2.13-1.59-4.54-.5-7.25Zm9.77.03-2.44 6.13c.81.15 1.52.01 2.13-.4.6-.38 1.04-.93 1.33-1.65a4 4 0 0 0 .22-2.25 2.73 2.73 0 0 0-1.24-1.83ZM192.73 170.6a7.4 7.4 0 0 1 4.72-3.24c1.97-.39 3.83 0 5.57 1.19a7.02 7.02 0 0 1 3.14 4.72c.36 1.99-.05 3.86-1.24 5.6a7.22 7.22 0 0 1-3.15 2.64 7.2 7.2 0 0 1-3.96.62l.39-3.8a3.9 3.9 0 0 0 2.1-.18 3.3 3.3 0 0 0 1.63-1.3c.57-.85.76-1.76.56-2.73a3.75 3.75 0 0 0-1.65-2.35 3.75 3.75 0 0 0-2.79-.66c-.98.17-1.76.68-2.33 1.52a3.3 3.3 0 0 0-.6 2c0 .72.2 1.4.6 2.03l-3.38 1.76a7.4 7.4 0 0 1 .4-7.81ZM178.62 186.67a5.8 5.8 0 0 1 3.72-1.74c1.33-.04 2.57.54 3.7 1.74l3.99 4.2 2.06-1.96 2.33 2.46-2.07 1.96 2.7 2.85-2.8 2.66-2.7-2.85-2.9 2.73-2.32-2.45 2.89-2.74-3.46-3.65c-.6-.63-1.16-.95-1.69-.96-.51 0-1.08.29-1.7.87-.43.42-.76.84-.97 1.27l-2.35-2.48c.35-.61.88-1.25 1.57-1.91ZM162.6 200.12a7.25 7.25 0 0 1 3.4-4.52 7.25 7.25 0 0 1 5.6-.9c1.98.48 3.5 1.6 4.56 3.38a7.05 7.05 0 0 1 .84 5.6 7.2 7.2 0 0 1-3.4 4.54 7.2 7.2 0 0 1-5.6.87 7.06 7.06 0 0 1-4.55-3.36 7.09 7.09 0 0 1-.85-5.61Zm5.27-1.43a3.27 3.27 0 0 0-1.59 2.18c-.21.96-.03 1.9.53 2.84a3.69 3.69 0 0 0 2.25 1.78c.93.27 1.83.15 2.68-.37a3.35 3.35 0 0 0 1.62-2.22c.21-.94.03-1.88-.53-2.81a3.85 3.85 0 0 0-2.24-1.81 3.4 3.4 0 0 0-2.72.41ZM138.31 211.24a3.75 3.75 0 0 1 2.81.8c.83.67 1.3 1.54 1.42 2.6.12 1.07-.16 2-.83 2.82a3.69 3.69 0 0 1-2.57 1.41 3.73 3.73 0 0 1-2.84-.82 3.64 3.64 0 0 1-1.42-2.58 3.78 3.78 0 0 1 3.43-4.23Z"/>
          <circle cx="121" cy="121" r="64.32" stroke="#fff" stroke-width="3.36"/>
        </svg>
        <EyeIcon className="absolute top-0 bottom-0 left-0 right-0 text-white mt-12 ml-12" />
      </div>
    </div>
  );
}
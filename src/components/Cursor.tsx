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
      document.body.style.cursor = 'none';
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
      <div id="cursor-project" className="rounded-full -ml-[42px] -mt-0 text-white text-sm font-semibold flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-3 transform-none transition-all duration-[.4s] ease-[cubic-bezier(.325,.82,.350,1)] ring-2 ring-[#FFA36F]" style={{ transform: 'scale(0)', opacity: '0'}}>
        <span className="font-sans">Ver proyecto</span>
      </div>
    </div>
  );
}
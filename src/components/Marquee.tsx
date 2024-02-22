import { cn } from '@/lib/utils';

interface MarqueeProps {
  children?: React.ReactNode;
  className?: string;
}

export const Marquee = ({ children, className }: MarqueeProps) => {
  return (
    <div className={cn('relative flex overflow-x-hidden py-4', className)}>
      <div
        className="animate-marquee whitespace-nowrap duration-500"
      >
        {children}
      </div>
      <div
        className="animate-marquee2 absolute top-4 whitespace-nowrap duration-500"
      >
        {children}
      </div>
    </div>
  );
}

export const MarqueeReverse = ({ children, className }: MarqueeProps) => {
  return (
    <div className={cn('relative flex overflow-x-hidden py-4', className)}>
      <div
        className="animate-marqueeReverse whitespace-nowrap duration-500"
      >
        {children}
      </div>
      <div
        className="animate-marqueeReverse2 absolute top-4 whitespace-nowrap duration-500"
      >
        {children}
      </div>
    </div>
  );
}
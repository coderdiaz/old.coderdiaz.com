import { cn } from '@/lib/utils';

interface MarqueeProps {
  children?: React.ReactNode;
  className?: string;
}

export const Marquee = ({ children, className }: MarqueeProps) => {
  return (
    <div className={cn('relative flex overflow-x-hidden py-3', className)}>
      <div
        className="animate-marquee whitespace-nowrap"
      >
        {children}
      </div>
      <div
        className="animate-marquee2 absolute top-3 whitespace-nowrap"
      >
        {children}
      </div>
    </div>
  );
}
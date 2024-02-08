import { useState } from 'react';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() as number;
    if (latest > previous && latest > 150) {
      return setHidden(true);
    }
    return setHidden(false);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      transition={{ ease: 'easeIn', duration: .3 }}
      animate={hidden ? 'hidden' : 'visible'}
      className="py-4 sticky top-0 z-50 bg-[#100F0F]/80 backdrop-blur-md"
    >
      {children}
    </motion.header>
  );
}
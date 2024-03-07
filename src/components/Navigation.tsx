import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $navigation } from '@/lib/store';
import { XIcon } from 'lucide-react';
import { RemoveScroll }  from 'react-remove-scroll';

export const Navigation = () => {
  const open = useStore($navigation);
  const handleClose = () => $navigation.set(false);

  return (
    <motion.div
      variants={{
        visible: {
          display: 'flex',
          opacity: 1,
          visibility: 'visible',
          transition: {
            staggerChildren: 0.17,
            delayChildren: 0.2,
          },
        },
        hidden: {
          display: 'flex',
          opacity: 0,
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            display: {
              when: "afterChildren" // delay: 1 - will work
            }
          }
        },
      }}
      animate={open ? 'visible' : 'hidden'}
      initial={{ display: 'none', opacity: 0, visibility: 'hidden' }}
      exit={{ display: 'none', opacity: 0, visibility: 'hidden' }}
      className="fixed top-0 left-0 w-full h-full z-[9999] justify-end p-3"
    >
      <div className="absolute w-full h-full top-0 left-0 bg-black/75" />
      <motion.div
        variants={{
          visible: { x: 0 },
          hidden: { x: '100%' },
        }}
        initial={{ x: '100%' }}
        transition={{ ease: 'easeInOut', duration: .3 }}
        animate={open ? 'visible' : 'hidden'}
        className="relative p-5 w-full md:max-w-[24rem] flex-shrink-0 bg-[#1A1A1A] h-full rounded-2xl text-white overflow-y-scroll"
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-end w-full sticky top-0">
            <button onClick={handleClose} className="flex items-center justify-center border border-stone-700 rounded-xl p-2 text-white transition-all duration-300 hover:ring-4 hover:ring-[#FFA36F40]">
              <XIcon size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="uppercase tracking-tight font-display text-xs text-stone-400">coderdiaz.com</span>
            <nav className="flex flex-col gap-2">
              <a href="/" className="text-white font-semibold text-xl">Inicio</a>
              <a href="/jardin/" className="text-white font-semibold text-xl">Jardín Digital</a>
              <a href="/servicios/" className="text-white font-semibold text-xl">Servicios</a>
              {/* <a href="#" className="text-white font-semibold text-xl">Proyectos</a> */}
            </nav>
          </div>
          <div className="flex flex-col gap-3">
            <span className="uppercase tracking-tight font-display text-xs text-stone-400">Sígueme</span>
            <nav className="flex flex-col gap-2">
              <a href="https://x.com/coderdiaz" rel="noopener noreferrer" className="text-white font-semibold">X.com</a>
              <a href="https://layers.to/coderdiaz" rel="noopener noreferrer" className="text-white font-semibold">Layers</a>
              <a href="https://read.cv/coderdiaz" rel="noopener noreferrer" className="text-white font-semibold">Read.cv</a>
              <a href="https://github.com/coderdiaz" rel="noopener noreferrer" className="text-white font-semibold">GitHub</a>
            </nav>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { $quote } from '@/lib/store';
import { FormQuote } from './FormQuote';

export const Quote = () => {
  const open = useStore($quote);
  const handleClose = () => $quote.set(false);

  return (
    <motion.div
      variants={{
        visible: {
          display: 'flex',
          opacity: 1,
          visibility: 'visible',
          transition: {
            staggerChildren: 0.17,
            delayChildren: 3,
          },
        },
        hidden: {
          display: 'flex',
          opacity: 0,
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            display: {
              when: "afterChildren", // delay: 1 - will work
            }
          }
        },
      }}
      animate={open ? 'visible' : 'hidden'}
      initial={{ display: 'none', opacity: 0, visibility: 'hidden' }}
      exit={{ display: 'none', opacity: 0, visibility: 'hidden' }}
      className="fixed top-0 left-0 w-full h-full z-[9950] justify-end p-3"
    >
      <div className="absolute w-full h-full top-0 left-0 bg-black/75" />
        <motion.div
          variants={{
            visible: { x: 0, opacity: 1, visibility: 'visible' },
            hidden: { opacity: 0, visibility: 'hidden' },
          }}
          initial={{ x: '100%', opacity: 0, visibility: 'hidden' }}
          exit={{ x: 0, opacity: 0, visibility: 'hidden' }}
          transition={{ duration: 0.25 }}
          animate={open ? 'visible' : 'hidden'}
          className="relative px-5 pb-5 w-full md:max-w-[36rem] flex-shrink-0 bg-[#1A1A1A] h-full rounded-2xl text-white overflow-y-scroll"
        >
        <div className="flex flex-col gap-6">
          <div className="flex justify-end w-full sticky top-0 py-5 backdrop-blur-md bg-[#1a1a1a]/75">
            <button onClick={handleClose} className="flex items-center justify-center border border-stone-700 rounded-xl p-2 text-white transition-all duration-300 hover:ring-4 hover:ring-[#FFA36F40]">
              <XIcon size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xl md:text-3xl">
              Cuentame sobre tu idea o proyecto y te ayudaré a hacerlo realidad.
            </h3>
            <FormQuote />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
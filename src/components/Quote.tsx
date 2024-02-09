import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $quote } from '@/lib/store';
import { XIcon } from 'lucide-react';
import { RemoveScroll }  from 'react-remove-scroll';

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
      className="fixed top-0 left-0 w-full h-full z-[9950] justify-end p-3"
    >
      <div className="absolute w-full h-full top-0 left-0 bg-black/75" />
      <RemoveScroll enabled={open}>
        <motion.div
          variants={{
            visible: { x: 0 },
            hidden: { x: '100%' },
          }}
          initial={{ x: '100%' }}
          transition={{ ease: 'easeInOut', duration: .3 }}
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
                ¿Construyendo algo nuevo? Comparte algunos detalles y me pondré en contacto contigo
              </h3>
              <div className="flex flex-col gap-3">
                <span className="contact-info">Dejame tus datos</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md">
                    <label className="text-neutral-400 flex-shrink-0">Nombre</label>
                    <input
                      type="text"
                      className="focus:outline-none text-right w-full flex-grow-0 bg-transparent"
                      placeholder="Bruce Wayne"
                    />
                  </div>
                  <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md">
                    <label className="text-neutral-400 flex-shrink-0">Empresa</label>
                    <input
                      type="text"
                      className="focus:outline-none text-right w-full flex-grow-0 bg-transparent"
                      placeholder="Startup, Co"
                    />
                  </div>
                  <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md">
                    <label className="text-neutral-400 flex-shrink-0">Correo Electrónico</label>
                    <input
                      type="email"
                      className="focus:outline-none text-right w-full flex-grow-0 bg-transparent"
                      placeholder="bruce.wayne@company.co"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="contact-info">Información del proyecto</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md justify-between">
                    <label className="text-neutral-400 flex-shrink-0">Tipo de proyecto</label>
                    <select className="focus:outline-none text-right flex-grow-0 bg-transparent">
                      <option value="Diseño">Diseño</option>
                      <option selected value="Desarrollo">Desarrollo</option>
                      <option value="Diseño y desarrollo">Diseño y desarrollo</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md justify-between">
                    <label className="text-neutral-400 flex-shrink-0">Budged range</label>
                    <select className="focus:outline-none text-right flex-grow-0 bg-transparent">
                      <option selected value="$14,000 — $22,000">$14,000 — $22,000</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-5 bg-neutral-800 rounded-md justify-between relative">
                    <label className="absolute top-0 mt-4 ml-5 left-0 text-neutral-400 flex-shrink-0">Message</label>
                    <textarea
                      placeholder="Describe tu proyecto en algunos párrafos..."
                      rows={3}
                      className="px-5 pb-5 pt-12 focus:outline-none w-full flex-grow-0 bg-transparent"
                    />
                  </div>
                  <button className="mt-2 flex items-center font-semibold justify-center border-2 border-transparent rounded-xl px-4 py-4 transition-all duration-300 bg-white text-gray-950 hover:ring-4 hover:ring-[#FFA36F40] resize-none">
                    Enviar detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </RemoveScroll>
    </motion.div>
  )
}
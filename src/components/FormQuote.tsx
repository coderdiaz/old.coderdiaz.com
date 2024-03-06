import { useEffect, useRef, useState } from 'react';
import { useForm } from '@formcarry/react';
import { CheckCircle2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
type Budged = {
  [key: string]: string[];
}

const budgets: Budged = {
  'Diseño': ['$8,000 — $12,000', '$12,000 — $16,000', '$16,000 — $25,000', '$25,000 — $40,000', '$40,000 — $60,000', '$60,000+'],
  'Desarrollo': ['$14,000 — $22,000', '$22,000 — $30,000', '$30,000 — $50,000', '$50,000 — $80,000', '$80,000 — $120,000', '$120,000+'],
}

export const FormQuote = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const budgedRangeRef = useRef<HTMLSelectElement>(null);
  const [projectType, setProjectType] = useState('');
  const { state, submit } = useForm({
    id: 'k8G1dh9vlgI',
  });

  useEffect(() => {
    if (state.submitted && formRef.current) {
      formRef.current.reset();
      setTimeout(() => {
        state.submitted = false;
      }, 1500)
    }
  }, [state.submitted])

  useEffect(() => {
    if (budgedRangeRef.current) {
      budgedRangeRef.current.value = '';
    }
  }, [projectType]);

  return (
    <form ref={formRef} onSubmit={submit} className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col gap-3">
        <span className="contact-info">Datos de contacto</span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md">
            <label className="text-neutral-400 flex-shrink-0">Nombre</label>
            <input
              type="text"
              className="focus:outline-none text-right w-full flex-grow-0 bg-transparent"
              placeholder="Bruce Wayne"
              name="name"
              required
            />
          </div>
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md">
            <label className="text-neutral-400 flex-shrink-0">Empresa</label>
            <input
              type="text"
              className="focus:outline-none text-right w-full flex-grow-0 bg-transparent"
              placeholder="Startup, Co"
              name="company"
            />
          </div>
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md">
            <label className="text-neutral-400 flex-shrink-0">Correo Electrónico</label>
            <input
              type="email"
              className="focus:outline-none text-right w-full flex-grow-0 bg-transparent"
              placeholder="bruce.wayne@company.co"
              name="email"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="contact-info">Información del proyecto</span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md justify-between">
            <label className="text-neutral-400 flex-shrink-0">Servicio</label>
            <select
              name="projectType"
              className="focus:outline-none text-right flex-grow-0 bg-transparent"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="Diseño">Diseño</option>
              <option value="Desarrollo">Desarrollo</option>
            </select>
          </div>
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md justify-between">
            <label className="text-neutral-400 flex-shrink-0">Presupuesto</label>
            <select
              name="budgedRange"
              className="focus:outline-none text-right flex-grow-0 bg-transparent"
              ref={budgedRangeRef}
              required
            >
              <option value="">Selecciona una opción</option>
              {projectType && budgets[projectType].map((budged, index) => (
                <option key={index} value={budged}>{budged}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-5 bg-neutral-800 rounded-md justify-between relative">
            <label className="absolute top-0 mt-4 ml-5 left-0 text-neutral-400 flex-shrink-0">Mensaje</label>
            <textarea
              name="message"
              rows={3}
              placeholder="Describe tu proyecto en algunos párrafos..."
              className="px-5 pb-5 pt-12 focus:outline-none w-full flex-grow-0 bg-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={state.submitting || state.submitted}
            className={cn('mt-2 flex items-center font-medium justify-center border-2 border-transparent rounded-xl px-4 py-4 transition-all duration-300 bg-white text-gray-950 hover:ring-4 hover:ring-[#FFA36F40] resize-none', {
              'bg-green-400 hover:ring-0': state.submitted,
            })}
          >
            <span className={cn({
              'inline': !state.submitting,
              'hidden': state.submitting || state.submitted,
            })}>Enviar detalles</span>
            <span className={cn({
              'hidden': !state.submitting || state.submitted,
              'inline': state.submitting,
            })}>Enviando información...</span>
            <div className={cn('flex items-center gap-2', {
              'hidden': !state.submitted,
            })}>
              <CheckCircle2Icon size={18} strokeWidth={2.5} />
              <span>Mensaje enviado. Nos vemos pronto.</span>
            </div>
          </button>
        </div>
      </div>
      <input type="hidden" name="_gotcha" />
    </form>
  )
}
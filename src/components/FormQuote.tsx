import { useReducer, type ChangeEvent, type FormEvent } from 'react';

type State = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  budgedRange: string;
  message: string;
}
type Action = 
  { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'RESET' };

const initialState: State = {
  name: '',
  company: '',
  email: '',
  projectType: '',
  budgedRange: '',
  message: '',
};

const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value};
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
type Budged = {
  [key: string]: string[];
}

const budgets: Budged = {
  'Diseño': ['$8,000 — $12,000', '$12,000 — $16,000', '$16,000 — $25,000', '$25,000 — $40,000', '$40,000 — $60,000', '$60,000+'],
  'Desarrollo': ['$14,000 — $22,000', '$22,000 — $30,000', '$30,000 — $50,000', '$50,000 — $80,000', '$80,000 — $120,000', '$120,000+'],
}

export const FormQuote = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });

    // Reset budged-range when project-type changes
    if (name === 'projectType') {
      dispatch({ type: 'UPDATE_FIELD', field: 'budgedRange', value: '' });
    }
  }

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
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
              value={formState.name}
              onChange={handleInputChange}
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
              value={formState.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md">
            <label className="text-neutral-400 flex-shrink-0">Correo Electrónico</label>
            <input
              type="email"
              className="focus:outline-none text-right w-full flex-grow-0 bg-transparent"
              placeholder="bruce.wayne@company.co"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="contact-info">Información del proyecto</span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md justify-between">
            <label className="text-neutral-400 flex-shrink-0">Tipo de proyecto</label>
            <select
              name="projectType"
              value={formState.projectType}
              onChange={handleInputChange}
              className="focus:outline-none text-right flex-grow-0 bg-transparent"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="Diseño">Diseño</option>
              <option value="Desarrollo">Desarrollo</option>
            </select>
          </div>
          <div className="flex items-center gap-5 p-5 bg-neutral-800 rounded-md justify-between">
            <label className="text-neutral-400 flex-shrink-0">Budged range</label>
            <select
              name="budgedRange"
              value={formState.budgedRange}
              onChange={handleInputChange}
              className="focus:outline-none text-right flex-grow-0 bg-transparent"
              required
            >
              <option value="">Selecciona una opción</option>
              {formState.projectType && budgets[formState.projectType].map((budged, index) => (
                <option key={index} value={budged}>{budged}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-5 bg-neutral-800 rounded-md justify-between relative">
            <label className="absolute top-0 mt-4 ml-5 left-0 text-neutral-400 flex-shrink-0">Message</label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe tu proyecto en algunos párrafos..."
              className="px-5 pb-5 pt-12 focus:outline-none w-full flex-grow-0 bg-transparent"
              required
            />
          </div>
          <button type="submit" className="mt-2 flex items-center font-semibold justify-center border-2 border-transparent rounded-xl px-4 py-4 transition-all duration-300 bg-white text-gray-950 hover:ring-4 hover:ring-[#FFA36F40] resize-none">
            Enviar detalles
          </button>
        </div>
      </div>
      <input type="hidden" name="_gotcha" />
    </form>
  )
}
import { MoreHorizontalIcon } from 'lucide-react';
import { openDrawer } from '@/lib/store';

export const GetaQuote = () => {
  const handleOpen = () => openDrawer.set(true);
  return (
    <div className="flex items-center gap-2">
      {/* <button onClick={handleOpen} className="border-2 flex items-center gap-2.5 border-black font-medium w-max text-black rounded-xl text-sm px-4 py-2 bg-white transition-all duration-300 hover:ring-4 hover:ring-[#FFA36F40]">
        Cotizar
      </button> */}
      <button onClick={handleOpen} className="w-10 h-10 flex items-center justify-center border border-stone-700 rounded-xl p-2 text-white transition-all duration-300 hover:ring-4 hover:ring-[#FFA36F40]">
        <MoreHorizontalIcon size={16} />
      </button>
    </div>
  )
}
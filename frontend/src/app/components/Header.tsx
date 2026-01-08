import { Rabbit, PlusIcon } from "lucide-react";

type Props = { onAdd: () => void };

export default function Header({ onAdd }: Props) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="flex items-center text-black text-3xl font-bold">
            <Rabbit className="w-6 h-6 mr-1" />
            My Wildiary
          </h1>
          <p className="text-gray-600 mt-1">Wildlife viewing in nature</p>
        </div>

        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          New observation
        </button>
      </div>
    </header>
  );
}

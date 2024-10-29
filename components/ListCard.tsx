import Image from "next/image";
import { MovieList } from "../types/list";

interface ListCardProps {
  list: MovieList;
  onSelect: (list: MovieList) => void;
  onDelete?: (listId: number) => void;
}

export default function ListCard({ list, onSelect, onDelete }: ListCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div onClick={() => onSelect(list)} className="cursor-pointer">
        <div className="relative h-[200px]">
          {list.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${list.poster_path}`}
              alt={list.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{list.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {list.description}
          </p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>{list.item_count} items</span>
            <span className="mx-2">•</span>
            <span>{list.favorite_count} favorites</span>
          </div>
        </div>
      </div>
      {onDelete && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onDelete(list.id)}
            className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Delete List
          </button>
        </div>
      )}
    </div>
  );
}

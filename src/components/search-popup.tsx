"use client";

import { X, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPopup = ({ isOpen, onClose }: SearchPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Netflix",
    "Spotify",
    "Amazon",
  ]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const handleDeleteSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 transition-all duration-300 ${
        isAnimating ? "bg-black/50" : "bg-black/0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300 ease-out ${
          isAnimating
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Buscar</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar transacciones, tarjetas..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {recentSearches.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500">Búsquedas recientes</p>
                <button
                  onClick={handleClearAll}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  aria-label="Limpiar todas las búsquedas"
                >
                  Limpiar todo
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group ${
                      isAnimating
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${100 + index * 50}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Search className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-700 flex-1 cursor-pointer">
                      {search}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSearch(index);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label={`Eliminar búsqueda ${search}`}
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


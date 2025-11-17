"use client";

import { useState, useRef, useEffect } from "react";
import { CardDisplay } from "@/components/card-display";

interface CardData {
  issuer: string;
  name: string;
  lastDigits: string;
  fullNumber: string;
  cvv: string;
  balance: string;
  currency: string;
  expDate: string;
}

interface CardCarouselProps {
  cards: CardData[];
}

export const CardCarousel = ({ cards }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
    
    if (touchStart && e.targetTouches[0].clientX !== touchStart) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    }

    if (distance < -minSwipeDistance) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  if (cards.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <p className="text-center text-gray-500">No tienes tarjetas disponibles</p>
      </div>
    );
  }

  if (cards.length === 1) {
    return (
      <CardDisplay
        issuer={cards[0].issuer}
        name={cards[0].name}
        lastDigits={cards[0].lastDigits}
        fullNumber={cards[0].fullNumber}
        cvv={cards[0].cvv}
        balance={cards[0].balance}
        currency={cards[0].currency}
        expDate={cards[0].expDate}
      />
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden touch-pan-x">
        <div
          ref={carouselRef}
          className="flex"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card, index) => (
            <div key={index} className="min-w-full px-1">
              <CardDisplay
                issuer={card.issuer}
                name={card.name}
                lastDigits={card.lastDigits}
                fullNumber={card.fullNumber}
                cvv={card.cvv}
                balance={card.balance}
                currency={card.currency}
                expDate={card.expDate}
              />
            </div>
          ))}
        </div>
      </div>

      {cards.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Ir a tarjeta ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};


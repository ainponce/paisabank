"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface CardDisplayProps {
  issuer: string;
  name: string;
  lastDigits: string;
  fullNumber: string;
  cvv: string;
  balance: string;
  currency: string;
  expDate: string;
}

export const CardDisplay = ({
  issuer,
  name,
  lastDigits,
  fullNumber,
  cvv,
  balance,
  currency,
  expDate,
}: CardDisplayProps) => {
  const [showBalance, setShowBalance] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  const getCardGradient = () => {
    if (issuer === "Visa") {
      return "bg-gradient-to-br from-blue-600 to-blue-700";
    } else if (issuer === "Mastercard") {
      return "bg-gradient-to-br from-orange-500 to-red-600";
    }
    return "bg-gradient-to-br from-gray-600 to-gray-700";
  };

  return (
    <Card className={`${getCardGradient()} text-white p-6 rounded-3xl shadow-lg border-0`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs font-medium opacity-90 mb-2">Balance</p>
          <div className="flex items-center gap-2">
            <span className="bg-white/30 px-2 py-0.5 rounded text-xs font-semibold">
              {currency}
            </span>
            <p className="text-3xl font-bold font-[family-name:var(--font-poppins)]">
              {showBalance ? balance : "•••••"}
            </p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {showBalance ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="bg-white/20 rounded-full p-2 w-14 h-14 flex items-center justify-center">
          {issuer === "Visa" ? (
            <Image
              src="/visa.svg"
              alt="Visa"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          ) : issuer === "Mastercard" ? (
            <Image
              src="/master-card.svg"
              alt="Mastercard"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          ) : null}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-base font-medium tracking-wider">
              {showCardNumber ? fullNumber : `•••• •••• •••• ${lastDigits}`}
            </p>
            <button
              onClick={() => setShowCardNumber(!showCardNumber)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {showCardNumber ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs mt-1 opacity-90">{name}</p>
        </div>
        <div className="text-right flex flex-col gap-2">
          <div>
            <p className="text-[10px] opacity-75">Exp. Date</p>
            <p className="text-sm font-medium">{expDate}</p>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <p className="text-[10px] opacity-75">CVV</p>
            <p className="text-sm font-medium">{showCVV ? cvv : "•••"}</p>
            <button
              onClick={() => setShowCVV(!showCVV)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {showCVV ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};


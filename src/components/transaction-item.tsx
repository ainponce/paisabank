"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

interface TransactionItemProps {
  title: string;
  amount: string;
  transactionType: string;
  date?: Date | string;
  showDate?: boolean;
}

export const TransactionItem = ({
  title,
  amount,
  transactionType,
  date,
  showDate = false,
}: TransactionItemProps) => {
  const getIcon = () => {
    switch (transactionType) {
      case "SUS":
        return (
          <div className="w-11 h-11">
            <Image
              src="/suscription.svg"
              alt="Suscripción"
              width={44}
              height={44}
            />
          </div>
        );
      case "CASH_IN":
        return (
          <div className="w-11 h-11">
            <Image
              src="/paymente-received.svg"
              alt="Pago recibido"
              width={44}
              height={44}
            />
          </div>
        );
      case "CASH_OUT":
        return (
          <div className="w-11 h-11">
            <Image
              src="/payment-sent.svg"
              alt="Pago enviado"
              width={44}
              height={44}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getSubtitle = () => {
    switch (transactionType) {
      case "SUS":
        return "Pago de suscripción";
      case "CASH_IN":
        return "Pago recibido";
      case "CASH_OUT":
        return "Pago enviado";
      default:
        return "";
    }
  };

  const getAmountColor = () => {
    switch (transactionType) {
      case "CASH_IN":
        return "text-[#74CC9B]";
      case "CASH_OUT":
        return "text-[#EF9C55]";
      case "SUS":
        return "text-[#B946FF]";
      default:
        return "text-gray-900";
    }
  };

  const getAmountPrefix = () => {
    switch (transactionType) {
      case "CASH_IN":
        return "+";
      case "CASH_OUT":
      case "SUS":
        return "-";
      default:
        return "";
    }
  };

  return (
    <Card className="bg-white border-0 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <p className="font-medium text-gray-900">{title}</p>
            <p className="text-sm text-gray-500">{getSubtitle()}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${getAmountColor()}`}>
            {getAmountPrefix()}${amount}
          </p>
          {showDate && date && (
            <p className="text-xs text-gray-500">
              {new Date(date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};


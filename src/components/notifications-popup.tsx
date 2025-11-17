"use client";

import { X, Bell, CreditCard, TrendingUp, Shield } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPopup = ({
  isOpen,
  onClose,
}: NotificationsPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

  if (!isVisible) return null;

  const notifications = [
    {
      id: 1,
      icon: CreditCard,
      title: "Pago realizado",
      description: "Se procesó tu pago de $25.00 en Netflix",
      time: "Hace 2 horas",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Ingreso recibido",
      description: "Recibiste $1,500.00 de Juan Pérez",
      time: "Hace 5 horas",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      icon: Shield,
      title: "Seguridad",
      description: "Tu tarjeta fue bloqueada temporalmente",
      time: "Ayer",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: 4,
      icon: Bell,
      title: "Recordatorio",
      description: "Tienes un pago pendiente de $50.00",
      time: "Hace 2 días",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 transition-all duration-300 ${
        isAnimating ? "bg-black/50" : "bg-black/0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col transition-all duration-300 ease-out ${
          isAnimating
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Notificaciones</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all duration-300 ${
                    isAnimating
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${notification.iconColor}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
            Marcar todas como leídas
          </button>
        </div>
      </div>
    </div>
  );
};


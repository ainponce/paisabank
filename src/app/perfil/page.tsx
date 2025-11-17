"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { BottomNav } from "@/components/bottom-nav";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import { ErrorState } from "@/components/error-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { User, Mail, Lock, LogOut } from "lucide-react";

export default function PerfilPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const { data: profileData, isLoading, error } = trpc.user.getProfile.useQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const utils = trpc.useUtils();
  const updateProfileMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      utils.user.getProfile.invalidate();
      setIsEditing(false);
      setShowPasswordFields(false);
      setFormData({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
      });
    },
  });

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !profileData?.data) {
    return (
      <ErrorState
        title="Error al cargar perfil"
        message="No pudimos cargar tu perfil. Por favor, intenta nuevamente."
      />
    );
  }

  const profile = profileData.data;

  const handleStartEdit = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      currentPassword: "",
      newPassword: "",
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowPasswordFields(false);
    setFormData({
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: {
      name?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
    } = {};

    if (formData.name !== profile.name) {
      updateData.name = formData.name;
    }

    if (formData.email !== profile.email) {
      updateData.email = formData.email;
    }

    if (showPasswordFields && formData.newPassword) {
      updateData.currentPassword = formData.currentPassword;
      updateData.newPassword = formData.newPassword;
    }

    if (Object.keys(updateData).length === 0) {
      setIsEditing(false);
      return;
    }

    updateProfileMutation.mutate(updateData);
  };

  const handleLogout = () => {
    logout();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] pb-24">
      <div className="bg-white px-6 pt-8 pb-6 shadow-sm">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-gray-900">
          Mi Perfil
        </h1>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Miembro desde {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información Personal
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="text-sm font-medium text-gray-900">
                      {profile.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Contraseña</p>
                    <p className="text-sm font-medium text-gray-900">••••••••</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleStartEdit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Editar Perfil
            </Button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 border-2 border-red-200 rounded-xl transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Editar Información
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                {!showPasswordFields ? (
                  <button
                    type="button"
                    onClick={() => setShowPasswordFields(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Cambiar contraseña
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña Actual
                      </label>
                      <Input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
                        required={showPasswordFields}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva Contraseña
                      </label>
                      <Input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
                        minLength={6}
                        required={showPasswordFields}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Mínimo 6 caracteres
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordFields(false);
                        setFormData({
                          ...formData,
                          currentPassword: "",
                          newPassword: "",
                        });
                      }}
                      className="text-sm text-gray-600 hover:text-gray-700"
                    >
                      Cancelar cambio de contraseña
                    </button>
                  </div>
                )}
              </div>

              {updateProfileMutation.error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm text-red-600">
                    {updateProfileMutation.error.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                type="button"
                onClick={handleCancelEdit}
                variant="outline"
                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl h-11"
                disabled={updateProfileMutation.isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </div>

      <BottomNav />
    </div>
  );
}


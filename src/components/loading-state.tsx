interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Cargando...",
}: LoadingStateProps) => {
  return (
    <div className="min-h-screen bg-[#F9FAFC] flex items-center justify-center">
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          role="status"
          aria-label={message}
        />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};


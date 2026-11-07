import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isAdmin, loading, error } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <Loader2 size={32} className="animate-spin text-foreground" />
        <p className="text-foreground/70">Authenticating...</p>
      </div>
    );
  }

  // Show error if auth failed
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">Authentication Error</p>
          <p className="text-foreground/70 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/greatness'}
            className="px-6 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!currentUser) {
    return <Navigate to="/greatness" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-foreground/70 mb-4">You do not have permission to access this page</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

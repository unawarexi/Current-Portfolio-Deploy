// ============================================================================
// AUTH USE-CASE — login flow logic, decoupled from UI
// ============================================================================
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '@hooks/api-hooks/useAuth';
import useAuthStore from '@store/auth.store';

/**
 * Encapsulates login flow:
 * - call API mutation
 * - auth store is updated inside useLogin onSuccess
 * - redirect to ProtectedRoute's originating page, or /auth/new by default
 */
export const useLoginUsecase = () => {
  const navigate      = useNavigate();
  const location      = useLocation();
  const loginMutation = useLogin();
  const { isAuthenticated } = useAuthStore();

  const submit = async (username, password) => {
    await loginMutation.mutateAsync({ username, password });
    const from = location.state?.from?.pathname ?? '/auth/new';
    navigate(from, { replace: true });
  };

  return {
    submit,
    isLoading:       loginMutation.isPending,
    error:           loginMutation.error?.message ?? null,
    isAuthenticated,
  };
};

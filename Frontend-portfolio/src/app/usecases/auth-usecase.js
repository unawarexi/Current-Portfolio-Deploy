// ============================================================================
// AUTH USE-CASE — login flow logic, decoupled from UI
// ============================================================================
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@hooks/api-hooks/useAuth';
import useAuthStore from '@store/auth.store';

/**
 * Encapsulates login flow:
 * - call API mutation
 * - auth store is updated inside useLogin onSuccess
 * - redirect to home on success
 */
export const useLoginUsecase = () => {
  const navigate  = useNavigate();
  const loginMutation = useLogin();
  const { isAuthenticated } = useAuthStore();

  const submit = async (password) => {
    await loginMutation.mutateAsync(password);
    navigate('/');
  };

  return {
    submit,
    isLoading:       loginMutation.isPending,
    error:           loginMutation.error?.message ?? null,
    isAuthenticated,
  };
};

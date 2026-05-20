// ============================================================================
// AUTH HOOKS — TanStack Query mutations for admin authentication
// ============================================================================

import { useMutation } from '@tanstack/react-query';
import { authRepository } from '@app/repository/auth-repository';
import useAuthStore from '@store/auth.store';
import { toast } from '@store/toast.store';

/**
 * useMutation wrapper for admin login.
 * On success: persists token to authStore (which writes localStorage).
 */
export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (password) => authRepository.login(password),
    onSuccess: (res) => {
      const { token, expiresIn } = res.data.data;
      login({ token, expiresIn });
      toast.success('Logged in successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Login failed');
    },
  });
};
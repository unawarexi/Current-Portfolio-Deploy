import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aboutRepository } from '@app/repository/about-repository';
import { queryKeys } from '@core/lib/QueryClient';
import { toast } from '@store/toast.store';

export const useAbout = () =>
  useQuery({
    queryKey: queryKeys.about.profile(),
    queryFn:  () => aboutRepository.getProfile().then((r) => r.data.data),
    staleTime: 10 * 60 * 1000,
  });

export const useUpsertAbout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => aboutRepository.upsertProfile(data),
    onSuccess:  () => { qc.invalidateQueries({ queryKey: queryKeys.about.all }); toast.success('Profile updated'); },
    onError:    (err) => toast.error(err.message),
  });
};

export const useUploadCv = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData) => aboutRepository.uploadCv(formData),
    onSuccess:  () => { qc.invalidateQueries({ queryKey: queryKeys.about.all }); toast.success('CV uploaded'); },
    onError:    (err) => toast.error(err.message),
  });
};

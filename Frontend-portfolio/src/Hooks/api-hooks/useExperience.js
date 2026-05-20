import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceRepository } from '@app/repository/experience-repository';
import { queryKeys } from '@core/lib/QueryClient';
import { toast } from '@store/toast.store';

export const useExperience = () =>
  useQuery({
    queryKey: queryKeys.experience.list(),
    queryFn:  () => experienceRepository.getAll().then((r) => r.data.data),
  });

export const useExperienceItem = (id) =>
  useQuery({
    queryKey: queryKeys.experience.detail(id),
    queryFn:  () => experienceRepository.getById(id).then((r) => r.data.data),
    enabled:  !!id,
  });

export const useCreateExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => experienceRepository.create(data),
    onSuccess:  () => { qc.invalidateQueries({ queryKey: queryKeys.experience.all }); toast.success('Experience added'); },
    onError:    (err) => toast.error(err.message),
  });
};

export const useUpdateExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => experienceRepository.update(id, data),
    onSuccess:  () => { qc.invalidateQueries({ queryKey: queryKeys.experience.all }); toast.success('Experience updated'); },
    onError:    (err) => toast.error(err.message),
  });
};

export const useDeleteExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => experienceRepository.remove(id),
    onSuccess:  () => { qc.invalidateQueries({ queryKey: queryKeys.experience.all }); toast.success('Experience deleted'); },
    onError:    (err) => toast.error(err.message),
  });
};

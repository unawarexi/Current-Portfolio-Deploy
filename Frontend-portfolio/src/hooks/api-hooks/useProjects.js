// ============================================================================
// PROJECTS HOOKS — TanStack Query hooks for project CRUD
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsRepository } from '@app/repository/projects-repository';
import { queryKeys } from '@core/lib/QueryClient';
import { toast } from '@store/toast.store';

/** Fetch all projects — optional params: { category, limit } */
export const useProjects = (params) =>
  useQuery({
    queryKey: queryKeys.projects.list(params),
    queryFn: () => projectsRepository.getAll(params).then((r) => r.data.data),
  });

/** Fetch a single project by id */
export const useProject = (id) =>
  useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectsRepository.getById(id).then((r) => r.data.data),
    enabled: !!id,
  });

/** Create a new project */
export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => projectsRepository.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects.all });
      toast.success('Project created');
    },
    onError: (err) => toast.error(err.message),
  });
};

/** Update an existing project */
export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => projectsRepository.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects.all });
      toast.success('Project updated');
    },
    onError: (err) => toast.error(err.message),
  });
};

/** Delete a project */
export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => projectsRepository.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects.all });
      toast.success('Project deleted');
    },
    onError: (err) => toast.error(err.message),
  });
};
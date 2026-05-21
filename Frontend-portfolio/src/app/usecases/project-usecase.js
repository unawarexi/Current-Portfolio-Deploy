// ============================================================================
// PROJECT USE-CASE — projects page logic, decoupled from UI
// ============================================================================
import { useState, useMemo, useEffect } from 'react';
import { useProjects, useProject } from '@hooks/api-hooks/useProjects';
import { usePortfolioStore } from '@store/portfolio.store';
import { useNavigate, useParams } from 'react-router-dom';

// Static fallback data used when backend isn't available
import projects from '@core/data/portfolio-data';

/**
 * Provides filtered project list + selection handler for the Portfolio pages.
 * Falls back to static data if the API hasn't returned yet.
 */
export const useProjectsUsecase = () => {
  const [category, setCategory] = useState('General Overview');
  const { data: apiProjects, isLoading } = useProjects();
  const { setSelectedProject } = usePortfolioStore();
  const navigate = useNavigate();

  // Prefer live API data; fall back to static data during initial load
  const allProjects = apiProjects ?? projects;

  const filtered = useMemo(() => {
    if (category === 'General Overview') return allProjects;
    return allProjects.filter((p) =>
      (p.category ?? '').toLowerCase() === category.toLowerCase()
    );
  }, [allProjects, category]);

  const handleSelect = (project) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}`);
  };

  return { filtered, isLoading, category, setCategory, handleSelect };
};

/**
 * Provides the currently selected project for the SinglePortfolio page.
 * Fetches fresh data from the API by id from URL params;
 * falls back to Zustand store if navigated via card click.
 */
export const useSingleProjectUsecase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProject, setSelectedProject } = usePortfolioStore();
  const { data: apiProject, isLoading } = useProject(id);

  // Sync fresh API data into the store so other consumers stay current
  useEffect(() => {
    if (apiProject) setSelectedProject(apiProject);
  }, [apiProject, setSelectedProject]);

  const project = apiProject ?? selectedProject ?? null;
  const handleEdit = () => navigate(`/auth/edit-project/${id}`);
  return { project, isLoading, setProject: setSelectedProject, handleEdit };
};

/**
 * Provides data and navigation for the edit-project admin page.
 */
export const useEditProjectUsecase = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(id);
  const onSuccess = () => navigate(`/projects/${id}`);
  return { id, project, isLoading, onSuccess };
};

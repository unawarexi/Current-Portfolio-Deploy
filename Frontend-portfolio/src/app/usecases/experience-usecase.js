// ============================================================================
// EXPERIENCE USE-CASE — public experience list + single detail
// ============================================================================
import { useExperience, useExperienceItem } from '@hooks/api-hooks/useExperience';
import { useExperienceStore } from '@store/experience.store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// Static fallback (matches existing static data shape used in ExperienceSection)
import { experienceFallback } from '@core/data/experience-data';

/** Public listing — feeds ExperienceSection */
export const useExperienceUsecase = () => {
  const { data: apiData, isLoading } = useExperience();
  const { setSelectedExperience } = useExperienceStore();
  const navigate = useNavigate();

  const items = apiData?.length ? apiData : (experienceFallback ?? []);

  const handleSelect = (exp) => {
    setSelectedExperience(exp);
    navigate(`/experience/${exp.id}`);
  };

  return { items, isLoading: isLoading && !apiData, handleSelect };
};

/** Single detail page */
export const useSingleExperienceUsecase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedExperience, setSelectedExperience } = useExperienceStore();
  const { data: apiItem, isLoading } = useExperienceItem(id);

  useEffect(() => {
    if (apiItem) setSelectedExperience(apiItem);
  }, [apiItem, setSelectedExperience]);

  const handleEdit = () => navigate(`/auth/edit-experience/${id}`);
  return { item: apiItem ?? selectedExperience, isLoading, id, handleEdit };
};

/**
 * Provides data and navigation for the edit-experience admin page.
 */
export const useEditExperienceUsecase = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading } = useExperienceItem(id);
  const onSuccess = () => navigate(`/experience/${id}`);
  return { id, item, isLoading, onSuccess };
};

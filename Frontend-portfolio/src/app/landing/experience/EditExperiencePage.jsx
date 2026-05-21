// ============================================================================
// EDIT EXPERIENCE PAGE — loads experience by :id then renders form in edit mode
// ============================================================================
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useEditExperienceUsecase } from '@app/usecases/experience-usecase';
import { PageLoader } from '@components/ui/Spinner';
import { ArrowLeft } from '@core/constants/icons';
import ExperienceTabbedForm from './ExperienceTabbedForm';

const EditExperiencePage = () => {
  const { id, item, isLoading, onSuccess } = useEditExperienceUsecase();

  if (isLoading) return <PageLoader />;
  if (!item)     return <Navigate to="/#experience" replace />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b18] py-12 px-4 relative">
      {/* Back link */}
      <div className="max-w-3xl mx-auto mb-4">
        <Link
          to={`/experience/${id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400 hover:text-primary-500 transition"
        >
          <ArrowLeft size={14} /> Back to experience
        </Link>
      </div>

      <ExperienceTabbedForm
        editItem={{ ...item, id }}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default EditExperiencePage;

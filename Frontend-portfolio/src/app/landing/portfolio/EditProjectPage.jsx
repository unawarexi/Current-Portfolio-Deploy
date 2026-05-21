// ============================================================================
// EDIT PROJECT PAGE — loads project by :id then renders TabbedForm in edit mode
// ============================================================================
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useEditProjectUsecase } from '@app/usecases/project-usecase';
import { PageLoader } from '@components/ui/Spinner';
import { ArrowLeft } from '@core/constants/icons';
import TabbedForm from '@landing/projects/TabbedForm';

const EditProjectPage = () => {
  const { id, project, isLoading, onSuccess } = useEditProjectUsecase();

  if (isLoading) return <PageLoader />;
  if (!project)  return <Navigate to="/projects" replace />;

  return (
    <div className="relative">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400 hover:text-primary-500 transition"
        >
          <ArrowLeft size={14} /> Back to project
        </Link>
      </div>

      <TabbedForm
        editItem={{ ...project, id }}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default EditProjectPage;

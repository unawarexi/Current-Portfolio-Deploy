// ============================================================================
// TABBED FORM — Add / edit a project (4 tabs)
// Logic lives in useProjectFormUsecase; this is pure layout.
// ============================================================================
import React from 'react';
import { useProjectFormUsecase } from '@app/usecases/project-form-usecase';
import ProjectInfoForm    from './form_components/ProjectForm';
import ProjectDetailsForm from './form_components/ProjectDetails';
import ImageUploads       from './upload_cloudinary/ImageUploads';
import ProjectStack       from './form_components/ProjectStack';
import { ArrowLeft, ArrowRight, Check, RefreshCw } from '@core/constants/icons';

const TABS = [
  { id: 'info',    label: 'Info',    step: 1 },
  { id: 'details', label: 'Details', step: 2 },
  { id: 'images',  label: 'Images',  step: 3 },
  { id: 'stack',   label: 'Stack',   step: 4 },
];

const TabbedForm = () => {
  const usecase = useProjectFormUsecase();
  const { activeTab, setActiveTab, submit, isPending, formErrors } = usecase;

  const currentIdx = TABS.findIndex((t) => t.id === activeTab);
  const isLast     = currentIdx === TABS.length - 1;
  const isFirst    = currentIdx === 0;

  const goNext = () => { if (!isLast)  setActiveTab(TABS[currentIdx + 1].id); };
  const goPrev = () => { if (!isFirst) setActiveTab(TABS[currentIdx - 1].id); };

  // Count errors per tab to show indicator badges
  const infoErrorFields    = ['title', 'description', 'category', 'type', 'features', 'githubLink', 'webLiveLink', 'googlePlayLink', 'appStoreLink', 'videoUrl'];
  const detailErrorFields  = ['client', 'role', 'duration', 'status', 'year', 'challenges', 'solution', 'results'];
  const errorCount = (fields) => fields.filter((f) => formErrors[f]).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b18] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Add Project
          </h1>
          <p className="text-gray-500 dark:text-neutral-400 text-sm">
            Step {currentIdx + 1} of {TABS.length} — {TABS[currentIdx].label}
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / TABS.length) * 100}%` }}
          />
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 bg-white dark:bg-gray-900 rounded-xl p-1 mb-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          {TABS.map((t) => {
            const errs = t.id === 'info' ? errorCount(infoErrorFields) : t.id === 'details' ? errorCount(detailErrorFields) : 0;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`relative flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === t.id
                    ? 'bg-primary-500 text-white shadow'
                    : 'text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.step}</span>
                {errs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                    {errs}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <form onSubmit={submit} encType="multipart/form-data">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-8 mb-6">
            {activeTab === 'info'    && <ProjectInfoForm    usecase={usecase} />}
            {activeTab === 'details' && <ProjectDetailsForm usecase={usecase} />}
            {activeTab === 'images'  && <ImageUploads       usecase={usecase} />}
            {activeTab === 'stack'   && <ProjectStack       usecase={usecase} />}
          </div>

          {/* Footer nav */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={usecase.reset}
              className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-neutral-500 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <RefreshCw size={13} /> Clear form
            </button>

            <div className="flex gap-3">
              {!isFirst && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              {!isLast ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  Next <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <Check size={14} /> {isPending ? 'Saving…' : 'Save Project'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TabbedForm;

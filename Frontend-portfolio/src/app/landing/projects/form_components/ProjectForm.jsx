// ============================================================================
// PROJECT INFO FORM — Tab 1: title, description, category, type, links, features
// Pure UI — receives { usecase } prop
// ============================================================================
import React from 'react';
import { cn } from '@utils/cn';

const CATEGORIES = ['Web', 'Mobile', 'Blockchain', 'Other'];
const TYPES      = ['Personal', 'Client', 'Open Source'];

const Field = ({ label, required, error, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label className={cn('text-sm font-medium', error ? 'text-red-500' : 'text-gray-700 dark:text-gray-300')}>
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {hint && <span className="text-[10px] text-gray-400">{hint}</span>}
    </div>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Input = ({ error, ...props }) => (
  <input
    className={cn(
      'h-10 w-full px-3.5 rounded-lg text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
      'placeholder-gray-400 dark:placeholder-gray-600',
      'focus:ring-2 focus:ring-primary-500 focus:outline-none transition',
      error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-700',
    )}
    {...props}
  />
);

const Textarea = ({ error, rows = 4, ...props }) => (
  <textarea
    rows={rows}
    className={cn(
      'w-full px-3.5 py-2.5 rounded-lg text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-y',
      'placeholder-gray-400 dark:placeholder-gray-600',
      'focus:ring-2 focus:ring-primary-500 focus:outline-none transition',
      error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-700',
    )}
    {...props}
  />
);

const Select = ({ error, children, ...props }) => (
  <select
    className={cn(
      'h-10 w-full px-3.5 rounded-lg text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
      'focus:ring-2 focus:ring-primary-500 focus:outline-none transition',
      error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-700',
    )}
    {...props}
  >
    {children}
  </select>
);

const ProjectForm = ({ usecase }) => {
  const { form, setField, formErrors: err } = usecase;

  return (
    <div className="space-y-6">
      {/* Title + Description */}
      <Field label="Project Title" required error={err.title}>
        <Input
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          placeholder="My Awesome Project"
          error={err.title}
        />
      </Field>

      <Field label="Description" required error={err.description} hint={`${form.description.length}/2000`}>
        <Textarea
          rows={4}
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="A clear overview of what the project does and why it matters…"
          maxLength={2000}
          error={err.description}
        />
      </Field>

      {/* Category + Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Category" required error={err.category}>
          <Select value={form.category} onChange={(e) => setField('category', e.target.value)} error={err.category}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Project Type" error={err.type}>
          <Select value={form.type} onChange={(e) => setField('type', e.target.value)} error={err.type}>
            <option value="">Select type</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
      </div>

      {/* Features */}
      <Field label="Key Features" error={err.features} hint="One per line">
        <Textarea
          rows={4}
          value={form.features}
          onChange={(e) => setField('features', e.target.value)}
          placeholder={"User authentication\nReal-time notifications\nDashboard analytics"}
          error={err.features}
        />
      </Field>

      {/* Links section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="GitHub" error={err.githubLink}>
            <Input
              type="url"
              value={form.githubLink}
              onChange={(e) => setField('githubLink', e.target.value)}
              placeholder="https://github.com/user/repo"
              error={err.githubLink}
            />
          </Field>
          <Field label="Live Demo" error={err.webLiveLink}>
            <Input
              type="url"
              value={form.webLiveLink}
              onChange={(e) => setField('webLiveLink', e.target.value)}
              placeholder="https://myproject.com"
              error={err.webLiveLink}
            />
          </Field>
          <Field label="Google Play" error={err.googlePlayLink}>
            <Input
              type="url"
              value={form.googlePlayLink}
              onChange={(e) => setField('googlePlayLink', e.target.value)}
              placeholder="https://play.google.com/…"
              error={err.googlePlayLink}
            />
          </Field>
          <Field label="App Store" error={err.appStoreLink}>
            <Input
              type="url"
              value={form.appStoreLink}
              onChange={(e) => setField('appStoreLink', e.target.value)}
              placeholder="https://apps.apple.com/…"
              error={err.appStoreLink}
            />
          </Field>
          <Field label="Demo Video URL" error={err.videoUrl} hint="YouTube/Vimeo">
            <Input
              type="url"
              value={form.videoUrl}
              onChange={(e) => setField('videoUrl', e.target.value)}
              placeholder="https://youtube.com/…"
              error={err.videoUrl}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

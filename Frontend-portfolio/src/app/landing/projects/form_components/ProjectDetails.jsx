// ============================================================================
// PROJECT DETAILS FORM — Tab 2: context, challenges, solution, results
// Pure UI — receives { usecase } prop
// ============================================================================
import React from 'react';
import { cn } from '@utils/cn';

const Field = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className={cn('text-sm font-medium', error ? 'text-red-500' : 'text-gray-700 dark:text-gray-300')}>
      {label}{required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Input = ({ error, ...props }) => (
  <input
    className={cn(
      'h-10 w-full px-3.5 rounded-lg text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
      'focus:ring-2 focus:ring-primary-500 focus:outline-none transition',
      error
        ? 'border-red-400 focus:ring-red-400'
        : 'border-gray-300 dark:border-gray-700',
    )}
    {...props}
  />
);

const Textarea = ({ error, rows = 4, ...props }) => (
  <textarea
    rows={rows}
    className={cn(
      'w-full px-3.5 py-2.5 rounded-lg text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-y',
      'focus:ring-2 focus:ring-primary-500 focus:outline-none transition',
      error
        ? 'border-red-400 focus:ring-red-400'
        : 'border-gray-300 dark:border-gray-700',
    )}
    {...props}
  />
);

const Select = ({ error, children, ...props }) => (
  <select
    className={cn(
      'h-10 w-full px-3.5 rounded-lg text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
      'focus:ring-2 focus:ring-primary-500 focus:outline-none transition',
      error
        ? 'border-red-400 focus:ring-red-400'
        : 'border-gray-300 dark:border-gray-700',
    )}
    {...props}
  >
    {children}
  </select>
);

const ProjectDetails = ({ usecase }) => {
  const { form, setField, formErrors: err } = usecase;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Project Context</h2>
        <p className="text-xs text-gray-500 dark:text-neutral-400 mb-4">
          Client details, your role, and the project timeline.
        </p>
      </div>

      {/* Row: client + role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Client / Company" error={err.client}>
          <Input
            value={form.client}
            onChange={(e) => setField('client', e.target.value)}
            placeholder="Acme Corp"
            error={err.client}
          />
        </Field>
        <Field label="Your Role" error={err.role}>
          <Input
            value={form.role}
            onChange={(e) => setField('role', e.target.value)}
            placeholder="Lead Frontend Developer"
            error={err.role}
          />
        </Field>
      </div>

      {/* Row: duration + year + status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Duration" error={err.duration}>
          <Input
            value={form.duration}
            onChange={(e) => setField('duration', e.target.value)}
            placeholder="3 months"
            error={err.duration}
          />
        </Field>
        <Field label="Year" error={err.year}>
          <Input
            value={form.year}
            onChange={(e) => setField('year', e.target.value)}
            placeholder="2024"
            error={err.year}
          />
        </Field>
        <Field label="Status" error={err.status}>
          <Select
            value={form.status}
            onChange={(e) => setField('status', e.target.value)}
            error={err.status}
          >
            <option value="">Select status</option>
            <option value="Live">Live</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </Select>
        </Field>
      </div>

      {/* Challenges */}
      <Field label="Challenges" error={err.challenges}>
        <Textarea
          rows={4}
          value={form.challenges}
          onChange={(e) => setField('challenges', e.target.value)}
          placeholder="Describe the main challenges you faced during this project…"
          error={err.challenges}
        />
      </Field>

      {/* Solution */}
      <Field label="Solution" error={err.solution}>
        <Textarea
          rows={4}
          value={form.solution}
          onChange={(e) => setField('solution', e.target.value)}
          placeholder="How did you solve the challenges? What approach did you take…"
          error={err.solution}
        />
      </Field>

      {/* Results */}
      <Field label="Results / Outcomes" error={err.results}>
        <Textarea
          rows={4}
          value={form.results}
          onChange={(e) => setField('results', e.target.value)}
          placeholder="What were the measurable outcomes? e.g. 40% faster load times, 2000+ users…"
          error={err.results}
        />
      </Field>
    </div>
  );
};

export default ProjectDetails;

// ============================================================================
// EXPERIENCE TABBED FORM — admin form to add/edit experience entries
// ============================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RefreshCw, Briefcase } from '@core/constants/icons';
import { useExperienceFormUsecase } from '@app/usecases/experience-form-usecase';

const TYPES = ['Web Development', 'Mobile Development', 'Blockchain', 'Others'];
const TABS  = [
  { id: 'basics',  label: 'Basics',  fields: ['company','role','year','type','subCategory','isCurrent','order'] },
  { id: 'content', label: 'Content', fields: ['description','impact'] },
  { id: 'lists',   label: 'Lists',   fields: ['skills','achievements','productsBuilt'] },
];

const Field = ({ label, error, children, hint }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">{label}</label>
    {children}
    {hint  && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
  </div>
);

const inputCls = "w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition";
const textareaCls = `${inputCls} resize-none`;

const ExperienceTabbedForm = ({ editItem = null, onSuccess }) => {
  const uc = useExperienceFormUsecase(editItem);
  const currentIdx = TABS.findIndex((t) => t.id === (uc.activeTab || 'basics'));
  const [activeTab, setActiveTab] = React.useState('basics');

  const errCount = (tab) => tab.fields.filter((f) => uc.formErrors[f]).length;

  const handleSubmit = async () => {
    try {
      await uc.submit();
      onSuccess?.();
    } catch (_) {}
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <Briefcase size={20} className="text-primary-500" />
        <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
          {editItem ? 'Edit Experience' : 'Add Experience'}
        </h2>
      </div>

      {/* Progress */}
      <div className="h-1 bg-gray-100 dark:bg-gray-800">
        <div
          className="h-full bg-primary-500 transition-all duration-400"
          style={{ width: `${((currentIdx + 1) / TABS.length) * 100}%` }}
        />
      </div>

      {/* Tab buttons */}
      <div className="flex border-b border-gray-100 dark:border-gray-800">
        {TABS.map((tab, i) => {
          const cnt = errCount(tab);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-3 text-xs font-semibold tracking-wide transition-all
                ${activeTab === tab.id ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <span className="text-[10px] text-gray-300 dark:text-gray-600 mr-1">{i + 1}.</span>
              {tab.label}
              {cnt > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold">{cnt}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Form body */}
      <div className="p-6 space-y-5 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* ── BASICS ── */}
            {activeTab === 'basics' && (
              <>
                <Field label="Company / Organisation *" error={uc.formErrors.company}>
                  <input className={inputCls} value={uc.form.company} onChange={(e) => uc.setField('company', e.target.value)} placeholder="e.g. Dowell Technologies" />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Role / Title *" error={uc.formErrors.role}>
                    <input className={inputCls} value={uc.form.role} onChange={(e) => uc.setField('role', e.target.value)} placeholder="e.g. Frontend Developer" />
                  </Field>
                  <Field label="Year / Period *" error={uc.formErrors.year}>
                    <input className={inputCls} value={uc.form.year} onChange={(e) => uc.setField('year', e.target.value)} placeholder="e.g. 2022 – 2023" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Type" error={uc.formErrors.type}>
                    <select className={inputCls} value={uc.form.type} onChange={(e) => uc.setField('type', e.target.value)}>
                      {TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Sub-category" error={uc.formErrors.subCategory} hint="e.g. Frontend, Fullstack, Backend">
                    <input className={inputCls} value={uc.form.subCategory} onChange={(e) => uc.setField('subCategory', e.target.value)} placeholder="Frontend" />
                  </Field>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    checked={uc.form.isCurrent}
                    onChange={(e) => uc.setField('isCurrent', e.target.checked)}
                    className="w-4 h-4 rounded text-primary-600"
                  />
                  <label htmlFor="isCurrent" className="text-sm text-gray-700 dark:text-gray-300">Currently working here</label>
                </div>
                <Field label="Sort Order" hint="Lower number = appears first">
                  <input type="number" className={inputCls} value={uc.form.order} onChange={(e) => uc.setField('order', e.target.value)} />
                </Field>
              </>
            )}

            {/* ── CONTENT ── */}
            {activeTab === 'content' && (
              <>
                <Field label="Description *" error={uc.formErrors.description} hint="Describe what you did at this company">
                  <textarea rows={5} className={textareaCls} value={uc.form.description} onChange={(e) => uc.setField('description', e.target.value)} placeholder="I was responsible for..." />
                </Field>
                <Field label="Impact / Key Contribution" error={uc.formErrors.impact} hint="Quantify your impact where possible">
                  <textarea rows={4} className={textareaCls} value={uc.form.impact} onChange={(e) => uc.setField('impact', e.target.value)} placeholder="Increased performance by 40%, led a team of 5..." />
                </Field>
              </>
            )}

            {/* ── LISTS ── */}
            {activeTab === 'lists' && (
              <>
                <Field label="Skills Used" error={uc.formErrors.skills} hint="One per line">
                  <textarea rows={4} className={textareaCls} value={uc.form.skills} onChange={(e) => uc.setField('skills', e.target.value)} placeholder={"React\nNode.js\nFirebase"} />
                </Field>
                <Field label="Achievements" error={uc.formErrors.achievements} hint="One per line">
                  <textarea rows={4} className={textareaCls} value={uc.form.achievements} onChange={(e) => uc.setField('achievements', e.target.value)} placeholder={"Delivered project 2 weeks early\nReceived employee of the month"} />
                </Field>
                <Field label="Products Built" error={uc.formErrors.productsBuilt} hint="One per line">
                  <textarea rows={3} className={textareaCls} value={uc.form.productsBuilt} onChange={(e) => uc.setField('productsBuilt', e.target.value)} placeholder={"Customer dashboard\nMobile delivery app"} />
                </Field>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {currentIdx > 0 && (
            <button onClick={() => setActiveTab(TABS[currentIdx - 1].id)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-400 transition">
              <ArrowLeft size={13} /> Back
            </button>
          )}
          {currentIdx < TABS.length - 1 && (
            <button onClick={() => setActiveTab(TABS[currentIdx + 1].id)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition">
              Next <ArrowRight size={13} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={uc.reset} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 transition">
            <RefreshCw size={13} /> Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={uc.isPending}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition disabled:opacity-60"
          >
            <Check size={14} /> {uc.isPending ? 'Saving…' : 'Save Experience'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTabbedForm;

// ============================================================================
// TABBED FORM — Unified admin panel (6 sliding tabs)
// Tabs 1-4: Project form steps  |  Tab 5: Experience  |  Tab 6: About profile
// Logic lives entirely in usecase hooks — this file is pure layout.
// ============================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectFormUsecase }    from '@app/usecases/project-form-usecase';
import { useExperienceFormUsecase } from '@app/usecases/experience-form-usecase';
import { useAboutFormUsecase }       from '@app/usecases/about-form-usecase';
import DynamicFieldList from '@app/components/DynamicFieldList';
import DynamicObjectList from '@app/components/DynamicObjectList';

// Project sub-forms
import ProjectInfoForm    from './form_components/ProjectForm';
import ProjectDetailsForm from './form_components/ProjectDetails';
import ImageUploads       from './upload_cloudinary/ImageUploads';
import ProjectStack       from './form_components/ProjectStack';
import {
  ArrowLeft, ArrowRight, Check, RefreshCw,
  Briefcase, User, Upload,
} from '@core/constants/icons';

// ─── Shared field wrapper ──────────────────────────────────────────────────
const Field = ({ label, error, children, hint }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">{label}</label>
    {children}
    {hint  && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
  </div>
);
const inputCls    = 'w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition';
const textareaCls = `${inputCls} resize-none`;

// ─── Top-level tab definitions ─────────────────────────────────────────────
const ALL_TABS = [
  { id: 'info',       label: 'Info',       group: 'project',    step: 1 },
  { id: 'details',    label: 'Details',    group: 'project',    step: 2 },
  { id: 'images',     label: 'Images',     group: 'project',    step: 3 },
  { id: 'stack',      label: 'Stack',      group: 'project',    step: 4 },
  { id: 'experience', label: 'Experience', group: 'experience', step: 5 },
  { id: 'about',      label: 'About',      group: 'about',      step: 6 },
];

// Experience inner tabs
const EXP_TABS  = [
  { id: 'basics',  label: 'Basics',  fields: ['company','role','year','type','subCategory','isCurrent','order'] },
  { id: 'content', label: 'Content', fields: ['description','impact'] },
  { id: 'lists',   label: 'Lists',   fields: ['skills','technologies','achievements','productsBuilt'] },
];
const EXP_TYPES = ['Web Development', 'Mobile Development', 'Blockchain', 'Others'];

// About inner tabs
const ABOUT_TABS = [
  { id: 'identity', label: 'Identity', fields: ['name','headline','tagline','bio','openToWork','availabilityNote'] },
  { id: 'story',    label: 'Story',    fields: ['history','vision','mission','philosophy'] },
  { id: 'goals',    label: 'Goals',    fields: ['goals','currentFocus','values','funFacts','hobbies'] },
  { id: 'creds',    label: 'Creds',    fields: ['education','certifications','languages','yearsOfExperience','projectsCount','clientsCount','rating'] },
  { id: 'socials',  label: 'Socials',  fields: [] },
  { id: 'cv',       label: 'CV',       fields: [] },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const TabbedForm = ({ editItem = null, onSuccess }) => {
  // ── Usecases ───────────────────────────────────────────────────────────
  const projectUc    = useProjectFormUsecase(editItem);
  const experienceUc = useExperienceFormUsecase();
  const aboutUc      = useAboutFormUsecase();

  // ── Top-level tab navigation ───────────────────────────────────────────
  const [activeTab, setActiveTab] = React.useState('info');
  const currentIdx = ALL_TABS.findIndex((t) => t.id === activeTab);
  const current    = ALL_TABS[currentIdx];
  const isFirst    = currentIdx === 0;
  const isLast     = currentIdx === ALL_TABS.length - 1;

  // Error badges for project tabs
  const projInfoFields   = ['title','description','category','type','features','githubLink','webLiveLink','googlePlayLink','appStoreLink','videoUrl'];
  const projDetailFields = ['client','role','duration','status','year','challenges','solution','results'];
  const projErrCount = (fields) => fields.filter((f) => projectUc.formErrors[f]).length;
  const expErrCount   = (tab) => tab.fields.filter((f) => experienceUc.formErrors[f]).length;
  const aboutErrCount = (tab) => tab.fields.filter((f) => aboutUc.formErrors[f]).length;

  // ── Submit handlers ────────────────────────────────────────────────────
  const handleProjectSubmit = async (e) => {
    e?.preventDefault();
    await projectUc.submit(e);
    onSuccess?.();
  };
  const handleExpSubmit = async () => {
    try { await experienceUc.submit(); } catch (_) {}
  };
  const handleAboutSubmit = async () => {
    try { await aboutUc.submit(); } catch (_) {}
  };
  const handleCvSubmit = async () => {
    try { await aboutUc.submitCv(); } catch (_) {}
  };

  const heading = editItem
    ? 'Edit Project'
    : current.group === 'experience' ? 'Add Experience'
    : current.group === 'about'      ? 'Edit Profile'
    : 'Add Project';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b18] py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-1">{heading}</h1>
          <p className="text-gray-500 dark:text-neutral-400 text-sm">
            Tab {currentIdx + 1} of {ALL_TABS.length} — {current.label}
          </p>
        </div>

        {/* ── Master progress bar ───────────────────────────────────── */}
        <div className="relative h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / ALL_TABS.length) * 100}%` }}
          />
        </div>

        {/* ── Scrollable top tab bar ────────────────────────────────── */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar bg-white dark:bg-gray-900 rounded-xl p-1 mb-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          {ALL_TABS.map((t) => {
            const errs =
              t.id === 'info'    ? projErrCount(projInfoFields) :
              t.id === 'details' ? projErrCount(projDetailFields) : 0;
            const showDivider = t.id === 'experience';
            return (
              <React.Fragment key={t.id}>
                {showDivider && <div className="flex-shrink-0 w-px bg-gray-200 dark:bg-gray-700 mx-0.5" />}
                <button
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    activeTab === t.id
                      ? 'bg-primary-500 text-white shadow'
                      : 'text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {t.group === 'experience' && <Briefcase size={11} />}
                  {t.group === 'about'      && <User      size={11} />}
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.step}</span>
                  {errs > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                      {errs}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════
            TAB PANELS
        ══════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >

            {/* ── PROJECT TABS 1-4 ─────────────────────────────────── */}
            {current.group === 'project' && (
              <form onSubmit={handleProjectSubmit} encType="multipart/form-data">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-8 mb-6">
                  {activeTab === 'info'    && <ProjectInfoForm    usecase={projectUc} />}
                  {activeTab === 'details' && <ProjectDetailsForm usecase={projectUc} />}
                  {activeTab === 'images'  && <ImageUploads       usecase={projectUc} />}
                  {activeTab === 'stack'   && <ProjectStack       usecase={projectUc} />}
                </div>
                <div className="flex justify-between items-center">
                  <button type="button" onClick={projectUc.reset}
                    className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-neutral-500 hover:text-gray-700 dark:hover:text-white transition-colors">
                    <RefreshCw size={13} /> Clear form
                  </button>
                  <div className="flex gap-3">
                    {!isFirst && (
                      <button type="button" onClick={() => setActiveTab(ALL_TABS[currentIdx - 1].id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <ArrowLeft size={14} /> Back
                      </button>
                    )}
                    {activeTab !== 'stack' ? (
                      <button type="button" onClick={() => setActiveTab(ALL_TABS[currentIdx + 1].id)}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">
                        Next <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button type="submit" disabled={projectUc.isPending}
                        className="flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                        <Check size={14} /> {projectUc.isPending ? 'Saving…' : 'Save Project'}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}

            {/* ── EXPERIENCE TAB 5 ─────────────────────────────────── */}
            {activeTab === 'experience' && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <Briefcase size={18} className="text-primary-500" />
                  <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">Add / Edit Experience</h2>
                </div>
                <div className="h-1 bg-gray-100 dark:bg-gray-800">
                  <div className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${((EXP_TABS.findIndex((t) => t.id === experienceUc.activeTab) + 1) / EXP_TABS.length) * 100}%` }} />
                </div>
                <div className="flex border-b border-gray-100 dark:border-gray-800">
                  {EXP_TABS.map((tab, i) => {
                    const cnt = expErrCount(tab);
                    return (
                      <button key={tab.id} type="button" onClick={() => experienceUc.setActiveTab(tab.id)}
                        className={`relative flex-1 py-3 text-xs font-semibold tracking-wide transition-all
                          ${experienceUc.activeTab === tab.id ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
                        <span className="text-[10px] text-gray-300 dark:text-gray-600 mr-1">{i + 1}.</span>
                        {tab.label}
                        {cnt > 0 && <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold">{cnt}</span>}
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={experienceUc.activeTab} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}
                    className="p-6 space-y-5 min-h-[320px]">
                    {experienceUc.activeTab === 'basics' && (<>
                      <Field label="Company / Organisation *" error={experienceUc.formErrors.company}>
                        <input className={inputCls} value={experienceUc.form.company} onChange={(e) => experienceUc.setField('company', e.target.value)} placeholder="e.g. Dowell Technologies" />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Role / Title *" error={experienceUc.formErrors.role}>
                          <input className={inputCls} value={experienceUc.form.role} onChange={(e) => experienceUc.setField('role', e.target.value)} placeholder="Frontend Developer" />
                        </Field>
                        <Field label="Year / Period *" error={experienceUc.formErrors.year}>
                          <input className={inputCls} value={experienceUc.form.year} onChange={(e) => experienceUc.setField('year', e.target.value)} placeholder="2022 – 2023" />
                        </Field>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Type">
                          <select className={inputCls} value={experienceUc.form.type} onChange={(e) => experienceUc.setField('type', e.target.value)}>
                            {EXP_TYPES.map((t) => <option key={t}>{t}</option>)}
                          </select>
                        </Field>
                        <Field label="Sub-category" hint="e.g. Frontend, Fullstack">
                          <input className={inputCls} value={experienceUc.form.subCategory} onChange={(e) => experienceUc.setField('subCategory', e.target.value)} placeholder="Frontend" />
                        </Field>
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="expIsCurrent" checked={experienceUc.form.isCurrent} onChange={(e) => experienceUc.setField('isCurrent', e.target.checked)} className="w-4 h-4 rounded text-primary-600" />
                        <label htmlFor="expIsCurrent" className="text-sm text-gray-700 dark:text-gray-300">Currently working here</label>
                      </div>
                      <Field label="Sort Order" hint="Lower = appears first">
                        <input type="number" className={inputCls} value={experienceUc.form.order} onChange={(e) => experienceUc.setField('order', e.target.value)} />
                      </Field>
                    </>)}
                    {experienceUc.activeTab === 'content' && (<>
                      <Field label="Description *" error={experienceUc.formErrors.description} hint="What did you do here?">
                        <textarea rows={5} className={textareaCls} value={experienceUc.form.description} onChange={(e) => experienceUc.setField('description', e.target.value)} placeholder="I was responsible for…" />
                      </Field>
                      <Field label="Impact / Key Contribution" hint="Quantify your impact">
                        <textarea rows={4} className={textareaCls} value={experienceUc.form.impact} onChange={(e) => experienceUc.setField('impact', e.target.value)} placeholder="Increased performance by 40%…" />
                      </Field>
                    </>)}
                    {experienceUc.activeTab === 'lists' && (<>
                      <DynamicFieldList title="Skills Used" items={experienceUc.form.skills} onChange={(v) => experienceUc.setField('skills', v)} placeholder="E.g. React" />
                      <DynamicFieldList title="Technologies" items={experienceUc.form.technologies} onChange={(v) => experienceUc.setField('technologies', v)} placeholder="E.g. Node.js" />
                      <DynamicFieldList title="Achievements" items={experienceUc.form.achievements} onChange={(v) => experienceUc.setField('achievements', v)} placeholder="E.g. Delivered 2 weeks early" />
                      <DynamicFieldList title="Products Built" items={experienceUc.form.productsBuilt} onChange={(v) => experienceUc.setField('productsBuilt', v)} placeholder="E.g. Customer dashboard" />
                    </>)}
                  </motion.div>
                </AnimatePresence>
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {EXP_TABS.findIndex((t) => t.id === experienceUc.activeTab) > 0 && (
                      <button type="button" onClick={() => experienceUc.setActiveTab(EXP_TABS[EXP_TABS.findIndex((t) => t.id === experienceUc.activeTab) - 1].id)}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-400 transition">
                        <ArrowLeft size={13} /> Back
                      </button>
                    )}
                    {EXP_TABS.findIndex((t) => t.id === experienceUc.activeTab) < EXP_TABS.length - 1 && (
                      <button type="button" onClick={() => experienceUc.setActiveTab(EXP_TABS[EXP_TABS.findIndex((t) => t.id === experienceUc.activeTab) + 1].id)}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition">
                        Next <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={experienceUc.reset} className="flex items-center gap-1.5 px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition">
                      <RefreshCw size={13} /> Clear
                    </button>
                    <button type="button" onClick={handleExpSubmit} disabled={experienceUc.isPending}
                      className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition disabled:opacity-60">
                      <Check size={14} /> {experienceUc.isPending ? 'Saving…' : 'Save Experience'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── ABOUT TAB 6 ──────────────────────────────────────── */}
            {activeTab === 'about' && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <User size={18} className="text-primary-500" />
                  <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                </div>
                <div className="h-1 bg-gray-100 dark:bg-gray-800">
                  <div className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${((ABOUT_TABS.findIndex((t) => t.id === aboutUc.activeTab) + 1) / ABOUT_TABS.length) * 100}%` }} />
                </div>
                <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800">
                  {ABOUT_TABS.map((tab, i) => {
                    const cnt = aboutErrCount(tab);
                    return (
                      <button key={tab.id} type="button" onClick={() => aboutUc.setActiveTab(tab.id)}
                        className={`flex-shrink-0 px-4 py-3 text-xs font-semibold tracking-wide whitespace-nowrap transition-all
                          ${aboutUc.activeTab === tab.id ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
                        <span className="text-[10px] text-gray-300 dark:text-gray-600 mr-1">{i + 1}.</span>
                        {tab.label}
                        {cnt > 0 && <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold">{cnt}</span>}
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={aboutUc.activeTab} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}
                    className="p-6 space-y-5 min-h-[340px]">
                    {aboutUc.activeTab === 'identity' && (<>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Full Name"><input className={inputCls} value={aboutUc.form.name} onChange={(e) => aboutUc.setField('name', e.target.value)} placeholder="Andrew Corps" /></Field>
                        <Field label="Headline"><input className={inputCls} value={aboutUc.form.headline} onChange={(e) => aboutUc.setField('headline', e.target.value)} placeholder="Full-Stack Developer" /></Field>
                      </div>
                      <Field label="Tagline"><input className={inputCls} value={aboutUc.form.tagline} onChange={(e) => aboutUc.setField('tagline', e.target.value)} placeholder="Building tomorrow's tech today" /></Field>
                      <Field label="Bio *" error={aboutUc.formErrors.bio} hint="Your main about-me paragraph">
                        <textarea rows={5} className={textareaCls} value={aboutUc.form.bio} onChange={(e) => aboutUc.setField('bio', e.target.value)} />
                      </Field>
                      <Field label="Availability Note" hint="e.g. Available for freelance from June 2026">
                        <input className={inputCls} value={aboutUc.form.availabilityNote} onChange={(e) => aboutUc.setField('availabilityNote', e.target.value)} />
                      </Field>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="openToWork" checked={aboutUc.form.openToWork} onChange={(e) => aboutUc.setField('openToWork', e.target.checked)} className="w-4 h-4 text-primary-600" />
                        <label htmlFor="openToWork" className="text-sm text-gray-700 dark:text-gray-300">Open to work / hire</label>
                      </div>
                    </>)}
                    {aboutUc.activeTab === 'story' && (<>
                      <Field label="My History / Journey" hint="Where you came from, how you got here">
                        <textarea rows={5} className={textareaCls} value={aboutUc.form.history} onChange={(e) => aboutUc.setField('history', e.target.value)} placeholder="I started coding in 2018 when…" />
                      </Field>
                      <Field label="Vision"><textarea rows={3} className={textareaCls} value={aboutUc.form.vision} onChange={(e) => aboutUc.setField('vision', e.target.value)} /></Field>
                      <Field label="Mission"><textarea rows={3} className={textareaCls} value={aboutUc.form.mission} onChange={(e) => aboutUc.setField('mission', e.target.value)} /></Field>
                      <Field label="Philosophy / Working Style"><textarea rows={3} className={textareaCls} value={aboutUc.form.philosophy} onChange={(e) => aboutUc.setField('philosophy', e.target.value)} /></Field>
                    </>)}
                    {aboutUc.activeTab === 'goals' && (<>
                      <DynamicFieldList title="Goals" items={aboutUc.form.goals} onChange={(v) => aboutUc.setField('goals', v)} placeholder="E.g. Land senior role" />
                      <Field label="Current Focus"><input className={inputCls} value={aboutUc.form.currentFocus} onChange={(e) => aboutUc.setField('currentFocus', e.target.value)} placeholder="Blockchain development" /></Field>
                      <DynamicFieldList title="Core Values" items={aboutUc.form.values} onChange={(v) => aboutUc.setField('values', v)} placeholder="E.g. Integrity" />
                      <DynamicFieldList title="Fun Facts" items={aboutUc.form.funFacts} onChange={(v) => aboutUc.setField('funFacts', v)} placeholder="E.g. I can solve a Rubik's cube in 2 minutes" />
                      <DynamicFieldList title="Hobbies" items={aboutUc.form.hobbies} onChange={(v) => aboutUc.setField('hobbies', v)} placeholder="E.g. Chess" />
                    </>)}
                    {aboutUc.activeTab === 'creds' && (<>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Years of Experience"><input type="number" className={inputCls} value={aboutUc.form.yearsOfExperience} onChange={(e) => aboutUc.setField('yearsOfExperience', e.target.value)} /></Field>
                        <Field label="Projects Count"><input type="number" className={inputCls} value={aboutUc.form.projectsCount} onChange={(e) => aboutUc.setField('projectsCount', e.target.value)} /></Field>
                        <Field label="Clients Count"><input type="number" className={inputCls} value={aboutUc.form.clientsCount} onChange={(e) => aboutUc.setField('clientsCount', e.target.value)} /></Field>
                        <Field label="Rating (out of 5)"><input type="number" step="0.1" max="5" className={inputCls} value={aboutUc.form.rating} onChange={(e) => aboutUc.setField('rating', e.target.value)} /></Field>
                      </div>
                      <DynamicObjectList 
                        title="Education" 
                        items={aboutUc.form.education} 
                        onChange={(v) => aboutUc.setField('education', v)}
                        emptyItem={{ institution: '', degree: '', year: '' }}
                        fields={[
                          { name: 'institution', label: 'Institution', placeholder: 'Stanford University' },
                          { name: 'degree', label: 'Degree', placeholder: 'BSc Computer Science' },
                          { name: 'year', label: 'Year', placeholder: '2020 - 2024' }
                        ]}
                      />
                      <DynamicObjectList 
                        title="Certifications" 
                        items={aboutUc.form.certifications} 
                        onChange={(v) => aboutUc.setField('certifications', v)}
                        emptyItem={{ name: '', issuer: '', year: '', url: '' }}
                        fields={[
                          { name: 'name', label: 'Name', placeholder: 'AWS Certified Solutions Architect' },
                          { name: 'issuer', label: 'Issuer', placeholder: 'Amazon Web Services' },
                          { name: 'year', label: 'Year', placeholder: '2023' },
                          { name: 'url', label: 'URL', placeholder: 'https://...' }
                        ]}
                      />
                      <DynamicObjectList 
                        title="Languages" 
                        items={aboutUc.form.languages} 
                        onChange={(v) => aboutUc.setField('languages', v)}
                        emptyItem={{ name: '', level: '' }}
                        fields={[
                          { name: 'name', label: 'Language', placeholder: 'English' },
                          { name: 'level', label: 'Level', placeholder: 'Native / Fluent' }
                        ]}
                      />
                    </>)}
                    {aboutUc.activeTab === 'socials' && (<>
                      {['github','linkedin','twitter','instagram','website'].map((key) => (
                        <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                          <input className={inputCls} value={aboutUc.form.socials?.[key] || ''} onChange={(e) => aboutUc.setSocialField(key, e.target.value)}
                            placeholder={`https://${key === 'website' ? 'yoursite.com' : key + '.com/username'}`} />
                        </Field>
                      ))}
                    </>)}
                    {aboutUc.activeTab === 'cv' && (
                      <div className="space-y-5">
                        <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                          Upload your CV as a PDF. Hosted on Cloudinary — Hero download link updates automatically.
                        </div>
                        <Field label="CV / Resume (PDF)">
                          <div className="flex items-center gap-3">
                            <label className="flex-1 flex items-center gap-2 cursor-pointer px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 transition">
                              <Upload size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-500">{aboutUc.cvFile ? aboutUc.cvFile.name : 'Click to select PDF…'}</span>
                              <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => aboutUc.setCvFile(e.target.files?.[0] || null)} />
                            </label>
                            {aboutUc.cvFile && (
                              <button type="button" onClick={() => aboutUc.setCvFile(null)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                            )}
                          </div>
                        </Field>
                        <button type="button" onClick={handleCvSubmit} disabled={!aboutUc.cvFile || aboutUc.isCvPending}
                          className="w-full py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold transition disabled:opacity-50">
                          {aboutUc.isCvPending ? 'Uploading CV…' : 'Upload CV'}
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                {aboutUc.activeTab !== 'cv' && (
                  <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex gap-2">
                      {ABOUT_TABS.findIndex((t) => t.id === aboutUc.activeTab) > 0 && (
                        <button type="button" onClick={() => aboutUc.setActiveTab(ABOUT_TABS[ABOUT_TABS.findIndex((t) => t.id === aboutUc.activeTab) - 1].id)}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-400 transition">
                          <ArrowLeft size={13} /> Back
                        </button>
                      )}
                      {ABOUT_TABS.findIndex((t) => t.id === aboutUc.activeTab) < ABOUT_TABS.length - 2 && (
                        <button type="button" onClick={() => aboutUc.setActiveTab(ABOUT_TABS[ABOUT_TABS.findIndex((t) => t.id === aboutUc.activeTab) + 1].id)}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition">
                          Next <ArrowRight size={13} />
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={aboutUc.reset} className="flex items-center gap-1.5 px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition">
                        <RefreshCw size={12} /> Reset
                      </button>
                      <button type="button" onClick={handleAboutSubmit} disabled={aboutUc.isPending}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition disabled:opacity-60">
                        <Check size={14} /> {aboutUc.isPending ? 'Saving…' : 'Save Profile'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ── Global outer prev / next section navigation ───────────── */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-400 dark:text-neutral-600">
            {current.group === 'project' ? 'Project form' : current.group === 'experience' ? 'Experience form' : 'About / Profile'}
          </span>
          <div className="flex gap-2">
            {!isFirst && (
              <button type="button" onClick={() => setActiveTab(ALL_TABS[currentIdx - 1].id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-neutral-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-400 hover:text-primary-600 transition">
                <ArrowLeft size={12} /> Prev section
              </button>
            )}
            {!isLast && (
              <button type="button" onClick={() => setActiveTab(ALL_TABS[currentIdx + 1].id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition">
                Next section <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TabbedForm;


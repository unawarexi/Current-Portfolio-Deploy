// ============================================================================
// ABOUT TABBED FORM — admin form to edit portfolio profile (bio, vision, etc.)
// ============================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RefreshCw, User, Upload } from '@core/constants/icons';
import { useAboutFormUsecase } from '@app/usecases/about-form-usecase';

const TABS = [
  { id: 'identity',  label: 'Identity',  fields: ['name','headline','tagline','bio','openToWork','availabilityNote'] },
  { id: 'story',     label: 'Story',     fields: ['history','vision','mission','philosophy'] },
  { id: 'goals',     label: 'Goals',     fields: ['goals','currentFocus','values','funFacts','hobbies'] },
  { id: 'creds',     label: 'Creds',     fields: ['education','certifications','languages','yearsOfExperience','projectsCount','clientsCount','rating'] },
  { id: 'socials',   label: 'Socials',   fields: [] },
  { id: 'cv',        label: 'CV',        fields: [] },
];

const Field = ({ label, error, children, hint }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">{label}</label>
    {children}
    {hint  && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
  </div>
);

const inputCls    = "w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition";
const textareaCls = `${inputCls} resize-none`;

const AboutTabbedForm = ({ onSuccess }) => {
  const uc = useAboutFormUsecase();
  const { activeTab, setActiveTab } = uc;
  const currentIdx = TABS.findIndex((t) => t.id === activeTab);

  const errCount = (tab) => tab.fields.filter((f) => uc.formErrors[f]).length;

  const handleSubmit = async () => {
    try { await uc.submit(); onSuccess?.(); } catch (_) {}
  };

  const handleCvSubmit = async () => {
    try { await uc.submitCv(); } catch (_) {}
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <User size={20} className="text-primary-500" />
        <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">Edit Profile</h2>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-800">
        <div className="h-full bg-primary-500 transition-all duration-400" style={{ width: `${((currentIdx + 1) / TABS.length) * 100}%` }} />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-100 dark:border-gray-800 no-scrollbar">
        {TABS.map((tab, i) => {
          const cnt = errCount(tab);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-semibold tracking-wide transition-all whitespace-nowrap
                ${activeTab === tab.id ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <span className="text-[10px] text-gray-300 dark:text-gray-600 mr-1">{i + 1}.</span>
              {tab.label}
              {cnt > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold">{cnt}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="p-6 space-y-5 min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="space-y-5">

            {/* ── IDENTITY ── */}
            {activeTab === 'identity' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Full Name"><input className={inputCls} value={uc.form.name} onChange={(e) => uc.setField('name', e.target.value)} placeholder="Justice Andrew" /></Field>
                  <Field label="Headline"><input className={inputCls} value={uc.form.headline} onChange={(e) => uc.setField('headline', e.target.value)} placeholder="Full-Stack Developer" /></Field>
                </div>
                <Field label="Tagline"><input className={inputCls} value={uc.form.tagline} onChange={(e) => uc.setField('tagline', e.target.value)} placeholder="Building tomorrow's tech today" /></Field>
                <Field label="Bio *" error={uc.formErrors.bio} hint="Your main about-me paragraph (appears on the site)">
                  <textarea rows={5} className={textareaCls} value={uc.form.bio} onChange={(e) => uc.setField('bio', e.target.value)} />
                </Field>
                <Field label="Availability Note" hint="e.g. Available for freelance from June 2026">
                  <input className={inputCls} value={uc.form.availabilityNote} onChange={(e) => uc.setField('availabilityNote', e.target.value)} />
                </Field>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="openToWork" checked={uc.form.openToWork} onChange={(e) => uc.setField('openToWork', e.target.checked)} className="w-4 h-4 text-primary-600" />
                  <label htmlFor="openToWork" className="text-sm text-gray-700 dark:text-gray-300">Open to work / hire</label>
                </div>
              </>
            )}

            {/* ── STORY ── */}
            {activeTab === 'story' && (
              <>
                <Field label="My History / Journey" hint="Where you came from, how you got here">
                  <textarea rows={5} className={textareaCls} value={uc.form.history} onChange={(e) => uc.setField('history', e.target.value)} placeholder="I started coding in 2018 when..." />
                </Field>
                <Field label="Vision" hint="Long-term aspiration for your career">
                  <textarea rows={3} className={textareaCls} value={uc.form.vision} onChange={(e) => uc.setField('vision', e.target.value)} placeholder="To build software that..." />
                </Field>
                <Field label="Mission"><textarea rows={3} className={textareaCls} value={uc.form.mission} onChange={(e) => uc.setField('mission', e.target.value)} /></Field>
                <Field label="Philosophy / Working Style">
                  <textarea rows={3} className={textareaCls} value={uc.form.philosophy} onChange={(e) => uc.setField('philosophy', e.target.value)} />
                </Field>
              </>
            )}

            {/* ── GOALS ── */}
            {activeTab === 'goals' && (
              <>
                <Field label="Goals" hint="One goal per line">
                  <textarea rows={4} className={textareaCls} value={uc.form.goals} onChange={(e) => uc.setField('goals', e.target.value)} placeholder={"Land senior role at a product company\nLaunch a SaaS product"} />
                </Field>
                <Field label="Current Focus"><input className={inputCls} value={uc.form.currentFocus} onChange={(e) => uc.setField('currentFocus', e.target.value)} placeholder="e.g. Blockchain development" /></Field>
                <Field label="Core Values" hint="One per line">
                  <textarea rows={3} className={textareaCls} value={uc.form.values} onChange={(e) => uc.setField('values', e.target.value)} placeholder={"Integrity\nExcellence\nContinuous learning"} />
                </Field>
                <Field label="Fun Facts" hint="One per line">
                  <textarea rows={3} className={textareaCls} value={uc.form.funFacts} onChange={(e) => uc.setField('funFacts', e.target.value)} placeholder={"I can solve a Rubik's cube in 2 minutes\nI speak 3 languages"} />
                </Field>
                <Field label="Hobbies" hint="One per line">
                  <textarea rows={2} className={textareaCls} value={uc.form.hobbies} onChange={(e) => uc.setField('hobbies', e.target.value)} placeholder={"Chess\nHiking"} />
                </Field>
              </>
            )}

            {/* ── CREDENTIALS ── */}
            {activeTab === 'creds' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Years of Experience"><input type="number" className={inputCls} value={uc.form.yearsOfExperience} onChange={(e) => uc.setField('yearsOfExperience', e.target.value)} /></Field>
                  <Field label="Projects Count"><input type="number" className={inputCls} value={uc.form.projectsCount} onChange={(e) => uc.setField('projectsCount', e.target.value)} /></Field>
                  <Field label="Clients Count"><input type="number" className={inputCls} value={uc.form.clientsCount} onChange={(e) => uc.setField('clientsCount', e.target.value)} /></Field>
                  <Field label="Rating (out of 5)"><input type="number" step="0.1" max="5" className={inputCls} value={uc.form.rating} onChange={(e) => uc.setField('rating', e.target.value)} /></Field>
                </div>
                <Field label="Education (JSON array or one per line)" hint='[{"institution":"...","degree":"...","year":"..."}] or just one per line'>
                  <textarea rows={4} className={textareaCls} value={uc.form.education} onChange={(e) => uc.setField('education', e.target.value)} />
                </Field>
                <Field label="Certifications (JSON array or one per line)">
                  <textarea rows={4} className={textareaCls} value={uc.form.certifications} onChange={(e) => uc.setField('certifications', e.target.value)} />
                </Field>
                <Field label="Languages" hint='[{"name":"English","level":"Native"}] or one per line'>
                  <textarea rows={2} className={textareaCls} value={uc.form.languages} onChange={(e) => uc.setField('languages', e.target.value)} />
                </Field>
              </>
            )}

            {/* ── SOCIALS ── */}
            {activeTab === 'socials' && (
              <>
                {['github','linkedin','twitter','instagram','website'].map((key) => (
                  <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                    <input className={inputCls} value={uc.form.socials?.[key] || ''} onChange={(e) => uc.setSocialField(key, e.target.value)} placeholder={`https://${key === 'website' ? 'yoursite.com' : key + '.com/username'}`} />
                  </Field>
                ))}
              </>
            )}

            {/* ── CV ── */}
            {activeTab === 'cv' && (
              <div className="space-y-5">
                <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  Upload your CV as a PDF file. Once uploaded it will be hosted on Cloudinary and the download link in your Hero section will update automatically.
                </div>
                <Field label="CV / Resume (PDF)">
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 transition">
                      <Upload size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {uc.cvFile ? uc.cvFile.name : 'Click to select PDF…'}
                      </span>
                      <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => uc.setCvFile(e.target.files?.[0] || null)} />
                    </label>
                    {uc.cvFile && (
                      <button onClick={() => uc.setCvFile(null)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                    )}
                  </div>
                </Field>
                <button
                  onClick={handleCvSubmit}
                  disabled={!uc.cvFile || uc.isCvPending}
                  className="w-full py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold transition disabled:opacity-50"
                >
                  {uc.isCvPending ? 'Uploading CV…' : 'Upload CV'}
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      {activeTab !== 'cv' && (
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex gap-2">
            {currentIdx > 0 && (
              <button onClick={() => setActiveTab(TABS[currentIdx - 1].id)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-400 transition">
                <ArrowLeft size={13} /> Back
              </button>
            )}
            {currentIdx < TABS.length - 2 && (
              <button onClick={() => setActiveTab(TABS[currentIdx + 1].id)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition">
                Next <ArrowRight size={13} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={uc.reset} className="flex items-center gap-1.5 px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition">
              <RefreshCw size={12} /> Reset
            </button>
            <button
              onClick={handleSubmit}
              disabled={uc.isPending}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition disabled:opacity-60"
            >
              <Check size={14} /> {uc.isPending ? 'Saving…' : 'Save Profile'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutTabbedForm;

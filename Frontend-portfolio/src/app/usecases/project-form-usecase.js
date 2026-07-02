// ============================================================================
// PROJECT FORM USE-CASE
// All form state, validation (Zod), file handling, and submit logic here.
// Components are pure UI — they receive values and callbacks from this hook.
// ============================================================================

import { useState } from 'react';
import { z } from 'zod';
import { useCreateProject, useUpdateProject } from '@hooks/api-hooks/useProjects';
import { toast } from '@store/toast.store';

// ─── Zod schema ─────────────────────────────────────────────────────────────
const urlOptional = z
  .string()
  .trim()
  .refine((v) => v === '' || /^https?:\/\/.+/.test(v), { message: 'Must be a valid URL' })
  .optional()
  .default('');

export const projectFormSchema = z.object({
  title:          z.string().trim().min(2, 'Title must be at least 2 characters').max(100, 'Title too long'),
  description:    z.string().trim().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  category:       z.string().trim().min(1, 'Category is required'),
  type:           z.string().trim().optional().default(''),
  status:         z.string().trim().optional().default(''),
  year:           z.string().trim().optional().default(''),
  client:         z.string().trim().max(100).optional().default(''),
  role:           z.string().trim().max(100).optional().default(''),
  duration:       z.string().trim().max(50).optional().default(''),
  features:       z.array(z.string().trim()).optional().default([]),
  challenges:     z.string().trim().optional().default(''),
  solution:       z.string().trim().optional().default(''),
  results:        z.string().trim().optional().default(''),
  githubLink:     urlOptional,
  googlePlayLink: urlOptional,
  appStoreLink:   urlOptional,
  webLiveLink:    urlOptional,
  videoUrl:       urlOptional,
  technologies:   z.array(z.string().trim()).optional().default([]),
});

// ─── Initial state ──────────────────────────────────────────────────────────
const INITIAL_FORM = {
  title:          '',
  description:    '',
  category:       '',
  type:           '',
  status:         '',
  year:           String(new Date().getFullYear()),
  client:         '',
  role:           '',
  duration:       '',
  features:       [],
  challenges:     '',
  solution:       '',
  results:        '',
  githubLink:     '',
  googlePlayLink: '',
  appStoreLink:   '',
  webLiveLink:    '',
  videoUrl:       '',
  technologies:   [],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// ============================================================================
// HOOK
// ============================================================================
export const useProjectFormUsecase = (editItem = null) => {
  const [form, setForm] = useState(editItem ? {
    title:          editItem.title          ?? '',
    description:    editItem.description    ?? '',
    category:       editItem.category       ?? '',
    type:           editItem.type           ?? '',
    status:         editItem.status         ?? '',
    year:           editItem.year           ?? String(new Date().getFullYear()),
    client:         editItem.client         ?? '',
    role:           editItem.role           ?? '',
    duration:       editItem.duration       ?? '',
    features:       editItem.features       ?? [],
    challenges:     editItem.challenges     ?? '',
    solution:       editItem.solution       ?? '',
    results:        editItem.results        ?? '',
    githubLink:     editItem.githubLink     ?? '',
    googlePlayLink: editItem.googlePlayLink ?? '',
    appStoreLink:   editItem.appStoreLink   ?? '',
    webLiveLink:    editItem.webLiveLink    ?? '',
    videoUrl:       editItem.videoUrl       ?? '',
    technologies:   editItem.technologies   ?? [],
  } : INITIAL_FORM);
  const [formErrors, setFormErrors]       = useState({});
  const [coverImages, setCoverImages]     = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [activeTab, setActiveTab]         = useState('info');

  const { mutateAsync: createProject, isPending: isCreating } = useCreateProject();
  const { mutateAsync: updateProject, isPending: isUpdating } = useUpdateProject();
  const isPending = isCreating || isUpdating;

  // ── Field setter ────────────────────────────────────────────────────────
  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for that field on change
    if (formErrors[name]) setFormErrors((prev) => { const e = { ...prev }; delete e[name]; return e; });
  };

  // ── File validation ─────────────────────────────────────────────────────
  const validateFiles = (files) =>
    Array.from(files).filter((f) => {
      if (!f.type.startsWith('image/')) {
        toast.error(`${f.name}: only images are allowed`);
        return false;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`${f.name}: file exceeds 5 MB limit`);
        return false;
      }
      return true;
    });

  // ── File add/remove ─────────────────────────────────────────────────────
  const addFiles = (type, files) => {
    const valid = validateFiles(files);
    if (!valid.length) return;
    if (type === 'cover')   setCoverImages((p) => [...p, ...valid]);
    else                    setProjectImages((p) => [...p, ...valid]);
  };

  const removeFile = (type, index) => {
    if (type === 'cover')
      setCoverImages((p) => p.filter((_, i) => i !== index));
    else
      setProjectImages((p) => p.filter((_, i) => i !== index));
  };

  // ── Zod validation ──────────────────────────────────────────────────────
  const validate = () => {
    const result = projectFormSchema.safeParse(form);
    if (result.success) {
      setFormErrors({});
      return true;
    }
    const errors = {};
    for (const [field, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
      errors[field] = msgs[0];
    }
    setFormErrors(errors);
    // Jump to first tab that has errors
    const infoFields = ['title', 'description', 'category', 'type', 'features', 'githubLink', 'webLiveLink', 'googlePlayLink', 'appStoreLink', 'videoUrl'];
    const detailFields = ['client', 'role', 'duration', 'status', 'year', 'challenges', 'solution', 'results'];
    if (Object.keys(errors).some((f) => infoFields.includes(f))) setActiveTab('info');
    else if (Object.keys(errors).some((f) => detailFields.includes(f))) setActiveTab('details');
    const firstMsg = Object.values(errors)[0];
    toast.error(firstMsg || 'Please fix the errors before submitting');
    return false;
  };

  // ── Reset ────────────────────────────────────────────────────────────────
  const reset = () => {
    setForm(INITIAL_FORM);
    setFormErrors({});
    setCoverImages([]);
    setProjectImages([]);
    setActiveTab('info');
  };

  // ── Submit: multipart FormData POST /api/projects ─────────────────────
  const submit = async (e) => {
    e?.preventDefault();
    if (!validate()) return;

    const fd = new FormData();

    // Text fields
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        fd.append(key, JSON.stringify(value));
      } else {
        fd.append(key, value ?? '');
      }
    });

    // Image files
    coverImages.forEach((f)   => fd.append('coverImages',   f));
    projectImages.forEach((f) => fd.append('projectImages', f));

    try {
      if (editItem) {
        // Edit mode: send JSON PATCH (keep existing image URLs)
        const payload = {
          ...form,
          coverImages:   coverImages.length ? undefined : (editItem.coverImages   ?? []),
          projectImages: projectImages.length ? undefined : (editItem.projectImages ?? []),
        };
        await updateProject({ id: editItem.id, data: payload });
        toast.success('Project updated!');
      } else {
        await createProject(fd);
        toast.success('Project saved!');
        reset();
      }
    } catch {
      // error already toasted by useCreateProject onError
    }
  };

  return {
    form, setField, formErrors,
    coverImages, projectImages, addFiles, removeFile,
    activeTab, setActiveTab,
    submit, isPending, reset,
  };
};

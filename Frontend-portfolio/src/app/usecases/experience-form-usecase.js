// ============================================================================
// EXPERIENCE FORM USE-CASE — admin form logic with Zod validation
// ============================================================================
import { useState } from 'react';
import { z } from 'zod';
import { useCreateExperience, useUpdateExperience } from '@hooks/api-hooks/useExperience';

const EXP_TYPES = ['Web Development', 'Mobile Development', 'Blockchain', 'Others'];

const experienceFormSchema = z.object({
  company:       z.string().min(2, 'Company name required'),
  role:          z.string().min(2, 'Role required'),
  year:          z.string().min(4, 'Year/period required'),
  description:   z.string().min(10, 'Description required'),
  type:          z.enum(EXP_TYPES).default('Web Development'),
  subCategory:   z.string().optional(),
  skills:        z.string().optional(),       // newline-separated in form
  achievements:  z.string().optional(),       // newline-separated
  productsBuilt: z.string().optional(),       // newline-separated
  impact:        z.string().optional(),
  isCurrent:     z.boolean().default(false),
  logo:          z.string().optional(),
  order:         z.coerce.number().default(0),
});

const INITIAL = {
  company: '', role: '', year: '', description: '',
  type: 'Web Development', subCategory: '', skills: '',
  achievements: '', productsBuilt: '', impact: '',
  isCurrent: false, logo: '', order: 0,
};

export const useExperienceFormUsecase = (editItem = null) => {
  const [form, setForm]         = useState(editItem ? {
    ...INITIAL,
    ...editItem,
    skills:        (editItem.skills        || []).join('\n'),
    achievements:  (editItem.achievements  || []).join('\n'),
    productsBuilt: (editItem.productsBuilt || []).join('\n'),
  } : INITIAL);
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab]   = useState('basics');
  const createMut = useCreateExperience();
  const updateMut = useUpdateExperience();

  const setField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    if (formErrors[name]) setFormErrors((e) => { const n = { ...e }; delete n[name]; return n; });
  };

  const splitLines = (str) => (str || '').split('\n').map((s) => s.trim()).filter(Boolean);

  const validate = () => {
    const result = experienceFormSchema.safeParse(form);
    if (!result.success) {
      const errs = {};
      for (const [k, v] of Object.entries(result.error.flatten().fieldErrors)) {
        errs[k] = v[0];
      }
      setFormErrors(errs);
      return false;
    }
    setFormErrors({});
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    const payload = {
      ...form,
      skills:        splitLines(form.skills),
      achievements:  splitLines(form.achievements),
      productsBuilt: splitLines(form.productsBuilt),
    };
    if (editItem?.id) {
      await updateMut.mutateAsync({ id: editItem.id, data: payload });
    } else {
      await createMut.mutateAsync(payload);
    }
  };

  return {
    form, setField, formErrors, submit, activeTab, setActiveTab,
    isPending: createMut.isPending || updateMut.isPending,
    reset: () => { setForm(INITIAL); setFormErrors({}); setActiveTab('basics'); },
  };
};

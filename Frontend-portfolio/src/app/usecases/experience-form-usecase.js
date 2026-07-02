// ============================================================================
// EXPERIENCE FORM USE-CASE — admin form logic with Zod validation
// ============================================================================
import { useState } from 'react';
import { z } from 'zod';
import { useCreateExperience, useUpdateExperience } from '@hooks/api-hooks/useExperience';
import { toast } from '@store/toast.store';

const EXP_TYPES = ['Web Development', 'Mobile Development', 'Blockchain', 'Others'];

const experienceFormSchema = z.object({
  company:       z.string().trim().min(2, 'Company name required'),
  role:          z.string().trim().min(2, 'Role required'),
  year:          z.string().trim().min(4, 'Year/period required'),
  description:   z.string().trim().min(10, 'Description required'),
  type:          z.enum(EXP_TYPES).default('Web Development'),
  subCategory:   z.string().trim().optional(),
  skills:        z.array(z.string().trim()).optional().default([]),
  technologies:  z.array(z.string().trim()).optional().default([]),
  achievements:  z.array(z.string().trim()).optional().default([]),
  productsBuilt: z.array(z.string().trim()).optional().default([]),
  impact:        z.string().trim().optional(),
  isCurrent:     z.boolean().default(false),
  logo:          z.string().trim().optional(),
  order:         z.coerce.number().default(0),
});

const INITIAL = {
  company: '', role: '', year: '', description: '',
  type: 'Web Development', subCategory: '', skills: [],
  technologies: [], achievements: [], productsBuilt: [], impact: '',
  isCurrent: false, logo: '', order: 0,
};

export const useExperienceFormUsecase = (editItem = null) => {
  const [form, setForm]         = useState(editItem ? {
    ...INITIAL,
    ...editItem,
    skills:        editItem.skills        || [],
    technologies:  editItem.technologies  || [],
    achievements:  editItem.achievements  || [],
    productsBuilt: editItem.productsBuilt || [],
  } : INITIAL);
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab]   = useState('basics');
  const createMut = useCreateExperience();
  const updateMut = useUpdateExperience();

  const setField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    if (formErrors[name]) setFormErrors((e) => { const n = { ...e }; delete n[name]; return n; });
  };


  const validate = () => {
    const result = experienceFormSchema.safeParse(form);
    if (!result.success) {
      const errs = {};
      for (const [k, v] of Object.entries(result.error.flatten().fieldErrors)) {
        errs[k] = v[0];
      }
      setFormErrors(errs);
      const firstMsg = Object.values(errs)[0];
      toast.error(firstMsg || 'Please fix the errors before submitting');
      return false;
    }
    setFormErrors({});
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    const payload = { ...form };
    try {
      if (editItem?.id) {
        await updateMut.mutateAsync({ id: editItem.id, data: payload });
        toast.success('Experience updated!');
      } else {
        await createMut.mutateAsync(payload);
        toast.success('Experience created!');
        reset();
      }
    } catch (err) {
      // error handled by api-hooks
    }
  };

  return {
    form, setField, formErrors, submit, activeTab, setActiveTab,
    isPending: createMut.isPending || updateMut.isPending,
    reset: () => { setForm(INITIAL); setFormErrors({}); setActiveTab('basics'); },
  };
};

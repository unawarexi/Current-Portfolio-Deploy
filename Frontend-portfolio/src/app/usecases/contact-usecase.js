// ============================================================================
// CONTACT USE-CASE — contact form logic, decoupled from UI
// ============================================================================
import { useState } from 'react';
import { toast } from '@store/toast.store';

const INITIAL = { name: '', email: '', subject: '', message: '' };

/**
 * Provides form state + submit handler for the Contact section.
 * Currently sends via mailto as a direct backend email endpoint
 * hasn't been added yet. Swap the submit body when the endpoint is ready.
 */
export const useContactUsecase = () => {
  const [fields, setFields] = useState(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!fields.name.trim())    { toast.error('Name is required');    return false; }
    if (!fields.email.trim())   { toast.error('Email is required');   return false; }
    if (!fields.message.trim()) { toast.error('Message is required'); return false; }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
    if (!emailOk) { toast.error('Enter a valid email address'); return false; }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // TODO: replace with apiClient.post('/contact', fields) when endpoint exists
      const mailto = `mailto:andrewchukwuweike@gmail.com?subject=${encodeURIComponent(fields.subject || 'Portfolio enquiry')}&body=${encodeURIComponent(`From: ${fields.name} <${fields.email}>\n\n${fields.message}`)}`;
      window.location.href = mailto;
      toast.success('Opening your mail client…');
      setFields(INITIAL);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { fields, handleChange, submit, isSubmitting };
};

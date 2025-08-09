'use client';
import React, { useState } from 'react';
import FormProvider from '../providers/FormProvider';
import FormBuilder from '../ui/FormBuilder';
import { submitFormData, type FormSubmissionData } from '../../lib/formSubmission';

const RegisterationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formFields = [
    {
      id: 'name',
      type: 'text' as const,
      question: "What's your name?",
      placeholder: 'Type your full name...',
      required: true,
    },
    {
      id: 'email',
      type: 'email' as const,
      question: "What's your email address?",
      placeholder: 'name@example.com',
      required: true,
    },
    {
      id: 'services',
      type: 'multiselect' as const,
      question: 'Which services do you need? (Select all that apply)',
      required: true,
      options: [
        'Web Development',
        'Mobile App',
        'UI/UX Design',
        'Frontend Development',
        'Backend Development',
        'Database Design',
        'API Development',
        'DevOps & Deployment'
      ],
    },
    {
      id: 'message',
      type: 'textarea' as const,
      question: 'Tell us more about your project',
      placeholder: 'Describe your project goals, requirements, and any specific details...',
      required: false,
    },
  ];

  const handleSubmit = async (values: Record<string, string | string[] | number | undefined>) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validate required fields
      if (!values.name || !values.email || !values.services) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare data for submission
      const submissionData: FormSubmissionData = {
        name: String(values.name),
        email: String(values.email),
        services: Array.isArray(values.services) ? values.services : [String(values.services)],
        message: values.message ? String(values.message) : undefined,
        submitted_at: new Date().toISOString(),
      };

      console.log('Submitting form:', submissionData);

      // Submit using the utility function
      const result = await submitFormData(submissionData);

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', result.data);
      setSubmitStatus('success');

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      alert(`Failed to submit form: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider>
      <div className="relative">
        {/* Loading overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-lg">Submitting your information...</span>
            </div>
          </div>
        )}

        {/* Success message */}
        {submitStatus === 'success' && (
          <div className="absolute inset-0 bg-green-50 dark:bg-green-900/20 z-40 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-semibold mb-2 text-green-600 dark:text-green-400">
                Thank you!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your information has been submitted successfully. I&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitStatus('idle');
                  window.location.reload(); // Reset the form
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Submit Another Form
              </button>
            </div>
          </div>
        )}

        <FormBuilder
          fields={formFields}
          onSubmit={handleSubmit}
          title="Let's work together! 🚀"
          description="Tell me about your project and I'll get back to you within 24 hours."
        />
      </div>
    </FormProvider>
  );
};

export default RegisterationForm;
'use client';

import { useState } from 'react';
import type { ContactFormData, ContactFormErrors } from '@/types/forms';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.subject.trim()) {
    errors.subject = 'Subject is required.';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setFormData(initialFormData);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-ecc-green-200 bg-ecc-green-50 p-6 text-center">
        <p className="text-lg font-medium text-ecc-green-700">
          Thank you for your message! We&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 rounded-md bg-ecc-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-ecc-green-700 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className="w-full rounded-md border border-ecc-warm-200 px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-ecc-green-500 focus:outline-none focus:ring-1 focus:ring-ecc-green-500"
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className="w-full rounded-md border border-ecc-warm-200 px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-ecc-green-500 focus:outline-none focus:ring-1 focus:ring-ecc-green-500"
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className="w-full rounded-md border border-ecc-warm-200 px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-ecc-green-500 focus:outline-none focus:ring-1 focus:ring-ecc-green-500"
        />
        {errors.subject && (
          <p id="contact-subject-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="w-full rounded-md border border-ecc-warm-200 px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-ecc-green-500 focus:outline-none focus:ring-1 focus:ring-ecc-green-500"
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md bg-ecc-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-ecc-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ecc-green-500 focus:ring-offset-2"
      >
        Send Message
      </button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import type { NewsletterFormData, NewsletterFormErrors } from '@/types/forms';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: NewsletterFormData): NewsletterFormErrors {
  const errors: NewsletterFormErrors = {};

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
}

export default function NewsletterSignup() {
  const [formData, setFormData] = useState<NewsletterFormData>({ email: '' });
  const [errors, setErrors] = useState<NewsletterFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ email: e.target.value });
    if (errors.email) {
      setErrors({});
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
    setFormData({ email: '' });
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-ecc-green-200 bg-ecc-green-50 p-4 text-center">
        <p className="text-sm font-medium text-ecc-green-700">
          You&apos;re subscribed! Thanks for joining.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
            className="w-full rounded-md border border-ecc-warm-200 px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-ecc-green-500 focus:outline-none focus:ring-1 focus:ring-ecc-green-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-ecc-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-ecc-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ecc-green-500 focus:ring-offset-2"
        >
          Subscribe
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-email-error" role="alert" className="text-sm text-red-600">
          {errors.email}
        </p>
      )}
    </form>
  );
}

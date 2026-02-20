import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Contact Us | Everyday Climate Champions';
  const description =
    'Get in touch with the Everyday Climate Champions podcast team. Send us your questions, feedback, or ideas.';

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary', title, description },
  };
}

export default function ContactUsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-4 text-ecc-warm-600">
        Have a question or want to get involved? Drop us a message and
        we&apos;ll get back to you.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}

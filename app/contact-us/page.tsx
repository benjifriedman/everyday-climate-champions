import type { Metadata } from 'next';

export const revalidate = 3600;

const CONTACT_EMAIL = 'EverydayClimateChampions@gmail.com';

const sections = [
  {
    title: 'Share your feedback',
    description:
      'We really want to hear from you! Take our 5-minute Listener Feedback Survey.',
    linkText: 'Take Survey',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdWtyEkf8meN01BVOEgOJ_pWYxkha5EiV5Po2alSbvc_IzyEA/viewform',
  },
  {
    title: 'Suggest a guest',
    description:
      'Know of a great Bay Area "everyday person" we should consider interviewing? Check out what we look for in a guest.',
    linkText: 'Suggest',
    href: 'https://praxisinaction.org/ecc/wp-content/uploads/2025/04/ECC-guests_-what-we-look-for.pdf',
  },
  {
    title: 'Collaborate with us',
    description:
      'We are looking for collaborators in the San Francisco Bay Area and throughout the U.S.: other climate-focused podcasters, journalism initiatives, organizations, or businesses. Just fill out this brief interest form, and we\u2019ll be in touch.',
    linkText: 'Express Interest',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScduSfUmjai7XljC_7XpXhQkeVXBUdEcZzeDO1D2rPJYrCSnw/viewform',
  },
  {
    title: 'Email us',
    description:
      'We\u2019re always open to questions, comments, or collaboration ideas. And if you\u2019ve caught an error, please let us know.',
    linkText: 'Drop us a line',
    href: `mailto:${CONTACT_EMAIL}`,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Contact Us | Everyday Climate Champions';
  const description =
    'Get in touch with the Everyday Climate Champions podcast team. Share feedback, suggest a guest, collaborate, or email us.';

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary', title, description },
  };
}

export default function ContactUsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-4 text-ecc-warm-600">
        We are eager to hear from you! Please get in touch to let us know
        what&apos;s on your mind and how we can best serve our community.
      </p>

      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-ecc-warm-200 bg-ecc-warm-50 px-6 py-5"
          >
            <h2 className="text-lg font-semibold text-ecc-green-700">
              {section.title}
            </h2>
            <p className="mt-2 text-ecc-warm-700">{section.description}</p>
            <a
              href={section.href}
              target={section.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={section.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="mt-3 inline-block rounded-lg bg-ecc-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
            >
              {section.linkText}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}

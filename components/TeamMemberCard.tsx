import Image from 'next/image';
import type { WPTeamMember } from '@/types/wordpress';

interface TeamMemberCardProps {
  member: WPTeamMember;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { title: name, teamMemberFields } = member;
  const { role, bio, photo } = teamMemberFields;
  const hasPhoto = photo?.sourceUrl;

  return (
    <div className="overflow-hidden rounded-xl bg-ecc-warm-50 p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {hasPhoto ? (
          <Image
            src={photo.sourceUrl}
            alt={photo.altText || name}
            width={128}
            height={128}
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-32 w-32 items-center justify-center rounded-full bg-ecc-warm-200 text-2xl font-bold text-ecc-warm-700"
            aria-hidden="true"
          >
            {getInitials(name)}
          </div>
        )}

        <h3 className="mt-4 text-lg font-semibold text-foreground">{name}</h3>

        {role && (
          <p className="mt-1 text-sm font-medium text-ecc-green-700">{role}</p>
        )}

        {bio && (
          <p className="mt-3 text-sm text-ecc-warm-700">{bio}</p>
        )}
      </div>
    </div>
  );
}

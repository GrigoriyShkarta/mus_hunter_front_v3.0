import { useTranslations } from 'next-intl';
import { Musician } from '@/services/api-validation';

interface Props {
  profile: Musician;
}

export default function StylesSection({ profile }: Props) {
  const t = useTranslations('profile');

  return (
    <div className="bg-secondary p-5">
      <h2 className="mb-4 text-primary">{t('styles')}</h2>

      <div className="flex gap-2 flex-wrap">
        {profile?.styles.map((style) => (
          <span
            key={style.id}
            className="bg-accent text-white px-2 py-0.5 rounded-[6px] text-sm"
          >
            {style.name}
          </span>
        ))}
      </div>
    </div>
  );
}

import { useLocale, useTranslations } from 'next-intl';
import { Musician } from '@/services/api-validation';
import { getYearsString } from '@/lib/helpers';
import { Progress } from '@/components/ui/progress';

interface Props {
  profile: Musician;
}

export default function SkillsSection({ profile }: Props) {
  const t = useTranslations('profile');
  const lang = useLocale();

  return (
    <div className="bg-secondary p-5">
      <h2 className="mb-4 text-primary">{t('skills')}</h2>
      <div className="grid grid-cols-3 gap-4">
        {profile?.skills.map((skill) => (
          <div
            key={skill.skill.id}
            className="p-3 rounded-md border flex flex-col gap-4"
          >
            <div className="flex justify-between">
              <h3 className="text-primary">{skill.skill.name}</h3>
              <p className="text-muted-foreground">
                {getYearsString(skill.experience, lang, 'profile')}
              </p>
            </div>

            <Progress value={skill.experience} />
          </div>
        ))}
      </div>
    </div>
  );
}

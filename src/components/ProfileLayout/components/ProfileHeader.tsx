import { Musician } from '@/services/api-validation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAge, getFaviconUrl } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import ProfileEditModal from '@/components/ProfileLayout/components/modals/ProfileEditModal';

interface Props {
  profile: Musician;
}

export default function ProfileHeader({ profile }: Props) {
  const t = useTranslations('profile');

  return (
    <div className="w-full flex justify-between bg-secondary p-5 rounded-tl-xl rounded-tr-xl relative border-b">
      <div className="flex gap-6">
        <Avatar className="w-32 h-32">
          <AvatarImage src={profile?.avatar ?? ''} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-primary">{profile.name}</h1>
          {profile?.seeking?.length > 0 && (
            <div className="flex text-green-500 gap-1 text-sm">
              {profile?.seeking?.some((item) => item!.is_search_band) && (
                <div className="flex">{t('seeking_band')}</div>
              )}
              {profile?.seeking?.some((item) => !item!.is_search_band) && (
                <div className="flex">{t('seeking_musicians')}</div>
              )}
            </div>
          )}
          {profile?.city?.name && (
            <p className="text-muted-foreground">{profile?.city?.name}</p>
          )}
          {profile?.birthDate && (
            <p className="text-muted-foreground">
              {t('age')}: {getAge(profile.birthDate)}
            </p>
          )}
          {profile?.telephone && (
            <p className="text-muted-foreground">{profile.telephone}</p>
          )}
          <div className="flex gap-1">
            {profile?.links?.map((link, idx) => (
              <a key={idx} href={link} target="_blank">
                <Avatar className="w-6 h-6 rounded-full">
                  <AvatarImage src={getFaviconUrl(link) ?? ''} alt={link} />
                </Avatar>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <ProfileEditModal profile={profile} />
      </div>
    </div>
  );
}

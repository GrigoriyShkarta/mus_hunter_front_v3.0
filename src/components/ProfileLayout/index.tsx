import ProfileHeader from '@/components/ProfileLayout/components/ProfileHeader';
import ProfileTabs from '@/components/ProfileLayout/components/Tabs';
import { Musician } from '@/services/api-validation';

interface Props {
  profile: Musician;
}

export default function ProfileLayout({ profile }: Props) {
  return (
    <div className="min-h-[calc(100vh - 48px)] bg-primary w-[1024px] mx-auto">
      <ProfileHeader profile={profile} />
      <ProfileTabs profile={profile} />
    </div>
  );
}

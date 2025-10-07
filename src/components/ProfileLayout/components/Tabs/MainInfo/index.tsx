import SkillsSection from '@/components/ProfileLayout/components/Tabs/MainInfo/SkillsSection';
import AboutSection from '@/components/ProfileLayout/components/Tabs/MainInfo/AboutSection';
import StylesSection from '@/components/ProfileLayout/components/Tabs/MainInfo/StylesSection';
import BandsSection from '@/components/ProfileLayout/components/Tabs/MainInfo/BandsSection';
import DetailEditModal from '@/components/ProfileLayout/components/modals/DetailEditModal';
import { Musician } from '@/services/api-validation';

interface Props {
  profile: Musician;
}

export default function MainInfo({ profile }: Props) {
  return (
    <div className="relative">
      <AboutSection profile={profile} />
      <SkillsSection profile={profile} />
      <StylesSection profile={profile} />
      <BandsSection profile={profile} />

      <DetailEditModal profile={profile} />
    </div>
  );
}

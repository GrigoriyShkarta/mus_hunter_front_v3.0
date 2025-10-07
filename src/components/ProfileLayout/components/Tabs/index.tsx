'use client';

import { useState } from 'react';
import { Musician } from '@/services/api-validation';
import MainInfo from '@/components/ProfileLayout/components/Tabs/MainInfo';
import { useTranslations } from 'next-intl';
import Seeking from '@/components/ProfileLayout/components/Tabs/Seeking';

type ProfileTypeType = 'main_info' | 'seeking' | 'media';
const tabs = ['main_info', 'seeking', 'media'];

interface Props {
  profile: Musician;
}

export default function ProfileTabs({ profile }: Props) {
  const [activeTab, setActiveTab] = useState<ProfileTypeType>('main_info');
  const t = useTranslations('profile.tabs');

  const renderContent = () => {
    switch (activeTab) {
      case 'main_info':
        return <MainInfo profile={profile} />;
      case 'seeking':
        return <Seeking profile={profile} />;
      case 'media':
        return <div>Media</div>;
    }
  };

  return (
    <>
      <div className="w-full flex bg-secondary border-b">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`px-6 py-2 cursor-pointer flex gap-2 hover:bg-accent/90 hover:text-white ${activeTab === tab ? 'bg-accent text-white' : 'bg-secondary text-primary'}`}
            onClick={() => setActiveTab(tab as ProfileTypeType)}
          >
            {t(tab)}
            {tab === 'seeking' && profile?.seeking.length > 0 && (
              <div className="bg-green-600 min-w-[22px] flex justify-center items-center text-sm text-white rounded-full">
                {profile.seeking.length}
              </div>
            )}
          </div>
        ))}
      </div>

      {renderContent()}
    </>
  );
}

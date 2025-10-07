'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Musician } from '@/services/api-validation';
import { Button } from '@/components/ui/button';

interface Props {
  profile: Musician;
}

export default function AboutSection({ profile }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('profile');

  const text = profile?.description ?? '';
  const isLongText = text?.length > 200;
  const displayText =
    isExpanded || !isLongText ? text : text.slice(0, 200) + '...';

  return (
    <div className="bg-secondary p-5">
      <h2 className="mb-3 text-primary">{t('about_me')}</h2>
      <p className="text-[16px] text-primary leading-relaxed mb-3">
        {displayText}
      </p>
      {isLongText && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-[20px] w-[100px] text-[12px] text-[#007BFF] hover:text-[#0056b3] p-0 hover:bg-transparent"
        >
          {isExpanded ? 'Скрыть' : 'Показать больше'}
        </Button>
      )}
    </div>
  );
}

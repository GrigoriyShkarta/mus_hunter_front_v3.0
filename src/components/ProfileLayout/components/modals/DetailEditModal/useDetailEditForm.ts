import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Musician, Settings } from '@/services/api-validation';

import {
  MusicianDetailInfoFormData,
  musicianDetailsInfoSchema,
} from '@/lib/validations';
import { getSettings } from '@/app/actions/settings';
import { updateDetailMusicianInfo } from '@/services/musician';

export default function useDetailEditForm(profile: Musician) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<MusicianDetailInfoFormData>({
    resolver: zodResolver(musicianDetailsInfoSchema),
    reValidateMode: 'onChange',
  });

  const { data: commonData } = useQuery<Settings>({
    queryKey: ['profile-common'],
    queryFn: getSettings,
    refetchOnWindowFocus: false,
    placeholderData: { skills: [], styles: [], cities: [], ages: [] },
  });

  useEffect(() => {
    reset({
      description: profile.description ?? '',
      styles: profile.styles?.map((style) => style.id) ?? [],
      skills:
        profile.skills.map((obj) => ({
          experience: obj?.experience ?? 0,
          id: obj?.skill?.id,
        })) ?? [],
    });
  }, [profile]);

  const onSubmit: SubmitHandler<MusicianDetailInfoFormData> = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills?.map((skill) => ({ ...skill, id: +skill.id })),
      };
      await updateDetailMusicianInfo(payload);
      reset();
      router.refresh();
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    commonData,
    control,
    errors,
    open,
    reset,
    setOpen,
    onSubmit,
    register,
    handleSubmit,
  };
}

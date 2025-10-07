import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Musician, Settings } from '@/services/api-validation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getSettings } from '@/app/actions/settings';
import {
  SeekingMusicianFormData,
  seekingMusicianSchema,
} from '@/lib/validations';
import { createSeekingEntry, updateSeekingEntry } from '@/services/musician';

interface Props {
  profile: Musician;
  id?: number;
}

export default function useSeekingEditForm({ profile, id }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: commonData } = useQuery<Settings>({
    queryKey: ['profile-common'],
    queryFn: getSettings,
    refetchOnWindowFocus: false,
    placeholderData: { skills: [], styles: [], cities: [], ages: [] },
  });

  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<SeekingMusicianFormData>({
    resolver: zodResolver(seekingMusicianSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      is_search_band: false,
    },
  });

  const onSubmit: SubmitHandler<SeekingMusicianFormData> = async (data) => {
    try {
      if (!id) {
        await createSeekingEntry(data);
      } else {
        await updateSeekingEntry({ entryId: id, ...data });
      }
    } catch (e) {
      console.error(e);
    } finally {
      reset();
      router.refresh();
      setOpen(false);
    }
  };

  const isSearchBand = watch('is_search_band');
  const musicianSkills = profile?.skills.map((skill) => ({
    name: skill.skill.name,
    id: skill.skill.id,
  }));

  return {
    control,
    errors,
    open,
    register,
    setOpen,
    handleSubmit,
    reset,
    isSearchBand,
    commonData,
    musicianSkills,
    isValid,
    onSubmit,
  };
}

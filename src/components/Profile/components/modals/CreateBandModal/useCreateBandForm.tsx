import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import AvatarEditor from 'react-avatar-editor';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateBandFormData,
  createBandSchema,
  MusicianMainInfoFormData,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings } from '@/services/api-validation';
import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/app/actions/settings';
import { createBand } from '@/services/band';

export default function useCreateBandForm() {
  const [open, setOpen] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1.2);
  const editorRef = useRef<AvatarEditor>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateBandFormData>({
    resolver: zodResolver(createBandSchema),
    reValidateMode: 'onChange',
  });

  console.log('errors', errors);

  const { data: commonData } = useQuery<Settings>({
    queryKey: ['profile-common'],
    queryFn: getSettings,
    refetchOnWindowFocus: false,
    placeholderData: { skills: [], styles: [], cities: [] },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarReset = () => {
    setAvatarFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit: SubmitHandler<MusicianMainInfoFormData> = async (data) => {
    let avatarFileToSend: File | undefined = undefined;
    console.log('hi');
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      if (blob) {
        avatarFileToSend = new File([blob], 'avatar.png', {
          type: 'image/png',
        });
      }
    }

    try {
      const payload = {
        ...data,
        avatar: avatarFileToSend,
      };
      console.log('payload', payload);
      await createBand(payload);
      // reset()
      // router.refresh()
      // setOpen(false)
    } catch (e) {
      console.error(e);
    }
  };

  return {
    commonData,
    control,
    errors,
    open,
    isDragActive,
    avatarFile,
    scale,
    editorRef,
    fileInputRef,
    reset,
    setOpen,
    setIsDragActive,
    setAvatarFile,
    onSubmit,
    setScale,
    handleAvatarClick,
    handleAvatarReset,
    register,
    handleSubmit,
  };
}

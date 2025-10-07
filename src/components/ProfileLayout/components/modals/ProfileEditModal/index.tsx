'use client';

import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { Musician } from '@/services/api-validation';

import { useProfileEditForm } from './useProfileEditForm';
import { useMusician } from '@/context/MusicianContext';

import AvatarEditorBlock from '../components/AvatarEditorBlock';
import FormFields from './FormFields';
import LinksInputList from '../components/LinksInputList';

import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { FiEdit } from 'react-icons/fi';

interface Props {
  profile: Musician;
}

export default function ProfileEditModal({ profile }: Props) {
  const {
    control,
    errors,
    open,
    isDragActive,
    avatarFile,
    scale,
    editorRef,
    fileInputRef,
    commonData,
    reset,
    onSubmit,
    register,
    handleSubmit,
    setOpen,
    setIsDragActive,
    setAvatarFile,
    setScale,
    handleAvatarClick,
    handleAvatarReset,
  } = useProfileEditForm(profile);

  const { musician } = useMusician();
  const t = useTranslations('profile');

  return (
    musician &&
    musician.id === profile.id && (
      <>
        <FiEdit
          size={18}
          className="absolute right-[20px] top-[15px] cursor-pointer"
          onClick={() => {
            setOpen(true);
            reset();
          }}
        />

        <Modal open={open} title={t('edit_profile')} setOpen={setOpen}>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AvatarEditorBlock
              profile={profile}
              avatarFile={avatarFile}
              scale={scale}
              editorRef={editorRef}
              fileInputRef={fileInputRef}
              isDragActive={isDragActive}
              setAvatarFile={setAvatarFile}
              setScale={setScale}
              setIsDragActive={setIsDragActive}
              handleAvatarClick={handleAvatarClick}
              handleAvatarReset={handleAvatarReset}
              t={t}
            />
            <FormFields
              control={control}
              errors={errors}
              commonData={commonData}
              register={register}
              t={t}
            />
            <Controller
              control={control}
              name="links"
              render={({ field }) => (
                <LinksInputList
                  value={field.value ?? []}
                  errors={errors}
                  onChange={field.onChange}
                  t={t}
                />
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button type="submit">{t('save')}</Button>
            </div>
          </form>
        </Modal>
      </>
    )
  );
}

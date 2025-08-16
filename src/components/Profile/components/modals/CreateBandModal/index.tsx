'use client';

import { useTranslations } from 'next-intl';
import { useMusician } from '@/context/MusicianContext';
import { Musician } from '@/services/api-validation';
import { Button } from '@/components/ui/button';
import Modal from '@/components/common/Modal';
import useCreateBandForm from '@/components/Profile/components/modals/CreateBandModal/useCreateBandForm';
import AvatarEditorBlock from '@/components/Profile/components/modals/components/AvatarEditorBlock';
import FormFields from '@/components/Profile/components/modals/CreateBandModal/FormFields';
import LinksInputList from '@/components/Profile/components/modals/components/LinksInputList';
import { Controller } from 'react-hook-form';

interface Props {
  profile: Musician;
}
export default function CreateBandModal({ profile }: Props) {
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
  } = useCreateBandForm();
  const t = useTranslations('profile');
  const { musician } = useMusician();

  return (
    musician &&
    musician.id === profile.id && (
      <>
        <Button
          variant="outline"
          className="w-fit mt-2 flex"
          onClick={() => {
            setOpen(true);
            reset();
          }}
        >
          {t('add_new_band')}
        </Button>

        <Modal open={open} title={t('create_band')} setOpen={setOpen}>
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
              isCreateBand
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

            <div className="flex justify-end gap-2 mt-2">
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

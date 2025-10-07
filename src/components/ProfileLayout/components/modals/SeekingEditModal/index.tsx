'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useMusician } from '@/context/MusicianContext';
import { FiPlus } from 'react-icons/fi';
import { Musician, SeekingAdd } from '@/services/api-validation';
import useSeekingEditForm from '@/components/ProfileLayout/components/modals/SeekingEditModal/useSeekingEditForm';
import Modal from '@/components/common/Modal';
import FormFields from '@/components/ProfileLayout/components/modals/SeekingEditModal/FormFields';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface Props {
  profile: Musician;
  setEditAdd: Dispatch<SetStateAction<SeekingAdd | undefined>>;
  add?: SeekingAdd;
}

export default function SeekingEditModal({ profile, add, setEditAdd }: Props) {
  const { musician } = useMusician();
  const t = useTranslations('profile');
  const {
    open,
    setOpen,
    reset,
    control,
    errors,
    handleSubmit,
    isSearchBand,
    commonData,
    musicianSkills,
    onSubmit,
    isValid,
    register,
  } = useSeekingEditForm({ profile, id: add?.id });

  useEffect(() => {
    if (add) {
      setOpen(true);
      reset({
        role: add.role.id,
        description: add.description,
        age: add?.age?.id,
        is_search_band: add.is_search_band,
      });
    }
  }, [add]);

  const handleAddNew = () => {
    setOpen(true);
    setEditAdd(undefined);
    reset({
      role: 0,
      description: '',
      age: '',
      is_search_band: false,
    });
  };

  return (
    musician &&
    musician.id === profile.id && (
      <>
        <Button variant="outline" className="mx-auto" onClick={handleAddNew}>
          <FiPlus /> {t('add_ad')}
        </Button>

        <Modal
          open={open}
          title={t(add ? 'edit_ad' : 'add_ad')}
          setOpen={setOpen}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormFields
              control={control}
              errors={errors}
              commonData={commonData}
              register={register}
              isSearchBand={isSearchBand}
              musicianSkills={musicianSkills}
              hiddenTab={
                !!add || profile?.seeking?.some((ad) => ad!.is_search_band)
              }
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={!isValid}>
                {t('save')}
              </Button>
            </DialogFooter>
          </form>
        </Modal>
      </>
    )
  );
}

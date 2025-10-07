'use client';

import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { useMusician } from '@/context/MusicianContext';
import useDetailEditForm from './useDetailEditForm';

import { Musician } from '@/services/api-validation';

import SkillSection from './SkillSection';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Modal from '@/components/common/Modal';
import { MultiSelect } from '@/components/ui/multiselect';
import { Button } from '@/components/ui/button';

import { FiEdit } from 'react-icons/fi';

interface Props {
  profile: Musician;
}

export default function DetailEditModal({ profile }: Props) {
  const {
    commonData,
    control,
    errors,
    open,
    reset,
    setOpen,
    onSubmit,
    register,
    handleSubmit,
  } = useDetailEditForm(profile);

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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div>
              <Label className="block text-sm mb-1">{t('about')}</Label>
              <Textarea
                className="resize-none"
                placeholder={t('placeholder', {
                  field: t('about').toLowerCase(),
                })}
                {...register('description')}
              />
            </div>

            <Controller
              control={control}
              name="styles"
              render={({ field }) => (
                <MultiSelect
                  options={
                    commonData?.styles?.map((style) => ({
                      label: style.name,
                      value: style.id,
                    })) || []
                  }
                  value={field?.value || []}
                  label={t('styles')}
                  onChange={field.onChange}
                  placeholder={t('select', {
                    field: t('styles').toLowerCase(),
                  })}
                />
              )}
            />

            <SkillSection
              commonData={commonData?.skills}
              control={control}
              errors={errors?.skills}
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

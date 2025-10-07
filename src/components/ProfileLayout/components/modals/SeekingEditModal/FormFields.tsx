import { useTranslations } from 'next-intl';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { SeekingMusicianFormData } from '@/lib/validations';
import { CommonObject, Settings } from '@/services/api-validation';

interface BaseFormFieldsProps {
  control: Control<SeekingMusicianFormData>;
  errors: FieldErrors<SeekingMusicianFormData>;
  commonData: Settings | undefined;
  register: UseFormRegister<SeekingMusicianFormData>;
  hiddenTab: boolean;
  isSearchBand?: boolean;
}

type FormFieldsProps = BaseFormFieldsProps &
  (
    | {
        isSearchBand: true;
        musicianSkills: CommonObject[]; // Обязательно когда isSearchBand = true
      }
    | {
        isSearchBand?: false;
        musicianSkills?: CommonObject[]; // Опционально когда isSearchBand = false
      }
  );

export default function FormFields(props: FormFieldsProps) {
  const {
    control,
    errors,
    commonData,
    register,
    musicianSkills,
    hiddenTab,
    isSearchBand = false,
  } = props;
  const t = useTranslations('profile');

  return (
    <>
      {!hiddenTab && (
        <Controller
          control={control}
          name="is_search_band"
          render={({ field }) => (
            <div className="flex bg-primary rounded-lg p-1 mb-4">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  !field.value
                    ? 'bg-accent shadow-sm text-white'
                    : 'text-primary'
                }`}
                onClick={() => field.onChange(false)}
              >
                {t('search_musician')}
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  field.value
                    ? 'bg-accent shadow-sm text-white'
                    : 'text-primary'
                }`}
                onClick={() => field.onChange(true)}
              >
                {t('search_group')}
              </button>
            </div>
          )}
        />
      )}

      <Controller
        control={control}
        name="role"
        render={({ field: selectField }) => (
          <div>
            <div className="flex gap-1 mb-2">
              <Label className="">
                {t(isSearchBand ? 'role_in_group' : 'musician_role')}
                <span className="text-destructive">*</span>
              </Label>
            </div>
            <Select
              value={selectField.value ? String(selectField.value) : ''}
              onValueChange={(val) => {
                selectField.onChange(val ? Number(val) : null);
              }}
              disabled={isSearchBand && !musicianSkills?.length} // Отключаем если массив пустой
            >
              <SelectTrigger
                className={`w-full ${
                  errors?.role?.message &&
                  'border-red-500 focus-visible:ring-red-500'
                } ${
                  isSearchBand && !musicianSkills?.length
                    ? 'bg-gray-100 cursor-not-allowed'
                    : ''
                }`}
              >
                <SelectValue
                  placeholder={
                    isSearchBand && !musicianSkills?.length
                      ? ''
                      : t('select', {
                          field: t('skill').toLowerCase(),
                        })
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {(isSearchBand
                  ? musicianSkills!
                  : (commonData?.skills ?? [])
                ).map((opt) => (
                  <SelectItem key={String(opt.id)} value={String(opt.id)}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isSearchBand && !musicianSkills?.length && (
              <p className="text-amber-600 text-xs mt-1">
                {t('add_skills_first')}
              </p>
            )}

            {errors?.role?.message && (
              <p className="text-red-500 text-xs mt-1">
                {t(errors?.role?.message ?? '')}
              </p>
            )}
          </div>
        )}
      />
      {!isSearchBand && (
        <Controller
          control={control}
          name="age"
          render={({ field: selectField }) => (
            <div>
              <Label className="mb-2">{t('age')}</Label>
              <Select
                value={selectField.value ? String(selectField.value) : ''}
                onValueChange={(val) => {
                  selectField.onChange(val ? Number(val) : null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t('select', {
                      field: t('age').toLowerCase(),
                    })}
                  />
                </SelectTrigger>
                <SelectContent>
                  {(commonData?.ages ?? []).map((opt) => (
                    <SelectItem key={opt.id} value={String(opt.id)}>
                      {opt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      )}
      <div>
        <div className="flex gap-1">
          <Label className="block text-sm mb-1">{t('about')}</Label>
          <span className="text-destructive">*</span>
        </div>

        <Textarea
          className={`resize-none ${
            errors?.description?.message &&
            'border-red-500 focus-visible:ring-red-500'
          }`}
          placeholder={t('placeholder', {
            field: t('about').toLowerCase(),
          })}
          {...register('description')}
        />
        {errors?.description?.message && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors?.description?.message ?? '')}
          </p>
        )}
      </div>
    </>
  );
}

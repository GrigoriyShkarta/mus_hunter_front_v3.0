import { useLocale, useTranslations } from 'next-intl';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from 'react-hook-form';

import { MusicianDetailInfoFormData } from '@/lib/validations';
import { CommonObject } from '@/services/api-validation';

import { getYearsString } from '@/lib/helpers';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

import { FiPlus, FiX } from 'react-icons/fi';

interface Props {
  commonData?: CommonObject[];
  control: Control<MusicianDetailInfoFormData>;
  errors?: FieldErrors<MusicianDetailInfoFormData>['skills'];
}

export default function SkillSection({ commonData, control, errors }: Props) {
  const lang = useLocale();
  const t = useTranslations('profile');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-[500] text-sm">{t('skills')}</h2>
      {fields.map((obj, idx) => (
        <div
          key={obj.id}
          className="border rounded-md p-3 flex flex-col gap-4 relative bg-secondary"
        >
          <div>
            <div className="flex gap-2 items-center">
              {/* Instrument Select */}
              <Controller
                control={control}
                name={`skills.${idx}.id`}
                render={({ field: selectField }) => (
                  <Select
                    value={String(selectField.value)}
                    onValueChange={selectField.onChange}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        errors?.[idx]?.id?.message &&
                        'border-red-500 focus-visible:ring-red-500'
                      }`}
                    >
                      <SelectValue
                        placeholder={t('select', {
                          field: t('skill').toLowerCase(),
                        })}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {(commonData || []).map((opt) => (
                        <SelectItem key={String(opt.id)} value={String(opt.id)}>
                          {opt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <button
                type="button"
                className="p-1 rounded hover:bg-muted transition-colors"
                onClick={() => remove(idx)}
              >
                <FiX />
              </button>
            </div>

            {errors?.[idx]?.id?.message && (
              <p className="text-red-500 text-xs mt-1">
                {t(errors[idx].id.message ?? '')}
              </p>
            )}
          </div>

          {/* Experience Slider */}
          <Controller
            control={control}
            name={`skills.${idx}.experience`}
            render={({ field: sliderField }) => (
              <div className="flex flex-col items-center w-full">
                <Slider
                  min={0}
                  max={11}
                  step={1}
                  value={[Number(sliderField.value) || 0]}
                  onValueChange={(val) => sliderField.onChange(val[0])}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {sliderField.value === 0
                    ? t('less_than_year')
                    : sliderField.value === 11
                      ? t('more_than_10_years')
                      : getYearsString(sliderField.value, lang)}
                </div>
              </div>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="flex items-center gap-1 mt-2 self-start"
        onClick={() =>
          append({
            id: '',
            experience: 0,
          })
        }
      >
        <FiPlus /> {t('add_skill')}
      </Button>
    </div>
  );
}

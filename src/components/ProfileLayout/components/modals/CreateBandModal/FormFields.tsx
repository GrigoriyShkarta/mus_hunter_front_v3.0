import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { CreateBandFormData } from '@/lib/validations';
import { Settings } from '@/services/api-validation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MultiSelect from '@/components/ui/multiselect';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormFieldsProps {
  control: Control<CreateBandFormData>;
  errors: FieldErrors<CreateBandFormData>;
  commonData: Settings | undefined;
  register: UseFormRegister<CreateBandFormData>;
  t: (key: string, params?: { [key]: string }) => string;
}

export default function FormFields({
  control,
  errors,
  commonData,
  register,
  t,
}: FormFieldsProps) {
  return (
    <>
      <div>
        <label className="block text-sm mb-1">{t('band_name')}</label>
        <Input
          placeholder={t('placeholder', {
            field: t('band_name').toLowerCase(),
          })}
          {...register('name')}
          className={
            errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''
          }
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.name.message ?? '')}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">{t('city')}</label>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select
              value={
                field.value != null && field.value !== ''
                  ? String(field.value)
                  : undefined
              }
              onValueChange={(val) =>
                field.onChange(val ? Number(val) : undefined)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={t('select', {
                    field: t('city').toLowerCase(),
                  })}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {commonData?.cities?.map((city) => (
                    <SelectItem key={city.id} value={`${city.id}`}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
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

      <div>
        <label className="block text-sm mb-1">{t('foundation_date')}</label>
        <Input
          type="date"
          {...register('foundingDate')}
          placeholder={t('placeholder', {
            field: t('birthDate').toLowerCase(),
          })}
        />
        {errors.foundingDate && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.foundingDate.message ?? '')}
          </p>
        )}
      </div>

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
    </>
  );
}

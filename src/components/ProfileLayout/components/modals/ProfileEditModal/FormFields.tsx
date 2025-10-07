import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { MusicianMainInfoFormData } from '@/lib/validations';
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

interface FormFieldsProps {
  control: Control<MusicianMainInfoFormData>;
  errors: FieldErrors<MusicianMainInfoFormData>;
  commonData: Settings | undefined;
  register: UseFormRegister<MusicianMainInfoFormData>;
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
        <label className="block text-sm mb-1">{t('fullName')}</label>
        <Input
          placeholder={t('placeholder', { field: t('fullName').toLowerCase() })}
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
              value={`${field?.value}`}
              onValueChange={(val) => field.onChange(val ? Number(val) : '')}
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

      <div>
        <label className="block text-sm mb-1">{t('birthDate')}</label>
        <Input
          type="date"
          {...register('birthDate')}
          placeholder={t('placeholder', {
            field: t('birthDate').toLowerCase(),
          })}
        />
        {errors.birthDate && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.birthDate.message ?? '')}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">{t('telephone')}</label>
        <Input
          {...register('telephone')}
          placeholder={t('placeholder', {
            field: t('telephone').toLowerCase(),
          })}
        />
      </div>
    </>
  );
}

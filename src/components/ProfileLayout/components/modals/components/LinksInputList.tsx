import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MusicianMainInfoFormData } from '@/lib/validations';
import { FieldErrors } from 'react-hook-form';
import { FiX, FiPlus } from 'react-icons/fi';

interface LinksInputListProps {
  value: string[];
  errors: FieldErrors<MusicianMainInfoFormData>;
  onChange: (links: string[]) => void;
  t: (key: string, params?: { [key]: string }) => string;
}

export default function LinksInputList({
  value,
  errors,
  onChange,
  t,
}: LinksInputListProps) {
  const handleLinkChange = (idx: number, newVal: string) => {
    const updated = [...value];
    updated[idx] = newVal;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...value, '']);
  };

  const handleRemove = (idx: number) => {
    const updated = value.filter((_, i) => i !== idx);
    onChange(updated);
  };

  return (
    <div>
      <label className="block text-sm mb-1">{t('links')}</label>
      <div className="flex flex-col gap-2">
        {value.length > 0 &&
          value.map((link, idx) => (
            <div key={idx}>
              <div className="flex gap-2 items-center">
                <Input
                  value={link}
                  onChange={(e) => handleLinkChange(idx, e.target.value)}
                  placeholder={t('placeholder', {
                    field: t('links').toLowerCase(),
                  })}
                  className={
                    errors.links?.[idx]?.message
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }
                />

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <FiX />
                </button>
              </div>
              {errors.links?.[idx]?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.links[idx]?.message as string)}
                </p>
              )}
            </div>
          ))}
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-1 mt-2 self-start"
          onClick={handleAdd}
        >
          <FiPlus /> {t('add_link')}
        </Button>
      </div>
    </div>
  );
}

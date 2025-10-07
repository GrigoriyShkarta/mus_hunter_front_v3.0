import { useTranslations } from 'next-intl';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSuccess: () => void;
  handleCancel: () => void;
  text: string;
}

export default function ConfirmModal({
  open,
  text,
  setOpen,
  handleSuccess,
  handleCancel,
}: Props) {
  const t = useTranslations('profile');

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-full flex flex-col gap-8 mt-6">
        <p className="text-primary text-center">{text}</p>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => handleCancel()}>
            {t('cancel')}
          </Button>
          <Button variant="default" onClick={() => handleSuccess()}>
            {t('confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

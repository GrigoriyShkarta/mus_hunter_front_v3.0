import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Musician, SeekingAdd } from '@/services/api-validation';
import SeekingEditModal from '@/components/ProfileLayout/components/modals/SeekingEditModal';
import { getProfession } from '@/lib/helpers';
import { LangType } from '@/lib/consts';
import { useMusician } from '@/context/MusicianContext';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/common/ConfirmModal';
import { deleteSeekingEntry } from '@/services/musician';

interface Props {
  profile: Musician;
}

export default function Seeking({ profile }: Props) {
  const [editAdd, setEditAdd] = useState<SeekingAdd | undefined>(undefined);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAdd, setSelectedAdd] = useState(0);
  const t = useTranslations('profile');
  const lang = useLocale() as LangType;
  const { musician } = useMusician();
  const router = useRouter();

  const professionForm = lang === 'ua' ? 'genitive' : 'nominative';

  const handleDelete = async () => {
    try {
      await deleteSeekingEntry(selectedAdd);
      router.refresh();
      setOpenDeleteModal(false);
    } catch (error) {
      console.error('Error deleting seeking entry:', error);
    }
  };

  return (
    <div className="bg-secondary p-5 relative w-full flex flex-col gap-5 justify-center">
      {profile?.seeking.length > 0 &&
        profile.seeking.map((seeking) => (
          <div
            className="w-full border rounded-xl p-4 flex flex-col gap-2"
            key={seeking?.id}
          >
            <div className="w-full flex justify-between items-center">
              <div
                className={`rounded-[8px] flex ${seeking?.is_search_band ? 'bg-accent' : 'bg-primary'}`}
              >
                <span
                  className={`text-sm ${seeking?.is_search_band ? 'text-white' : 'text-accent'} px-2 py-1`}
                >
                  {t(seeking?.is_search_band ? 'seeking_band' : 'seeking')}
                  {!seeking?.is_search_band &&
                    ' ' +
                      getProfession(seeking!.role!.name, lang, professionForm)}
                </span>
              </div>

              {musician && musician.id === profile.id && (
                <div className="flex items-center gap-1">
                  <Button variant={'ghost'} onClick={() => setEditAdd(seeking)}>
                    <MdEdit size={18} color={'#ff7d00'} />
                  </Button>
                  <Button
                    variant={'ghost'}
                    onClick={() => {
                      setSelectedAdd(seeking!.id);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <RiDeleteBin6Line size={18} />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-1">
              {seeking?.is_search_band && (
                <div className="text-[14px] text-primary">
                  <span className="">{t('role')}: </span>
                  {getProfession(seeking!.role!.name, lang, 'nominative')}
                </div>
              )}

              {seeking?.age?.name && (
                <div className="text-[14px] text-primary">
                  <span className="">{t('age')}:</span> {seeking?.age?.name}
                </div>
              )}
              <div className="text-[14px] text-primary">
                <span className="">{t('about')}:</span>
                <p className="whitespace-pre-line break-words">
                  {seeking?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      <SeekingEditModal
        profile={profile}
        add={editAdd}
        setEditAdd={setEditAdd}
      />

      <ConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleSuccess={handleDelete}
        handleCancel={() => setOpenDeleteModal(false)}
        text={t('confirm_delete_ad')}
      />
    </div>
  );
}

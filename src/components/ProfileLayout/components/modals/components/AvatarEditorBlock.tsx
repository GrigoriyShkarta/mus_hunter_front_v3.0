import { RefObject } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Musician } from '@/services/api-validation';
import { FiX } from 'react-icons/fi';

interface AvatarEditorBlockProps {
  profile?: Musician;
  avatarFile: File | null;
  scale: number;
  editorRef: RefObject<AvatarEditor | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isDragActive: boolean;
  isCreateBand?: boolean;
  setAvatarFile: (file: File | null) => void;
  setScale: (scale: number) => void;
  setIsDragActive: (active: boolean) => void;
  handleAvatarClick: () => void;
  handleAvatarReset: () => void;
  t: (key: string) => string;
}

export default function AvatarEditorBlock({
  profile,
  avatarFile,
  scale,
  editorRef,
  fileInputRef,
  isCreateBand,
  isDragActive,
  setAvatarFile,
  setScale,
  setIsDragActive,
  handleAvatarClick,
  handleAvatarReset,
  t,
}: AvatarEditorBlockProps) {
  return (
    <div
      className={`relative w-[144px] h-[168px] mb-0 cursor-pointer group mx-auto ${
        isDragActive ? 'border-2 border-dashed border-accent' : ''
      }`}
      onClick={!avatarFile ? handleAvatarClick : undefined}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
          setAvatarFile(file);
        }
      }}
    >
      {avatarFile ? (
        <>
          <AvatarEditor
            ref={editorRef}
            image={avatarFile}
            width={128}
            height={128}
            border={8}
            borderRadius={64}
            color={[255, 255, 255, 0.6]}
            scale={scale}
          />
          <button
            type="button"
            onClick={handleAvatarReset}
            className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-black/80 transition-colors"
          >
            <FiX className="text-white" size={18} />
          </button>
        </>
      ) : (
        <img
          src={!isCreateBand ? (profile?.avatar ?? '') : ''}
          alt="avatar"
          className="w-[144px] h-[144px] rounded-full object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && file.type.startsWith('image/')) {
            setAvatarFile(file);
          }
        }}
        className="hidden"
      />
      {!avatarFile && (
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity w-[144px] h-[144px] pointer-events-none">
          <span className="text-xs text-white text-center">
            {t('change')}
            <br />
            {t('drug')}
          </span>
        </div>
      )}

      {avatarFile && (
        <div className="flex flex-col items-center mt-2">
          <input
            type="range"
            min={1}
            max={2}
            step={0.01}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-28 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

import { Musician } from '@/services/api-validation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreateBandModal from '@/components/ProfileLayout/components/modals/CreateBandModal';

interface Props {
  profile: Musician;
}

export default function BandsSection({ profile }: Props) {
  return (
    <div className="bg-secondary p-5 w-full">
      <div className="grid grid-cols-3 gap-4">
        <CreateBandModal profile={profile} />
        {profile?.bands?.map((band) => (
          <div
            key={band.band.id}
            className="flex flex-col items-center gap-2 py-4 border rounded-md h-full"
          >
            <Avatar className="w-20 h-20">
              <AvatarImage src={band.band?.avatar ?? ''} alt={band.band.name} />
              <AvatarFallback>{band.band.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-center">
              <span className="font-bold text-sm">{band.band.name}</span>
              <div className="flex gap-2 flex-wrap">
                {band.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-accent text-white px-2 py-0.5 rounded text-xs"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

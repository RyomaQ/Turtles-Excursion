import Image from "next/image";
import Button from "../cells/Button";

interface OfferCardProps {
  image: Array<string>;
  title: string;
  date: string;
  location: string;
  onClick: () => void;
}

export default function OfferCard({
  image,
  title,
  date,
  location,
  onClick,
}: OfferCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden">
      <div className="image-wrapper rounded-3xl h-full w-full">
        <Image src={image[0]} alt={title} fill className="object-cover" />
      </div>
      <div className="p-9 flex flex-col justify-between items-start grow">
        <div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex gap-2 items-center">
              <Image
                src="/calendar.svg"
                alt="Calendrier"
                width={24}
                height={24}
              />
              <p>{date}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Image src="/map.svg" alt="Calendrier" width={24} height={24} />
              <p>{location}</p>
            </div>
          </div>
          <h3 className="mb-6 line-clamp-2">{title}</h3>
        </div>
        <Button variant="secondary" onClick={onClick}>
          Annuler
        </Button>
      </div>
    </div>
  );
}

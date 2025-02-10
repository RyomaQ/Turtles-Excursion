import Image from "next/image";
import Button from "../cells/Button";
import { Activity } from "@/src/types/Activity";

interface ActivityCardProps {
  activity: Activity;
  type?: "user" | "admin";
  onClick: () => void;
}

export default function ActivityCard({
  activity,
  onClick,
  type,
}: ActivityCardProps) {
  const images: string[] =
    typeof activity.images === "string"
      ? JSON.parse(activity.images)
      : activity.images;

  return (
    <div className="bg-white rounded-3xl overflow-hidden flex flex-col">
      <div className="image-wrapper rounded-3xl aspect-[3/2]">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${activity.title} image ${index + 1}`}
            fill
            className="object-cover"
          />
        ))}
      </div>
      <div className="p-9 flex flex-col justify-between grow">
        <div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex gap-2 items-center">
              <Image src="/map.svg" alt="Calendrier" width={24} height={24} />
              <p>{activity.date}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/calendar.svg"
                alt="Calendrier"
                width={24}
                height={24}
              />
              <p>{activity.location}</p>
            </div>
          </div>
          <h3 className="mb-2 line-clamp-2">{activity.title}</h3>
          <p className="mb-6 line-clamp-2">{activity.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="h2-style">{activity.price}€</p>
          <Button variant="primary" onClick={onClick}>
            {type === "admin" ? "Modifier" : "Découvrir"}
          </Button>
        </div>
      </div>
    </div>
  );
}

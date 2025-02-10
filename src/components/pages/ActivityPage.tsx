"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Button from "@/src/components/cells/Button";
import { useRouter } from "next/navigation";
import { Activity } from "@/src/types/Activity";
import { getSession } from "@/src/utils/sessions";
import { useEffect, useState } from "react";
import { User } from "@/src/types/User";
import { log } from "console";
import { set } from "zod";

interface ActivityProps {
  activities: Activity[];
  user: User | null;
}

export default function ActivityPage({ activities, user }: ActivityProps) {
  const router = useRouter();
  const params = useParams();
  const [error, setError] = useState("");
  const [loggedUser, setLoggedUser] = useState<User | null>(user || null);
  const id = params?.id ? parseInt(params.id as string) : null;
  const activity = activities.find((activity) => activity.rowid === id);

  if (!activity) {
    return <div>Activity not found</div>;
  }
  console.log("loggedUser", loggedUser);

  const images: string[] = JSON.parse(activity.images);

  const handleEditUserActivities = async () => {
    await editUser(loggedUser);
  };

  // Edit user
  const editUser = async (user: User | null) => {
    let activities = [];
    if (loggedUser && loggedUser.activities) {
      activities = JSON.parse(loggedUser.activities);
    }
    if (!activities.includes(activity.rowid)) {
      activities.push(activity.rowid);
    } else {
      activities = activities.filter((a: number) => a !== activity.rowid);
    }
    if (loggedUser) {
      console.log(loggedUser);
      loggedUser.activities = JSON.stringify(activities);

      // Call API with PUT method
      const response = await fetch(`/api/users/editUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loggedUser),
      });

      if (!response.ok || response.status >= 300) {
        setError("Une erreur est survenue");
        return;
      }

      const data = await response.json();

      console.log("data", data);

      setLoggedUser(data.response);
    }
  };

  return (
    <div className="bg-pink50 flex-center px-9">
      <div className="fixed top-0 right-0 p-9 z-[1000]">
        <Button variant="secondary" onClick={() => router.push("/account")}>
          <Image src="/turtle.svg" alt="icone" width={24} height={24} />
          Mes réservations
        </Button>
      </div>
      <div className="container padding-section-large">
        <div className="flex gap-2 mb-6">
          <a href="../" className="hover:underline">
            Accueil
          </a>
          <Image
            src="/chevron-right.svg"
            alt="chevron"
            width={16}
            height={16}
          />
          <p className="font-bold">{activity?.title}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:row-span-2 rounded-[3rem] overflow-hidden relative">
            <Image
              src={images[0]}
              alt={activity.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="aspect-[16/7] rounded-[3rem] overflow-hidden relative">
              <Image
                src={images[1]}
                alt={activity.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-[16/7] rounded-[3rem] overflow-hidden relative">
              <Image
                src={images[2]}
                alt={activity.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-20">
          <div className="grow">
            <h1 className="h2-style mb-6">{activity.title}</h1>
            <p>{activity.description}</p>
          </div>
          <div className="p-8 rounded-2xl bg-white min-w-[20rem]">
            <div className="h2-style">{activity.price}€</div>
            <div className="flex gap-2 items-center mb-4">
              <Image src="/stars.svg" alt="Calendrier" width={16} height={16} />
              <div>{activity.score}</div>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <Image
                src="/calendar.svg"
                alt="Calendrier"
                width={24}
                height={24}
              />
              <div className="font-bold">{activity.date}</div>
            </div>
            <div className="flex gap-2 items-center mb-6">
              <Image src="/map.svg" alt="Calendrier" width={24} height={24} />
              <div className="font-bold">{activity.location}</div>
            </div>
            {loggedUser &&
              (loggedUser.activities?.includes(activity.rowid.toString()) ? (
                <Button
                  variant="secondary"
                  onClick={() => handleEditUserActivities()}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => handleEditUserActivities()}
                >
                  Réserver
                </Button>
              ))}
            {!loggedUser && (
              <Button variant="primary" onClick={() => router.push("/login")}>
                Réserver
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

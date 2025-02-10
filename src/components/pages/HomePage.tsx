"use client";

import Button from "../cells/Button";
import OfferCard from "../organisms/ActivityCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Activity } from "@/src/types/Activity";
import ActivityCard from "../organisms/ActivityCard";
import { getSession } from "@/src/utils/sessions";
import { useEffect, useState } from "react";
import { User } from "@/src/types/User";

interface ActivityProps {
  activities: Activity[];
}

export default function HomePage({ activities }: ActivityProps) {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const logSession = async () => {
    const session = await getSession();
    setLoggedUser(session);
  };

  useEffect(() => {
    logSession();
  }, []);

  console.log("user activities", loggedUser?.activities);

  return (
    <>
      <div className="bg-pink200 min-h-screen flex-center p-9">
        <div className="fixed top-0 right-0 p-9 z-[1000]">
          <Button variant="secondary" onClick={() => router.push("/account")}>
            <Image src="/turtle.svg" alt="icone" width={24} height={24} />
            Mon compte
          </Button>
        </div>
        <div className="container bg-white rounded-[5rem] grow flex-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-16 grow">
            <div className="flex flex-col justify-center align-center">
              <h1 className="mb-5">
                Partez à l’aventure à dos de{" "}
                <span className="p-2 bg-pink200 rounded-xl">tortue</span> géante
                !
              </h1>
              <p className="mb-5">
                Embarquez pour une excursion inoubliable à travers des paysages
                grandioses, en famille ou entre amis, au rythme paisible des
                tortues majestueuses. Découvrez le voyage lent comme vous ne
                l’avez jamais vécu et créez des souvenirs uniques.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  onClick={() =>
                    document
                      .getElementById("offers")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Voir les offres
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.open("https://ryomaquenot.com")}
                >
                  Contact
                </Button>
              </div>
            </div>
            <div className="image-wrapper rounded-[3rem]">
              <Image
                src="/images/hero-turtle.webp"
                alt="Tortue géante"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-pink50 px-9" id="offers">
        <div className="container padding-section-large">
          <h2 className="mb-4">Liste des excursions</h2>
          <p className="mb-12 max-w-xl">
            Découvrez nos différentes offres d’excursions à dos de tortue
            géante. Choisissez parmi nos formules et partez à l’aventure en
            famille ou entre amis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            {activities.map((activity, i) => {
              return (
                <ActivityCard
                  key={i}
                  activity={activity}
                  onClick={() => router.push(`/activities/${activity.rowid}`)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

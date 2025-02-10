"use client";

import Button from "../cells/Button";
import Image from "next/image";
import { getSession } from "@/src/utils/sessions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/src/utils/sessions";
import BookedActivityCard from "../organisms/BookedActivityCard";
import { User } from "@/src/types/User";
import { Activity } from "@/src/types/Activity";
import UsersTable from "../organisms/UsersTable";
import ActivityCard from "../organisms/ActivityCard";
import ActivityModal from "../organisms/ActivityModal";
import EditUserModal from "../organisms/EditUserModal";

interface OfferCardProps {
  users: User[];
  activities: Activity[];
  loggedUser: User;
}

export default function AccountPage({
  users,
  loggedUser,
  activities,
}: OfferCardProps) {
  //const [loggedUser, setLoggedUser] = useState<User>(loggedUser);
  const [localActivities, setLocalActivities] =
    useState<Activity[]>(activities);
  const [localUsersActivitiesId, setLocalUsersActivitiesId] = useState<
    number[]
  >(JSON.parse(loggedUser.activities));
  const [editModal, setEditModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [error, setError] = useState("");
  const [userModal, setUserModal] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(loggedUser);
  const router = useRouter();

  // Logout function
  const Logout = () => {
    logout(); // Destroy the cookie
    return router.push("/login"); // redirect to login page
  };

  // Open the modal to edit an activity
  const handleEditActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setEditModal(true);
  };

  // Catch delete action
  const handleDelete = (activity: Activity) => {
    deleteActivity(activity.rowid);
  };

  // Execute deletion
  const deleteActivity = async (activity_id: number | undefined) => {
    // Call API with DELETE method
    const response = await fetch(
      `/api/activities/deleteActivity/${activity_id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok || response.status >= 300) {
      setError("Une erreur est survenue");
      return;
    }

    setLocalActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.rowid !== activity_id)
    );
  };

  // Edit user activities
  const handleEditUserActivities = async () => {
    await editUser(editedUser);
  };

  useEffect(() => {
    handleEditUserActivities();
  }, [editedUser]);

  // Edit user
  const editUser = async (user: User | null) => {
    // Call API with PUT method
    const response = await fetch(`/api/users/editUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    });

    if (!response.ok || response.status >= 300) {
      setError("Une erreur est survenue");
      return;
    }
    const data = await response.json();

    setLocalUsersActivitiesId(JSON.parse(data.response.activities));
  };

  console.log("localActivities", localActivities);

  return (
    <>
      <div className="bg-pink50 px-9 min-h-screen">
        <div className="fixed top-0 right-0 p-9 z-[5] flex gap-4 items-center">
          <button
            onClick={() => {
              setUserModal(true);
            }}
            className="font-bold hover:underline"
          >
            Modifier mon profil
          </button>
          <Button variant="secondary" onClick={Logout}>
            Déconnexion
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
            <p className="font-bold">Mon compte</p>
          </div>
          <h1 className="h1-style my-6">Bonjour {loggedUser.firstname}</h1>

          {loggedUser.rowid != 1 && (
            <>
              <h2 className="h2-style my-6">Mes réservations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localActivities
                  .filter((activity) =>
                    localUsersActivitiesId.includes(activity.rowid)
                  )
                  .map((activity) => {
                    const images: string[] = JSON.parse(activity.images);

                    return (
                      <BookedActivityCard
                        key={activity.rowid}
                        image={[images[0]]}
                        title={activity.title}
                        date={activity.date}
                        location={activity.location}
                        onClick={() => {
                          setEditedUser({
                            ...editedUser,
                            activities: JSON.stringify(
                              JSON.parse(editedUser.activities).filter(
                                (a: number) => a !== activity.rowid
                              )
                            ),
                          });
                        }}
                      />
                    );
                  })}
              </div>
              {localUsersActivitiesId.length < 1 && (
                <>
                  <p className="mb-4">
                    Vous n'avez pas encore réservé d'activité.
                  </p>

                  <Button variant="primary" onClick={() => router.push("/")}>
                    Découvrir nos activités
                  </Button>
                </>
              )}
            </>
          )}
          {loggedUser.rowid === 1 && (
            <>
              <h2 className="mb-4">Utilisateurs</h2>
              <UsersTable users={users} />
              <h2 className="mt-12 mb-4">Les activités</h2>
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedActivity(undefined);
                  setEditModal(true);
                }}
              >
                Ajouter une activité
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-4">
                {localActivities.map((activity) => (
                  <ActivityCard
                    key={activity.rowid}
                    activity={activity}
                    type="admin"
                    onClick={() => handleEditActivity(activity)}
                  />
                ))}
              </div>
              {editModal && (
                <ActivityModal
                  setEditModal={setEditModal}
                  activity={selectedActivity}
                  handleDelete={handleDelete}
                  setLocalActivities={setLocalActivities}
                />
              )}
            </>
          )}
          {userModal && (
            <EditUserModal
              setUserModal={setUserModal}
              loggedUser={loggedUser}
            />
          )}
        </div>
      </div>
    </>
  );
}

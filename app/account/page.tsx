import AccountPage from "@/src/components/pages/AccountPage";
import { getUsers } from "@/app/api/users/getUsers/route"; // Import users data
import { User } from "@/src/types/User";
import { getActivities } from "../api/activities/getActivities/route";
import { getSession } from "@/src/utils/sessions";
import { getUser } from "../api/users/getUser/route";

export default async function AccountView() {
  // Call function to get users
  const usersResponse = await getUsers();

  if (!usersResponse.ok || usersResponse.status >= 300) {
    return <p>Une erreur est survenue</p>;
  }
  const users = await usersResponse.json();

  // Call function to get activities
  const activitiesResponse = await getActivities();

  if (!activitiesResponse.ok || activitiesResponse.status >= 300) {
    return <p>Une erreur est survenue</p>;
  }

  const activities = await activitiesResponse.json();

  // GET session
  const session = await getSession();

  // GET logged user
  const response = await getUser(session.rowid);

  if (!response.ok || response.status >= 300) {
    // S'il y a une erreur
    try {
      // On récupère le message d'erreur
      const { message } = await response.json();
      return <p>{message}</p>;
    } catch (e) {
      console.error(e);
    }
    // Si la récupération du message d'erreur à échoué,
    // on affiche un message par défaut
    return <p>Une erreur est survenue</p>;
  }

  // On récupère l'utilisateur renvoyé par l'action
  const user: User = await response.json();
  // console.log("user", user);
  // console.log("session", session);

  return (
    <AccountPage users={users} loggedUser={user} activities={activities} />
  );
}

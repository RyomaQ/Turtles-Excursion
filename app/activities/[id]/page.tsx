import ActivityPage from "@/src/components/pages/ActivityPage";
import { getActivities } from "@/app/api/activities/getActivities/route";
import { Activity } from "@/src/types/Activity";
import { getSession } from "@/src/utils/sessions";
import { getUser } from "@/app/api/users/getUser/route";
import { User } from "@/src/types/User";

export default async function ActivityView() {
  // GET activities
  const activitiesResponse = await getActivities();

  if (!activitiesResponse.ok || activitiesResponse.status >= 300) {
    return <p>Une erreur est survenue</p>;
  }

  const activities = await activitiesResponse.json();

  // GET session
  const session = await getSession();

  let user: User | null = null;

  // GET user
  if (session) {
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
    user = await response.json();
  }

  return <ActivityPage activities={activities} user={user} />;
}

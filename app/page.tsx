"use server";

import HomePage from "@/src/components/pages/HomePage";
import { getActivities } from "@/app/api/activities/getActivities/route";
import { Activity } from "@/src/types/Activity";

export default async function Home() {
  const response = await getActivities(); // Call API

  if (!response.ok || response.status >= 300) {
    return <p>Une erreur est survenue</p>;
  }

  const activities = await response.json();

  console.log("Activities : ", activities);

  return <HomePage activities={activities} />;
}

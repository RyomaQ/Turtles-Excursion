"use server";

import { addActivity } from "../addActivity/route";
import { date, z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ActivitySchema from "@/app/api/activities/ActivitySchema";

// Ignore rowid and user in the form
const ZodCreateActivity = ActivitySchema.omit({ rowid: true });

export async function CreateActivity(formData: FormData) {
  try {
    // Validate the form
    const { title, description, location, date, score, price, images } =
      ZodCreateActivity.parse({
        title: formData.get("title"),
        description: formData.get("description"),
        location: formData.get("location"),
        date: formData.get("date"),
        score: Number(formData.get("score")),
        price: Number(formData.get("price")),
        images: JSON.stringify([
          formData.get("image_1"),
          formData.get("image_2"),
          formData.get("image_3"),
        ]),
      });

    // Add the activity (see "/actions/AddActivity.tsx" in few steps)
    const add = await addActivity(
      title,
      description,
      location,
      date,
      score,
      price,
      JSON.parse(images)
    );

    // If there is an error during activity add process
    if (!add.ok || add.status >= 300) {
      const { message } = await add.json();
      throw new Error(message);
    }

    // Here, activity was successfully added
    revalidatePath("/account"); // it will update the set with the new data

    return { success: true, message: "Activity created successfully" };
  } catch (error) {
    // If it's a form validation error
    if (error instanceof z.ZodError) {
      const errors: Array<string> = [];
      // Get all errors
      error.issues.forEach((issue) => {
        errors.push(issue.message);
      });

      throw new Error(errors.join(", "));
    } else if (typeof error === "object") {
      // catch errors like "activity already exist"
      throw new Error(error?.toString());
    }
    throw new Error("An error occured");
  }

  // revalidatePath("/account"); // Add this line
  redirect("/account");
}

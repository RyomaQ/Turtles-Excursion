"use server";

import { NextRequest, NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { User } from "@/src/types/User";

// Define rules for the form data
const UserSchema = z.object({
  rowid: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  activities: z.string(),
});

export async function PUT(req: NextRequest) {
  // Parse the request body
  const body = await req.json();
  const user = UserSchema.parse(body);

  // Call editUser function (see below)
  const response = await editUser(user);

  // Revalidate the path to update data on the front
  //revalidatePath("/activities");
  console.log("response api", response);

  return NextResponse.json({ response });
}

async function editUser(user: User) {
  let db = null;

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: process.env.DATABASE_NAME || "", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  const sql = `
    UPDATE users
    SET firstname = ?, lastname = ?, email = ?, activities = ?
    WHERE ROWID = ?
  `;
  await db.run(
    sql,
    user.firstname,
    user.lastname,
    user.email,
    user.activities,
    user.rowid
  );

  console.log("user return", user);

  return user; // Return the user object instead of the result of db.run
}

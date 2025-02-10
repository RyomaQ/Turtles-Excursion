"use server";

import { NextRequest, NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { z } from "zod";
import { Activity } from "@/src/types/Activity";
import { revalidatePath } from "next/cache";
import ActivitySchema from "@/app/api/activities/ActivitySchema";

export async function PUT(req: NextRequest) {
  // Parse the request body
  const body = await req.json();
  const activity = ActivitySchema.parse(body);

  // Call editActivity function (see below)
  const response = await editActivity(activity);

  // Revalidate the path to update data on the front
  //revalidatePath("/account");
  console.log("response api", response);

  return NextResponse.json({ response });
}

async function editActivity(activity: Activity) {
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
    UPDATE activities
    SET title = ?, description = ?, location = ?, date = ?, score = ?, price = ?, images = ?
    WHERE ROWID = ?
  `;
  await db.run(
    sql,
    activity.title,
    activity.description,
    activity.location,
    activity.date,
    activity.score,
    activity.price,
    activity.images,
    activity.rowid
  );

  console.log("activity return", activity);

  return activity;
}

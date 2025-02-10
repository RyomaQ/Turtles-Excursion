"use server";

import { NextRequest, NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  // Get the id from params
  const id = (await params).id;

  // Call deleteActivity function (see below)
  const response = await deleteActivity(id);

  return NextResponse.json({ response });
}

async function deleteActivity(activity_id: string) {
  let db = null;

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: process.env.DATABASE_NAME || "", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  const sql = "DELETE FROM activities WHERE ROWID = ?";
  const deleteActivity = await db.run(sql, activity_id);

  return deleteActivity;
}

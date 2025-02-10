"use server";

import { getSession } from "@/src/utils/sessions";
import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function addActivity(
  title: string,
  description: string,
  location: string,
  date: string,
  score: number,
  price: number,
  images: string
) {
  let db = null;

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: process.env.DATABASE_NAME || "", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Get the logged user
  const session = await getSession();
  console.log("session", session, session.rowid);
  // Check if the user already have this activity
  const verifSql =
    //"SELECT rowid FROM activities WHERE title = ? AND user = ?";
    "SELECT rowid FROM activities WHERE title = ?";
  const verif = await db.get(verifSql, title);

  console.log("verif", verif);
  if (verif) {
    return NextResponse.json(
      { message: "You already have this activity" },
      { status: 403 }
    );
  }

  console.log("session rowid", session.rowid);

  // Insert new activity
  const sql = `INSERT INTO activities(title, description, date, location, price, images, score) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const activityAdd = await db.run(
    sql,
    title,
    description,
    date,
    location,
    price,
    JSON.stringify(images),
    score
  );

  return NextResponse.json(activityAdd);
}

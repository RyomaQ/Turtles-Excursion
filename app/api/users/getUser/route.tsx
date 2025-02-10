// Les actions sont exécutées côté serveur
"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function getUser(id: number) {
  let db = null;

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: process.env.DATABASE_NAME || "", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Get one user by id
  const sql = `SELECT rowid, firstname, lastname, email, activities FROM users WHERE rowid = ?`;
  const user = await db.get(sql, id);

  // If no result
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

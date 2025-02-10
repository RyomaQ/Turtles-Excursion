"use client";

import { hashPassword } from "@/src/utils/bcryptjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormEvent } from "react";
import Image from "next/image";
import Button from "@/src/components/cells/Button";

export default function RegisterForm() {
  const [error, setError] = useState(<></>);
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Get data from form
    const firstname = e.currentTarget.firstname.value.trim();
    const lastname = e.currentTarget.lastname.value.trim();
    const email = e.currentTarget.email.value.trim();
    const plainPassword = e.currentTarget.password.value.trim();
    // If any data is empty
    if (
      firstname == "" ||
      lastname == "" ||
      email == "" ||
      plainPassword == ""
    ) {
      setError(<p>All fields are required</p>);
    } else {
      try {
        const password = await hashPassword(plainPassword); // Hash password
        // Fetch "/api/register" route
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
          }),
        });
        // If there is an error (user already exists for example)
        if (!response.ok || response.status >= 300) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const { message } = await response.json();
            setError(<p>{message}</p>);
          } else {
            setError(<p>Unexpected error occurred</p>);
          }
        } else {
          // Log in the user automatically after successful registration
          const loginResponse = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password: plainPassword,
            }),
          });
          if (loginResponse.ok) {
            router.push("/account"); // Redirect to account page
          } else {
            setError(<p>Registration successful, but failed to log in</p>);
          }
        }
      } catch (error) {
        console.error(error);
        setError(<p>An error occurred</p>);
      }
    }
  };

  return (
    <div className="bg-pink50 px-9 min-h-screen">
      <div className="fixed top-0 right-0 p-9 z-[1000]">
        <Button variant="secondary" onClick={() => router.push("/account")}>
          <Image src="/turtle.svg" alt="icone" width={24} height={24} />
          Mon compte
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
          <p className="font-bold">Inscription</p>
        </div>
        <div className="flex-center">
          <div className="p-8 rounded-2xl bg-white max-w-md w-full flex flex-col items-stretch">
            <h1 className="h2-style mb-6 text-center">Inscription</h1>
            <form method="POST" onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block mb-2 font-bold" htmlFor="firstname">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="w-full p-2 border rounded"
                  placeholder="John"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold" htmlFor="lastname">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="w-full p-2 border rounded"
                  placeholder="Doe"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border rounded"
                  placeholder="john.doe@gmail.com"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 border rounded"
                />
              </div>
              <Button variant="primary" type="submit">
                S'inscrire
              </Button>
            </form>
            {error && (
              <div className="mt-4 text-center text-red-500">{error}</div>
            )}
            <div className="mt-4 text-center">
              <a href="/login" className="text-blue-500 hover:underline">
                Vous avez déjà un compte ? Connectez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

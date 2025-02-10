"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import Image from "next/image";
import Button from "@/src/components/cells/Button";

export default function LoginPage() {
  const [error, setError] = useState(<></>);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Get data from form
    const email = e.currentTarget.email.value.trim();
    const password = e.currentTarget.password.value.trim();
    // If any data is empty
    if (email == "" || password == "") {
      setError(<p>All fields are required</p>);
    } else {
      try {
        // Fetch "/api/login" route
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        // If there is an error
        if (!response.ok || response.status >= 300) {
          const { message } = await response.json();
          setError(<p>{message}</p>);
          console.log(message);
        } else {
          if (pathname?.startsWith("/login")) {
            router.push("/account"); // Redirect to /mon-compte page
            console.log("Success");
          }
          router.refresh(); // Keep this page
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
          <p className="font-bold">Connexion</p>
        </div>
        <div className="flex-center">
          <div className="p-8 rounded-2xl bg-white max-w-md w-full flex flex-col items-strecth">
            <h1 className="h2-style mb-6 text-center">Connexion</h1>
            <form method="POST" onSubmit={handleLogin}>
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
              <div className="mb-6">
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
                Se connecter
              </Button>
            </form>
            {error && (
              <div className="mt-4 text-center text-red-500">{error}</div>
            )}
            <div className="mt-4 text-center">
              <a href="/register" className="text-blue-500 hover:underline">
                Vous n'avez pas de compte ? Inscrivez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

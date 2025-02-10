import Button from "../cells/Button";
import Image from "next/image";
import { CreateActivity } from "@/app/api/activities/createActivity/route";
import { useState, useEffect } from "react";
import { Activity } from "@/src/types/Activity";
import { User } from "@/src/types/User";

interface EditUserModalProps {
  setUserModal: (value: boolean) => void;
  loggedUser: User;
  // handleDelete: (activity: Activity) => void;
}

export default function EditUserModal({
  setUserModal,
  loggedUser,
}: EditUserModalProps) {
  const [filledInput, setFilledInput] = useState(true);
  const [error, setError] = useState("");
  const [editedUser, setEditedUser] = useState<User>(loggedUser);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedUser((prevValues) => ({ ...prevValues, [name]: value }));

    const inputs = document.querySelectorAll(".text-input");
    const allFilled = Array.from(inputs).every(
      (input) => (input as HTMLInputElement).value.trim() !== ""
    );
    setFilledInput(!allFilled);
    console.log("editedUser", editedUser);
  };

  // Edit user infos
  const handleEditUser = async () => {
    setIsSaving(true);
    await editUser(editedUser);
  };

  // Edit user
  const editUser = async (user: User | null) => {
    // Call API with PUT method
    const response = await fetch(`/api/users/editUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    });

    if (!response.ok || response.status >= 300) {
      setError("Une erreur est survenue");
      return;
    }
  };

  return (
    <div className="fixed inset-0 bg-pink950 bg-opacity-50 flex-center z-[100]">
      <div className="bg-white p-9 rounded-3xl w-full max-w-2xl">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h2 className="h2-style">Ajouter une activité</h2>
          <Button variant="secondary" onClick={() => setUserModal(false)}>
            <Image src="/cross.svg" alt="Fermer" width={24} height={24}></Image>
            Fermer
          </Button>
        </div>
        <form
          //onSubmit={handleSaveEdit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="title">Prénom : </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder=""
              className="text-input"
              value={editedUser.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Nom">Nom : </label>
            <input
              name="lastname"
              id="lastname"
              placeholder=""
              className="text-input"
              value={editedUser.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="location">Email : </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder=""
              className="text-input"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              //onClick={() => handleDelete()}
            >
              Supprimer mon compte
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={filledInput || isSaving}
              onClick={handleEditUser}
            >
              {isSaving ? "Un instant..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

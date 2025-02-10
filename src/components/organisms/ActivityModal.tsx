import Button from "../cells/Button";
import Image from "next/image";
import { CreateActivity } from "@/app/api/activities/createActivity/route";
import { useState, useEffect } from "react";
import { Activity } from "@/src/types/Activity";

interface ActivityModalProps {
  setEditModal: (value: boolean) => void;
  activity?: Activity;
  handleDelete: (activity: Activity) => void;
  setLocalActivities: (
    value: (prevActivities: Activity[]) => Activity[]
  ) => void;
}

export default function ActivityModal({
  setEditModal,
  activity,
  handleDelete,
  setLocalActivities,
}: ActivityModalProps) {
  const [filledInput, setFilledInput] = useState(true);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    date: "",
    score: "",
    image_1: "",
    image_2: "",
    image_3: "",
  });

  useEffect(() => {
    if (activity) {
      const images = JSON.parse(activity.images);
      setFormValues({
        title: activity.title,
        description: activity.description,
        location: activity.location,
        price: activity.price.toString(),
        date: activity.date,
        score: activity.score.toString(),
        image_1: images[0] || "",
        image_2: images[1] || "",
        image_3: images[2] || "",
      });
    }
  }, [activity]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (filledInput) return;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("form data", formData);
    setLocalActivities((prevActivities: Activity[]) => {
      const newActivity = {
        rowid: prevActivities.length + 1,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        location: formData.get("location") as string,
        date: formData.get("date") as string,
        score: parseFloat(formData.get("score") as string),
        price: parseFloat(formData.get("price") as string),
        images: JSON.stringify([
          formData.get("image_1"),
          formData.get("image_2"),
          formData.get("image_3"),
        ]),
      };
      return [...prevActivities, newActivity];
    });
    await CreateActivity(formData);
    setEditModal(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    const inputs = document.querySelectorAll(".text-input");
    const allFilled = Array.from(inputs).every(
      (input) => (input as HTMLInputElement).value.trim() !== ""
    );
    setFilledInput(!allFilled);
  };

  const handleSaveEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const images = [formValues.image_1, formValues.image_2, formValues.image_3];
    const activityData = {
      rowid: activity?.rowid,
      title: formValues.title,
      description: formValues.description,
      location: formValues.location,
      date: formValues.date,
      score: parseFloat(formValues.score),
      price: parseFloat(formValues.price),
      images: JSON.stringify(images),
    };
    await editActivity(activityData);
  };

  // Edit activity
  const editActivity = async (activityData: any) => {
    // Call API with PUT method
    const response = await fetch(`/api/activities/editActivity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok || response.status >= 300) {
      setError("Une erreur est survenue");
      return;
    }

    const data = await response.json();

    console.log("response from modal", data.response);
    setLocalActivities((prevActivities: Activity[]) => {
      const updatedActivities = [...prevActivities];
      updatedActivities[data.response.rowid - 1] = data.response;
      return updatedActivities;
    });

    setEditModal(false);
  };

  return (
    <div className="fixed inset-0 bg-pink950 bg-opacity-50 flex-center z-[100]">
      <div className="bg-white p-9 rounded-3xl w-full max-w-2xl">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h2 className="h2-style">Ajouter une activité</h2>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            <Image src="/cross.svg" alt="Fermer" width={24} height={24}></Image>
            Fermer
          </Button>
        </div>
        <form
          onSubmit={activity ? handleSaveEdit : handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="title">Titre : </label>
            <input
              type="text"
              name="title"
              id="activity_name"
              placeholder=""
              className="text-input"
              value={formValues.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description : </label>
            <textarea
              name="description"
              id="activity_description"
              placeholder=""
              className="text-input"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="location">Lieu : </label>
            <input
              type="text"
              name="location"
              id="activity_location"
              placeholder=""
              className="text-input"
              value={formValues.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="price">Prix : </label>
              <input
                type="number"
                name="price"
                id="activity_price"
                placeholder=""
                className="text-input"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date">Date : </label>
              <input
                type="text"
                name="date"
                id="activity_date"
                placeholder=""
                className="text-input"
                value={formValues.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="score">Note sur 5 : </label>
              <input
                type="number"
                name="score"
                id="activity_score"
                placeholder=""
                className="text-input"
                value={formValues.score}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="images">3 liens d'images :</label>
            <input
              type="text"
              name="image_1"
              id="activity_image_1"
              placeholder=""
              className="text-input mb-2"
              value={formValues.image_1}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image_2"
              id="activity_image_2"
              placeholder=""
              className="text-input mb-2"
              value={formValues.image_2}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image_3"
              id="activity_image_3"
              placeholder=""
              className="text-input"
              value={formValues.image_3}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="submit" variant="primary" disabled={filledInput}>
              {activity ? "Enregistrer" : "Ajouter"}
            </Button>
            {activity && activity.rowid !== undefined && (
              <Button
                variant="secondary"
                onClick={() => handleDelete(activity)}
              >
                Supprimer
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

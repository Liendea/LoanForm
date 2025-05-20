import { useState, useEffect } from "react";
import "./Step.css";

export default function Step1({ setFormData }) {
  //Hämta data från localstorage och sett den lagdrade datan, om den finns, som default value
  const savedData = JSON.parse(localStorage.getItem("step1Data")) || {};

  const [firstName, setFirstName] = useState(savedData.firstName || "");
  const [lastName, setLastName] = useState(savedData.lastName || "");
  const [personalNumber, setPersonalNumber] = useState(
    savedData.personalNumber || ""
  );

  // Uppdatera formData när lokala inputs ändras
  useEffect(() => {
    const currentData = {
      firstName,
      lastName,
      personalNumber,
    };

    // uppdatera formdatan med den föregående datan och lägg till nuvarande datan
    setFormData((prev) => ({
      ...prev,
      ...currentData,
    }));

    // Spara i localstorage
    localStorage.setItem("step1Data", JSON.stringify(currentData));
  }, [firstName, lastName, personalNumber, setFormData]);

  return (
    <section className="content">
      <h2> PERSONUPPGIFTER </h2>
      <div className="form">
        <input
          type="text"
          name="firstName"
          placeholder="Förnamn"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Efternamn"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <br />
        <input
          type="date"
          name="personalNumber"
          placeholder="Personnumer"
          value={personalNumber}
          onChange={(e) => setPersonalNumber(e.target.value)}
        />
      </div>
    </section>
  );
}

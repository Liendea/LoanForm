import { useState, useEffect } from "react";
import "./Step.css";

export default function Step4({ setFormData }) {
  //Hämta data från localstorage och sett den lagdrade datan, om den finns, som default value
  const savedData = JSON.parse(localStorage.getItem("step4Data")) || {};

  const [telephoneNumber, setTelephoneNumber] = useState(
    savedData.telephoneNumber || ""
  );
  const [comment, setComment] = useState(savedData.comment || "");

  // Uppdatera formData när lokala inputs ändras
  useEffect(() => {
    const currentData = {
      telephoneNumber,
      comment,
    };
    setFormData((prev) => ({
      ...prev,
      ...currentData,
    }));
    // Spara i localstorage
    localStorage.setItem("step4Data", JSON.stringify(currentData));
  }, [telephoneNumber, comment, setFormData]);

  return (
    <section className="content">
      <h2> ÖVRIGT </h2>
      <div className="form">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Telefonnummer"
          value={telephoneNumber}
          onChange={(e) => setTelephoneNumber(e.target.value)}
        />
        <br />
        <textarea
          type="text"
          name="comment"
          placeholder="Kommentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </section>
  );
}

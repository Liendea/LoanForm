import { useState, useEffect } from "react";
import "../App.css";

export default function Step4({ setFormData, errors, setErrors }) {
  //Hämta data från localstorage och sett den lagdrade datan, om den finns, som default value
  const savedData = JSON.parse(localStorage.getItem("step4Data")) || {};

  const [phoneNumber, setphoneNumber] = useState(savedData.phoneNumber || "");
  const [comment, setComment] = useState(savedData.comment || "");

  // Funktion för validering
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    // validering
    if (fieldName === "phoneNumber") {
      const phoneRegex = /^(\+46|0)7[\d-]{8,}$/;
      if (!value.trim()) {
        newErrors.phoneNumber = "*Telefonnummer krävs";
      } else if (!phoneRegex.test(value.trim())) {
        newErrors.phoneNumber =
          "*Ogiltigt telefonnummer tillåtna format: +46700123456, 0700123456";
      } else {
        delete newErrors.phoneNumber;
      }
    }
    setErrors(newErrors);
  };

  // Uppdatera formData när lokala inputs ändras
  useEffect(() => {
    // om inga fel finns , uppdatra formdatan
    if (Object.keys(errors).length === 0) {
      const currentData = {
        phoneNumber,
        comment,
      };

      // uppdatera formdatan med den föregående datan och lägg till nuvarande datan
      setFormData((prev) => ({
        ...prev,
        ...currentData,
      }));
      // Spara i localstorage
      localStorage.setItem("step4Data", JSON.stringify(currentData));
    }
  }, [phoneNumber, comment, errors, setFormData]);

  return (
    <section className="content">
      <h2> ÖVRIGT </h2>
      <div className="form">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="*Telefonnummer"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
          onBlur={(e) => validateField("phoneNumber", e.target.value)}
        />
        {errors.phoneNumber && (
          <p style={{ color: "red", marginBottom: "4px", textAlign: "left" }}>
            {errors.phoneNumber}
          </p>
        )}

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

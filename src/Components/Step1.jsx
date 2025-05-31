import { useState, useEffect } from "react";
import "../App.css";

export default function Step1({ setFormData, errors, setErrors }) {
  //Hämta data från localstorage och sett den lagdrade datan, om den finns, som default value
  const savedData = JSON.parse(localStorage.getItem("step1Data")) || {};

  const [firstName, setFirstName] = useState(savedData.firstName || "");
  const [lastName, setLastName] = useState(savedData.lastName || "");
  const [age, setAge] = useState(
    savedData.age !== undefined ? Number(savedData.age) : null
  );

  // Funktion för validering
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    // validering
    if (fieldName === "firstName") {
      if (!value.trim()) {
        newErrors.firstName = "*Förnamn krävs";
      } else {
        delete newErrors.firstName;
      }
    }

    if (fieldName === "lastName") {
      if (!value.trim()) {
        newErrors.lastName = "*Efternamn krävs";
      } else {
        delete newErrors.lastName;
      }
    }

    if (fieldName === "age") {
      const numericAge = Number(value);

      if (!value || isNaN(numericAge) || numericAge < 18) {
        newErrors.age = "*Ange giltig ålder (minst 18 år)";
      } else {
        delete newErrors.age;
      }
    }

    setErrors(newErrors);
  };

  // Uppdatera formData när lokala inputs ändras
  useEffect(() => {
    // om inga fel finns , uppdatra formdatan
    if (Object.keys(errors).length === 0) {
      const currentData = {
        firstName,
        lastName,
        age,
      };

      // uppdatera formdatan med den föregående datan och lägg till nuvarande datan
      setFormData((prev) => ({
        ...prev,
        ...currentData,
      }));

      // Spara i localstorage
      localStorage.setItem("step1Data", JSON.stringify(currentData));
    }
  }, [firstName, lastName, age, errors, setFormData]);

  return (
    <section className="content">
      <h2> PERSONUPPGIFTER </h2>
      <div className="form">
        <div className="input-wrapper">
          <input
            type="text"
            name="firstName"
            placeholder="*Förnamn"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => validateField("firstName", e.target.value)}
          />
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="lastName"
            placeholder="*Efternamn"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => validateField("lastName", e.target.value)}
          />
          {errors.lastName && (
            <p className="error-message">{errors.lastName}</p>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            name="age"
            placeholder="*Ålder"
            value={age === null ? "" : age}
            onChange={(e) => {
              const value = e.target.value;
              setAge(value === "" ? null : Number(value));
            }}
            onBlur={(e) => validateField("age", e.target.value)}
          />
          {errors.age && <p className="error-message">{errors.age}</p>}
        </div>
      </div>
    </section>
  );
}

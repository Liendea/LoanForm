import { useState, useEffect } from "react";
import "../App.css";

export default function Step2({ setFormData, errors, setErrors }) {
  //Hämta data från localstorage och sett den lagdrade datan, om den finns, som default value
  const savedData = JSON.parse(localStorage.getItem("step2Data")) || {};

  const [isEmployed, setIsEmployed] = useState(savedData.isEmployed || false);
  const [employmentType, setEmploymentType] = useState(
    savedData.employmentType || "Anställningsform"
  );
  const [annualSalary, setAnnualSalary] = useState(
    savedData.annualSalary || "Årslön"
  );

  const [warning, setWarning] = useState(false);

  // Funktion för validering
  const validateField = (fieldName, value) => {
    const newErrors = {};
    // validering
    if (fieldName === "annualSalary") {
      if (value == "Årslön") {
        newErrors.annualSalary = "*Ange inkomst";
      } else {
        delete newErrors.annualSalary;
      }
    }

    setErrors(newErrors);
  };

  // Varna om lönen är låg
  function controlSalary(value) {
    if (value == "<300000") {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      const currentData = {
        isEmployed,
        employmentType,
        annualSalary,
      };

      setFormData((prev) => ({
        ...prev,
        ...currentData,
      }));
      // Spara i localstorage
      localStorage.setItem("step2Data", JSON.stringify(currentData));
    }
  }, [
    isEmployed,
    employmentType,
    annualSalary,
    errors,
    setErrors,
    setFormData,
  ]);

  return (
    <section className="content">
      <h2> LÖNEUPPGIFTER </h2>
      <div className="form">
        <div className="checkbox">
          <h4>Anställd</h4>

          <input
            type="checkbox"
            name="isEmployed"
            checked={isEmployed}
            onChange={() => setIsEmployed((prev) => !prev)}
          />
        </div>
        <br />
        <select
          name="employmentType"
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
          disabled={!isEmployed}
        >
          <option value="Anställningsform" disabled>
            Anställningsform
          </option>
          <option value="Tillsvidare">Tillsvidare</option>
          <option value="Provanställning">Provanställning</option>
          <option value="Vikariat">Vikariat</option>
          <option value="Internship">Internship</option>
        </select>
        <br />

        <select
          name="annualSalary"
          value={annualSalary}
          onChange={(e) => {
            setAnnualSalary(e.target.value);
            controlSalary(e.target.value);
            validateField("annualSalary", e.target.value);
          }}
          onBlur={(e) => validateField("annualSalary", e.target.value)}
        >
          <option value="Årslön" disabled>
            Årslön
          </option>
          <option value="<300000"> {`< 300'000 kr`}</option>
          <option value="300000-400000">300'000 kr - 400'000 kr</option>
          <option value="400000-500000">400'000 kr - 500'000 kr</option>
          <option value="500000-600000">500'000 kr - 600'000 kr</option>
          <option value="600000">{`> 600'000 kr`}</option>
        </select>
        {errors.annualSalary && (
          <p style={{ color: "red", marginTop: "4px" }}>
            {errors.annualSalary}
          </p>
        )}
        {warning && (
          <p style={{ color: "purple", marginTop: "4px" }}>
            Observera att en låg inkomst kan påverka din ansökan
          </p>
        )}
      </div>
    </section>
  );
}

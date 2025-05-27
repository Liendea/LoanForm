import { useState, useEffect } from "react";
import "../App.css";

export default function Step2({ setFormData }) {
  //Hämta data från localstorage och sett den lagdrade datan, om den finns, som default value
  const savedData = JSON.parse(localStorage.getItem("step2Data")) || {};

  const [isEmployed, setIsEmployed] = useState(savedData.isEmployed || false);
  const [employmentType, setEmploymentType] = useState(
    savedData.employmentType || "Anställningsform"
  );
  const [annualSalary, setAnnualSalary] = useState(
    savedData.annualSalary || "Årslön"
  );

  useEffect(() => {
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
  }, [isEmployed, employmentType, annualSalary, setFormData]);

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
          onChange={(e) => setAnnualSalary(e.target.value)}
        >
          {" "}
          <option value="Årslön" disabled>
            Årslön
          </option>
          <option value="300000>"> {`< 300'000 kr`}</option>
          <option value="300000-400000">300'000 kr - 400'000 kr</option>
          <option value="400000-500000">400'000 kr - 500'000 kr</option>
          <option value="500000-600000">500'000 kr - 600'000 kr</option>
          <option value="600000">{`> 600'000 kr`}</option>
        </select>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import "../App.css";

export default function Step3({ setFormData }) {
  //Hämta data från localstorage och sett den lagdrade datan, om den finns, som default value
  const savedData = JSON.parse(localStorage.getItem("step3Data")) || {};

  const [loanAmount, setLoanAmount] = useState(savedData.loanAmount || "");
  const [loanPurpose, setLoanPurpose] = useState(savedData.loanPurpose || "");
  const [repaymentPlan, setRepaymentPlan] = useState(
    savedData.repaymentPlan || "Återbetaningsplan"
  );

  // Uppdatera formData när lokala inputs ändras
  useEffect(() => {
    const currentData = {
      loanAmount,
      loanPurpose,
      repaymentPlan,
    };

    setFormData((prev) => ({
      ...prev,
      ...currentData,
    }));
    // Spara i localstorage
    localStorage.setItem("step3Data", JSON.stringify(currentData));
  }, [loanAmount, loanPurpose, repaymentPlan, setFormData]);

  return (
    <section className="content">
      <h2> LÅNEUPPGIFTER </h2>
      <div className="form">
        <input
          type="number"
          name="loanAmount"
          placeholder="Önskat lånebelopp"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          min="0"
        />
        <br />
        <select
          name="repaymentPlan"
          value={repaymentPlan}
          onChange={(e) => setRepaymentPlan(e.target.value)}
        >
          <option value="Återbetaningsplan" disabled>
            Återbetaningsplan
          </option>
          <option value="extra-kort">{"< 1 år"} </option>
          <option value="kort">1-3 år</option>
          <option value="mellan">3-5 år</option>
          <option value="lång">5-10 år</option>
          <option value="extra-lång">{"> 10 år"}</option>
        </select>
        <br />
        <input
          type="text"
          name="loanPurpose"
          placeholder="Syfte med lånet"
          value={loanPurpose}
          onChange={(e) => {
            setLoanPurpose(e.target.value);
          }}
        />
      </div>
    </section>
  );
}

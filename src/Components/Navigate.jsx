import "./Navigate.css";

export default function Navigate({
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
}) {
  function handlePrevious() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }

  function handleNext() {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  }

  function handleSubmit() {
    // Skriv ut inskickad data i konsollen
    console.log("Fomulär inskcikat", formData);

    // rensa localstorage
    localStorage.removeItem("step1Data");
    localStorage.removeItem("step2Data");
    localStorage.removeItem("step3Data");
    localStorage.removeItem("step4Data");

    // Nollställ
    setFormData({
      firstName: "",
      lastName: "",
      personalNumber: "",
      isEmployed: false,
      employmentType: "",
      annualSalary: "",
      loanAmount: "",
      loanPurpose: "",
      repaymentPlan: "",
      phoneNumber: "",
      comment: "",
    });

    //gå till steg5
    setCurrentStep(5);
  }

  return (
    <section className="navigation">
      <div
        className="navButtons"
        style={
          currentStep === 5
            ? { justifyContent: "center" }
            : currentStep < 2
            ? { justifyContent: "flex-end" }
            : { justifyContent: "space-between" }
        }
      >
        {currentStep > 1 && currentStep < 5 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {currentStep < 4 && <button onClick={handleNext}>Next</button>}
        {currentStep === 4 && (
          <button style={{ backgroundColor: "#582ca3" }} onClick={handleSubmit}>
            Send
          </button>
        )}
        {currentStep === 5 && (
          <button
            style={{ backgroundColor: "#582ca3" }}
            onClick={() => setCurrentStep(1)}
          >
            OK
          </button>
        )}
      </div>

      <div
        className="steps"
        style={currentStep === 5 ? { display: "none" } : { display: "flex" }}
      >
        <div className={currentStep >= 1 ? "active" : ""}>1</div>
        <div className={currentStep >= 2 ? "active" : ""}>2</div>
        <div className={currentStep >= 3 ? "active" : ""}>3</div>
        <div className={currentStep === 4 ? "active" : ""}>4</div>
      </div>
    </section>
  );
}

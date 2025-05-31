import "../App.css";

export default function Navigate({
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
  errors,
  setErrors,
  setIsLoading,
}) {
  /* Validerings funktion*/
  function validateStepData(step, data) {
    const errors = {};

    switch (step) {
      case 1:
        if (!data.firstName?.trim()) {
          errors.firstName = "*Förnamn krävs";
        }
        if (!data.lastName?.trim()) {
          errors.lastName = "*Efternamn krävs";
        }
        if (!data.age || isNaN(Number(data.age)) || Number(data.age) < 18) {
          errors.age = "*Ange giltig ålder (minst 18 år)";
        }
        break;

      case 2:
        if (!data.annualSalary || data.annualSalary === "*Årslön") {
          errors.annualSalary = "*Ange inkomst";
        }
        break;

      case 4:
        if (!data.phoneNumber?.trim()) {
          errors.phoneNumber = "*Telefonnummer krävs";
        }
        break;

      default:
        break;
    }
    return errors;
  }

  /* Återställnings funktion*/
  function resetForm() {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      isEmployed: false,
      employmentType: "",
      annualSalary: "",
      loanAmount: "",
      loanPurpose: "",
      repaymentPlan: "",
      phoneNumber: "",
      comment: "",
    });

    ["step1Data", "step2Data", "step3Data", "step4Data"].forEach((key) =>
      localStorage.removeItem(key)
    );
  }

  // PREVIOUS
  function handlePrevious() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }

  // NEXT
  function handleNext() {
    const newErrors = validateStepData(currentStep, formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Vänligen fyll i alla obligatoriska fält");
      return;
    }
    setErrors({});
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  }

  // SUBMIT
  function handleSubmit() {
    if (Object.keys(errors).length !== 0 || formData.phoneNumber === "") {
      alert("Vänligen fyll i alla obligatoriska fält");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      console.log("Fomulär inskickat", formData);
      resetForm();
      setIsLoading(false);
      setCurrentStep(5);
    }, 1000);
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

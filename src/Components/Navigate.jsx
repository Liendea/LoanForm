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
  // PREVIOUS
  function handlePrevious() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }

  // NEXT
  function handleNext() {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName || formData.firstName.trim() === "") {
        newErrors.firstName = "*Förnamn krävs";
      }
      if (!formData.lastName || formData.lastName.trim() === "") {
        newErrors.lastName = "*Efternamn krävs";
      }
      const age = Number(formData.age);
      if (!formData.age || isNaN(age) || age < 18) {
        newErrors.age = "*Ange giltig ålder (minst 18 år)";
      }
    }

    if (currentStep === 2) {
      if (!formData.annualSalary || formData.annualSalary === "*Årslön") {
        newErrors.annualSalary = "*Ange inkomst";
      }
    }

    if (currentStep === 4) {
      if (!formData.phoneNumber || formData.phoneNumber.trim() === "*Årslön") {
        newErrors.phoneNumber = "*Telefonnummer krävs";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Vänligen fyll i alla obligatoriska fält");
      return;
    }

    setErrors({});
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  }

  // // NEXT
  // function handleNext() {
  //   if (
  //     Object.keys(errors).length !== 0 ||
  //     formData.firstName.trim() === "" ||
  //     formData.lastName.trim() === "" ||
  //     formData.age === "" ||
  //     formData.age === null ||
  //     formData.annualSalary.trim() === "*Årslön"
  //   ) {
  //     alert("Vänligen fyll i alla obligatoriska fält");

  //     return;
  //   }
  //   setErrors({});

  //   if (currentStep < 4) setCurrentStep(currentStep + 1);
  // }

  // SUBMIT
  function handleSubmit() {
    if (Object.keys(errors).length !== 0 || formData.phoneNumber === "") {
      alert("Vänligen fyll i alla obligatoriska fält");
      return;
    }

    setIsLoading(true);

    // Timer på 1 sekund
    setTimeout(() => {
      // Skriv ut inskickad data i konsollen
      console.log("Fomulär inskickat", formData);

      // Nollställ
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

      // rensa localstorage
      localStorage.removeItem("step1Data");
      localStorage.removeItem("step2Data");
      localStorage.removeItem("step3Data");
      localStorage.removeItem("step4Data");

      setIsLoading(false);

      //gå till steg5
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

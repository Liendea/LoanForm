import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Navigate from "./Navigate";

export default function LoanApplication({ currentStep, setCurrentStep }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: null,
    isEmployed: false,
    employmentType: "",
    annualSalary: "",
    loanAmount: "",
    loanPurpose: "",
    repaymentPlan: "",
    phoneNumber: "",
    comment: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      {currentStep === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {currentStep === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 4 && (
        <Step4
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {currentStep === 5 && <Step5 setCurrentStep={setCurrentStep} />}

      <Navigate
        formData={formData}
        setFormData={setFormData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        errors={errors}
        setErrors={setErrors}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

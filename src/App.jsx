import { useState } from "react";
import "./App.css";
import LoanApplication from "./Components/LoanApplication";
import Logo from "./Components/Logo";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <header>
        <Logo />
      </header>
      <main style={currentStep === 5 ? { height: "auto" } : {}}>
        <LoanApplication
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </main>
    </>
  );
}

export default App;

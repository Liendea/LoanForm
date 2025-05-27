import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const step1Schema = z.object({
  name: z.string().min(1, "Förnamn krävs"),
  lastName: z.string().min(1, "Efternamn krävs"),
  personalNumber: z.date().required("Personnummer krävs"),
});

export const step2Schema = z.object({
  isEmployed: z.boolean(),
  employmentType: z.string().when("isEmployed", {
    is: true,
    then: (schema) => schema.required("Välj anställningstyp"),
  }),
  annualSalary: z.date().required("Ange inkomst"),
});

export const step3Schema = z.object({
  loanAmount: z.number().required("Ange önskat lånebelopp"),
  loanPurpose: z.string().required("Ange syfte med lån"),
  repaymentPlan: z.select().required("Ange återbelningsplan"),
});

export const step4Schema = z.object({
  telephoneNumber: z.number().required("Ange telefonnummer"),
});

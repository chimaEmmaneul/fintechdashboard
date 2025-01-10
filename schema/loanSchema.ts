import { z } from "zod";

export const LoanFormSchema = z.object({
  loanAmount: z
    .string()
    .nonempty("Loan amount is required")
    .regex(/^\d+$/, "Loan amount must be a valid number"),
  loanTenure: z
    .string()
    .nonempty("Loan tenure is required")
    .regex(/^\d+$/, "Loan tenure must be a valid number"),
  loanPurpose: z
    .string()
    .nonempty("Loan purpose is required")
    .min(3, "Loan purpose must be at least 3 characters"),
});

export type LoanFormData = z.infer<typeof LoanFormSchema>;

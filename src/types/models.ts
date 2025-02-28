export type Inputs = {
  mortgageAmount: string | number
  mortgageTerm: string | number
  interestRate: string | number
  mortgageType: 'repayment' | 'interestOnly'
}

export interface MortgageCalculationResult {
  monthlyPayment: number
  totalPayment: number
}

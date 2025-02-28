import { formatCurrency } from '../helperFunctions/formatCurrency'
import { MortgageCalculationResult } from '../types/models'

function Results(submittedData: MortgageCalculationResult) {
  return (
    <div className="calculator__your-results">
      <h2>Your results</h2>
      <p>
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      <div className="calculator__results-container">
        <p>Your monthly repayments</p>
        <p className="calculator__repayments">
          £{formatCurrency(submittedData.monthlyPayment)}
        </p>
        <hr />
        <p>Total you'll repay over the term</p>
        <p className="calculator__total">
          £{formatCurrency(submittedData.totalPayment)}
        </p>
      </div>
    </div>
  )
}

export default Results

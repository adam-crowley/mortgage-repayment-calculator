import { useForm, SubmitHandler } from 'react-hook-form'
import Footer from './components/Footer'

type Inputs = {
  mortgageAmount: string | number
  mortgageTerm: string | number
  interestRate: string | number
  mortgageType: 'repayment' | 'interestOnly'
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const validateNumber = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return !isNaN(num) && isFinite(num)
  }

  console.log(watch('mortgageAmount')) // watch input value by passing the name of it
  return (
    <>
      <div className="container">
        <main className="calculator">
          <div className="calculator__calc">
            <div className="calculator__head">
              <h1>Mortgage Calculator</h1>{' '}
              <button className="calculator__clear-btn">Clear All</button>
            </div>

            <form
              className="calculator__form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="mortgageAmount">Mortgage Amount</label>
              <div className="calculator__inputgroup calculator__inputgroup--mortgageAmount">
                <input
                  type="text"
                  id="mortgageAmount"
                  {...register('mortgageAmount', {
                    required: 'This field is required',
                    validate: {
                      isNumber: (value) =>
                        validateNumber(value) || 'Please enter a valid number',
                      isPositive: (value) => {
                        const num =
                          typeof value === 'string' ? parseFloat(value) : value
                        return (
                          (validateNumber(value) && num > 0) ||
                          'Amount must be greater than 0'
                        )
                      },
                    },
                  })}
                />
                <span>£</span>
                {errors.mortgageAmount && (
                  <div className="calculator__err">
                    {errors.mortgageAmount.message}
                  </div>
                )}
              </div>

              <div className="calculator__2-col">
                <div className="calculator__col">
                  <label htmlFor="mortgageTerm">Mortgage Term</label>
                  <div className="calculator__inputgroup calculator__inputgroup--mortgageTerm">
                    <input
                      type="text"
                      id="mortgageTerm"
                      {...register('mortgageTerm', {
                        required: 'This field is required',
                        validate: {
                          isNumber: (value) =>
                            validateNumber(value) ||
                            'Please enter a valid number',
                          isPositive: (value) => {
                            const num =
                              typeof value === 'string'
                                ? parseFloat(value)
                                : value
                            return (
                              (validateNumber(value) && num > 0) ||
                              'Term must be greater than 0'
                            )
                          },
                          isWhole: (value) => {
                            const num =
                              typeof value === 'string'
                                ? parseFloat(value)
                                : value
                            return (
                              (validateNumber(value) &&
                                Number.isInteger(num)) ||
                              'Please enter a whole number'
                            )
                          },
                        },
                      })}
                    />
                    <span>years</span>
                    {errors.mortgageTerm && (
                      <div className="calculator__err">
                        {errors.mortgageTerm.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="calculator__col">
                  <label htmlFor="interestRate">Interest Rate</label>
                  <div className="calculator__inputgroup calculator__inputgroup--interestRate">
                    <input
                      type="text"
                      id="interestRate"
                      {...register('interestRate', {
                        required: 'This field is required',
                        validate: {
                          isNumber: (value) =>
                            validateNumber(value) ||
                            'Please enter a valid number',
                          isPositive: (value) => {
                            const num =
                              typeof value === 'string'
                                ? parseFloat(value)
                                : value
                            return (
                              (validateNumber(value) && num >= 0) ||
                              'Rate cannot be negative'
                            )
                          },
                          isReasonable: (value) => {
                            const num =
                              typeof value === 'string'
                                ? parseFloat(value)
                                : value
                            return (
                              (validateNumber(value) && num <= 100) ||
                              'Rate cannot exceed 100%'
                            )
                          },
                        },
                      })}
                    />
                    <span>%</span>
                    {errors.interestRate && (
                      <div className="calculator__err">
                        {errors.interestRate.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <legend>Mortgage Type</legend>
              <div className="calculator__radio-group">
                <label htmlFor="repayment">
                  <input
                    type="radio"
                    id="repayment"
                    value="repayment"
                    {...register('mortgageType', { required: true })}
                  />
                  Repayment
                </label>
              </div>
              <div className="calculator__radio-group calculator__radio-group--last">
                <label htmlFor="interestOnly">
                  <input
                    type="radio"
                    id="interestOnly"
                    value="interestOnly"
                    {...register('mortgageType', { required: true })}
                  />
                  Interest Only
                </label>
              </div>
              {errors.mortgageType && (
                <div className="calculator__err">
                  Please select a Mortgage Type
                </div>
              )}

              <button type="submit" className="calculator__submit">
                <img
                  src="/assets/images/icon-calculator.svg"
                  alt="Calculate Repayments icon"
                />
                Calculate Repayments
              </button>
            </form>
          </div>
          <div className="calculator__results">
            <div className="calculator__empty">
              <img
                src="/public/assets/images/illustration-empty.svg"
                alt="Results Shown Here illustration"
              />
              <p>Results shown here</p>
              <p>
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
              </p>
            </div>
            {/* <div className="calculator__your-results">
              <p>Your results</p>
              <p>
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                “calculate repayments” again.
              </p>
              <div>
                <p>Your monthly repayments</p>
                <p>Total you'll repay over the term</p>
              </div>
            </div> */}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App

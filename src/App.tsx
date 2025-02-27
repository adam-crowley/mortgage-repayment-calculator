import { useForm, SubmitHandler } from 'react-hook-form'
import Footer from './components/Footer'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'

type Inputs = {
  mortgageAmount: string | number
  mortgageTerm: string | number
  interestRate: string | number
  mortgageType: 'repayment' | 'interestOnly'
}

interface MortgageCalculationResult {
  monthlyPayment: number
  totalPayment: number
}

function App() {
  const [submittedData, setSubmittedData] =
    useState<MortgageCalculationResult>()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const calculateRepayments = (data: Inputs) => {
    const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = data
    const monthlyInterestRate = +interestRate / 100 / 12
    const numberOfPayments = +mortgageTerm * 12
    let monthlyPayment: number = 0,
      totalPayment: number = 0

    if (mortgageType === 'repayment') {
      monthlyPayment =
        (+mortgageAmount *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
      totalPayment = monthlyPayment * numberOfPayments
    } else if (mortgageType === 'interestOnly') {
      monthlyPayment = +mortgageAmount * monthlyInterestRate
      totalPayment = monthlyPayment * numberOfPayments + +mortgageAmount
    }

    return { monthlyPayment, totalPayment }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSubmittedData(calculateRepayments(data))
  }

  const validateNumber = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return !isNaN(num) && isFinite(num)
  }

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  console.log(watch('mortgageAmount'))

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
                <NumericFormat
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={false}
                  id="mortgageAmount"
                  onValueChange={(values) => {
                    const { value } = values
                    setValue('mortgageAmount', value)
                  }}
                  {...register('mortgageAmount', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[0-9]*\.?[0-9]*$/,
                      message: 'Please enter numbers only',
                    },
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
                      inputMode="numeric"
                      id="mortgageTerm"
                      {...register('mortgageTerm', {
                        required: 'This field is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Please enter whole numbers only',
                        },
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
                      inputMode="decimal"
                      id="interestRate"
                      {...register('interestRate', {
                        required: 'This field is required',
                        pattern: {
                          value: /^[0-9]*\.?[0-9]*$/,
                          message: 'Please enter numbers only',
                        },
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
            {submittedData ? (
              <div className="calculator__your-results">
                <h2>Your results</h2>
                <p>
                  Your results are shown below based on the information you
                  provided. To adjust the results, edit the form and click
                  “calculate repayments” again.
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
            ) : (
              <div className="calculator__empty">
                <img
                  src="/public/assets/images/illustration-empty.svg"
                  alt="Results Shown Here illustration"
                />
                <h2>Results shown here</h2>
                <p>
                  Complete the form and click “calculate repayments” to see what
                  your monthly repayments would be.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App

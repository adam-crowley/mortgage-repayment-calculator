import { useForm, SubmitHandler } from 'react-hook-form'
import Footer from './components/Footer'

type Inputs = {
  mortgageAmount: number
  mortgageTerm: number
  interestRate: number
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

  console.log(watch('mortgageAmount')) // watch input value by passing the name of it
  return (
    <>
      <div className="container">
        <main className="calculator">
          <div className="calculator__calc">
            <h1>Mortgage Calculator</h1> <button>Clear All</button>
            <form
              className="calculator__form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="mortgageAmount">Mortgage Amount</label>
              <input
                type="text"
                id="mortgageAmount"
                {...register('mortgageAmount', { required: true })}
              />
              <span>£</span>
              {errors.mortgageAmount && <span>This field is required</span>}
              <label htmlFor="mortgageTerm">Mortgage Term</label>
              <input
                type="text"
                id="mortgageTerm"
                {...register('mortgageTerm', { required: true })}
              />
              {errors.mortgageTerm && <span>This field is required</span>}
              <span>years</span>
              <label htmlFor="interestRate">Interest Rate</label>
              <input
                type="text"
                id="interestRate"
                {...register('interestRate', { required: true })}
              />
              {errors.interestRate && <span>This field is required</span>}
              <span>%</span>
              <legend>Mortgage Type</legend>
              <label htmlFor="repayment">Repayment</label>
              <input
                type="radio"
                id="repayment"
                value="repayment"
                {...register('mortgageType', { required: true })}
              />
              <label htmlFor="interestOnly">Interest Only</label>
              <input
                type="radio"
                id="interestOnly"
                value="interestOnly"
                {...register('mortgageType', { required: true })}
              />
              {errors.mortgageType && <span>This field is required</span>}

              <button type="submit">
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
            <div className="calculator__your-results">
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
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App

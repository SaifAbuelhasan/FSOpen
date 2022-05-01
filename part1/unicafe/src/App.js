import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  // Average and positive rounded to two decimal places
  const average = Math.round(((good-bad)/all)*100)/100
  const positive = Math.round((good/all)*100)/100
  return (
    <div>
      <h2>statistics</h2>
      {
        all !== 0
        ?
        <table>
          <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
        :
        <p>No feedback given</p>
      }
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handler={() => setGood(good+1)} text="good" />
      <Button handler={() => setNeutral(neutral+1)} text="neutral" />
      <Button handler={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

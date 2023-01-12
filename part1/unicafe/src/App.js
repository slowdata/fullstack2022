import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
  <tr>
    <td >{text}</td>
    <td >{value}</td>

  </tr>
)

const Statistics = ({ stat, count }) => (
  <StatisticLine text={stat} value={count} />
)

const Button = ({ children, handleClick }) => (
  <button onClick={() => handleClick()}>{children}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const hangleGoodClick = () => setGood(good + 1)
  const hangleNeutralClick = () => setNeutral(neutral + 1)
  const hangleBadClick = () => setBad(bad + 1)


  return (
    <div style={{
      minHeight: '100vh', display: 'grid',
      placeItems: 'center', alignContent: 'center'
    }}>
      <div>
        <h1>give feedback</h1>
        <div style={{ display: 'flex', gap: 2 }}>
          <Button handleClick={() => hangleGoodClick()}>good</Button>
          <Button handleClick={() => hangleNeutralClick()}>neutral</Button>
          <Button handleClick={() => hangleBadClick()}>bad</Button>
        </div>
        <div>
          <h1>statistics</h1>
          {(good || neutral || bad) ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <table style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Statistic</th>
                    <th style={{ textAlign: 'left' }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <Statistics stat="good" count={good} />
                  <Statistics stat="neutral" count={neutral} />
                  <Statistics stat="bad" count={bad} />
                  <Statistics stat="all" count={good + neutral + bad} />
                  <Statistics stat="average" count={!(good - bad) ? 0 : (good - bad) / (good + neutral + bad)} />
                  <Statistics stat="positive" count={!good ? '0 %' : `${good / (good + neutral + bad) * 100} %`} />
                </tbody>
              </table>
            </div>) : 'No feedback given'}

        </div>
      </div>
    </div>
  )
}

export default App
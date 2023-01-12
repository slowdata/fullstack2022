import { useState } from 'react'


const Statistic = ({stat, count}) => <p >{stat} {count}</p>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const hangleGoodClick = () => setGood(good + 1)
  const hangleNeutralClick = () => setNeutral(neutral + 1)
  const hangleBadClick = () => setBad(bad + 1)


  return (
    <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', alignContent: 'center'  }}>
      <div>
        <h1>give feedback</h1>
        <div style={{ display: 'flex', gap: 2 }}>
          <button onClick={() => hangleGoodClick()}>good</button>
          <button onClick={() => hangleNeutralClick()}>neutral</button>
          <button onClick={() => hangleBadClick()}>bad</button>
        </div>
        <h1>statistics</h1>
        <Statistic stat="good" count={good} />
        <Statistic stat="neutral" count={neutral} />
        <Statistic stat="bad" count={bad} />
        <Statistic stat="all" count={good+neutral+bad} />
        <Statistic stat="average" count={(good - bad)/(good+neutral+bad)} />
        <Statistic stat="positive" count={`${good/(good+neutral+bad)*100} %`} />
      </div>
    </div>
  )
}

export default App
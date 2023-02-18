import { useState, useEffect } from "react";

import axios from "axios";


function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [show, setShow] = useState({})

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res =>
        setCountries(res.data)
      )

  }, [])

  function handleChange(e) {
    const s = e.target.value
    const r = countries
      .filter(country => {
        // console.log(country.name.common);
        return country.name.common.toUpperCase().includes(s.toUpperCase())
      })
    setSearch(s)
    if (r.length === 1) {
      setShow(...r)
    }
    else {
      setShow({})
    }
    setResult(r)
  }

  function handleShow(country) {
    setShow(country)
  }

  return (
    <>
      <div>find countries <input value={search} onChange={handleChange} /></div>
      {result.length > 10 && <p>Too many matches, specify another filter</p>}
      {
        (result.length > 1 && result.length <= 10) &&
        <ul style={{ paddingLeft: 0 }}>
          {
            result.map(r =>
              <li style={{ listStyle: 'none', margin: 2 }} key={r.cca2}>{r.name.common}
                <button style={{ marginLeft: 5 }} key={r.cca2} onClick={() => handleShow(r)}>show</button></li>)
          }
        </ul>
      }
      {
        Object.keys(show).length > 0 &&
        <div>
          <h2>{show.name.common}</h2>
          <p style={{ padding: 2, margin: 0 }}>capital {show.capital[0]}</p>
          <p style={{ padding: 2, margin: 0 }}>area {show.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.keys(show.languages).map(lang => <li key={lang}>{show.languages[lang]}</li>)}
          </ul>
          <img style={{ width: '20%' }} src={show.flags.png} alt={show.name.common} />
        </div>
      }
    </>
  );
}

export default App;

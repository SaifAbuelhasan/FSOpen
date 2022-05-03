import { useEffect, useState } from "react"
import axios from 'axios'
import SearchCountry from "./SearchCountry"
import CountryDetails from "./CountryDetails"
import FoundCountries from "./FoundCountries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [q, setQ] = useState('')

  // Fetch countries from api and set them as initial state
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  // Filter countries by search query
  const foundCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().indexOf(q.toLowerCase()) > -1
  })

  return (
    <div>
      <SearchCountry q={q} handleChange={(event) => setQ(event.target.value)} />
      {
        foundCountries.length === 1
        ?
        <CountryDetails country={foundCountries[0]} />
        :
        (
          foundCountries.length <= 10
          ?
          <FoundCountries countries={foundCountries} handleShowCountry={(name) => setQ(name)}/>
          :
          null
        )
      }
    </div>
  )
}

export default App;
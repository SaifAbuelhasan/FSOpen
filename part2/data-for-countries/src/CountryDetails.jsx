import { useEffect, useState } from "react"
import axios from "axios"
import WeatherDetails from "./WeatherDetails"

const CountryDetails = ({country}) => {
    const [weather, setWeather] = useState({})
    const [loaded, setLoaded] = useState(false) // Will be set to true when weather data is loaded
    // Fetch weather data for country
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            setWeather(response.data)
        })
        .then(() => setLoaded(true))
    }, [country.capital]) // country.capital prop is used inside useEffect, hence it should be added to the dependency array.
    return (
        <div>
            <h1>{country.name.common}</h1>
            Capital {country.capital[0]}
            <br />
            Area {country.area}
            <div>
                <h3>Languages</h3>
                <ul>
                    {
                        Object.keys(country.languages).map((language) => 
                            <li key={language}><b>{country.languages[language]}</b></li> 
                        )
                    }
                </ul>
            </div>
            <img src={country.flags.png} alt="flag" />
            {
                loaded
                ?
                <WeatherDetails capital={country.capital[0]} weather={weather} />
                :
                null
            }
        </div>
    )
}
 
export default CountryDetails
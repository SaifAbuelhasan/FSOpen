const WeatherDetails = ({capital, weather}) => {
  console.log(weather)
  return (
    <div>
        <h2>Weather in {capital}</h2>
        <p>Temprature {`${weather.main.temp - 273.15} Celsius`}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main}/>
        <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}
 
export default WeatherDetails
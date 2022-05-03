const FoundCountries = ({countries, handleShowCountry}) => {
  return (
        countries.map((country) => {
            return(
                <div key={country.fifa}>
                    {country.name.common}
                    <button onClick={() => handleShowCountry(country.name.common)}>show</button>
                </div>
            )
        })
  )
}
 
export default FoundCountries
const SearchCountry = ({q, handleChange}) => {
  return (
    <div>Find countries <input value={q} onChange={handleChange} /></div>
  )
}
 
export default SearchCountry
const Filter = ({ handleFilter }) => {
    function handleChange(e) {
        handleFilter(e.target.value)
    }

    return (
        <div>filter shown with<input type="text" onChange={handleChange} /></div>
    )
}

export default Filter


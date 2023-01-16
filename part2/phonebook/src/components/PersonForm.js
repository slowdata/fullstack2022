import { useState } from "react"

const PersonForm = ({ addPerson }) => {
    const [newPerson, setNewPerson] = useState({
        name: '',
        number: ''
    })

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setNewPerson({ ...newPerson, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (newPerson.name === '') alert('Please add a name')
        else {
            addPerson(newPerson)
            setNewPerson({ name: '', number: '' })
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ maxWidth: '28%', display: 'flex', justifyContent: 'space-between' }}>
                name: <input name="name" value={newPerson.name} onChange={handleChange} />
            </div>
            <div style={{ maxWidth: '28%', display: 'flex', justifyContent: 'space-between' }}>
                number: <input name="number" value={newPerson.number} onChange={handleChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
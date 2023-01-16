import { useState } from "react";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState([...persons])

  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    setNewPerson({ ...newPerson, [name]: value })
  }

  function addPerson(e) {
    e.preventDefault();

    const existingName = newPerson.name && persons
      .find(person => person.name === newPerson.name)

    if (existingName === '') alert('Please add a name')
    else if (existingName !== undefined && existingName.name)
      alert(`${newPerson.name} is already added to phonebook`)
    else {
      const newPersonAdd = {
        id: persons.length + 1,
        name: newPerson.name,
        number: newPerson.number
      }
      setPersons([newPersonAdd, ...persons])
      setFilteredPersons([newPersonAdd, ...filteredPersons])
      setNewPerson({ name: '', number: '' })

    }
  }

  function handleFilter(search) {
    const filteredTmpPersons = persons
      .filter(p => p.name.toUpperCase().includes(search.toUpperCase()))
    console.log(filteredTmpPersons);
    if (search === 0)
      setFilteredPersons(persons)
    else
      setFilteredPersons(filteredTmpPersons)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input name="name" value={newPerson.name} onChange={handleChange} /></div>
        <div>number: <input name="number" value={newPerson.number} onChange={handleChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          filteredPersons
            .map(fPersons => <li key={fPersons.name}>{fPersons.name} {fPersons.number}</li>)
        }
      </ul>
    </div>
  );
}

export default App;

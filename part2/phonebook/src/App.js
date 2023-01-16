import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState([...persons])


  function addPerson(p) {
    const existingName = persons
      .find(person => person.name === p.name)

    if (existingName !== undefined && existingName.name)
      alert(`${p.name} is already added to phonebook`)
    else {
      const newPersonAdd = {
        id: persons.length + 1,
        name: p.name,
        number: p.number
      }
      setPersons([newPersonAdd, ...persons])
      setFilteredPersons([newPersonAdd, ...filteredPersons])
    }
  }

  function handleFilter(search) {
    const filteredTmpPersons = persons
      .filter(p => p.name.toUpperCase().includes(search.toUpperCase()))
    console.log(filteredTmpPersons);
    if (search.length === 0)
      setFilteredPersons(persons)
    else
      setFilteredPersons(filteredTmpPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
}

export default App;

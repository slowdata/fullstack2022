import { useState, useEffect } from "react";

import personsService from './services/persons.js'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    async function getAsyncPersons() {
      const persons = await personsService.getAll()
      if (persons.error)
        console.log(persons.error.message);
      else {
        setPersons(persons)
        setFilteredPersons(persons)

      }
    }
    getAsyncPersons()
  }, [])


  async function addPerson(p) {
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
      const person = await personsService.create(newPersonAdd)
      if (person.error) {
        console.log(person.error.message)
      } else {
        setPersons([person, ...persons])
        setFilteredPersons([person, ...filteredPersons])
      }
    }
  }
  async function handleDeletePerson(person) {
    try {
      const res = await personsService.remove(person.id)
      if (res) {
        alert(res.message)
      } else {
        setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))
        setPersons(persons.filter(p => p.id !== person.id))
      }
    } catch (error) {
      alert(error)
    }
  }

  function handleFilter(search) {
    const filteredTmpPeople = persons
      .filter(p => p.name.toUpperCase().includes(search.toUpperCase()))
    if (search.length === 0)
      setFilteredPersons(persons)
    else
      setFilteredPersons(filteredTmpPeople)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={handleDeletePerson} />
    </div>
  );
}

export default App;

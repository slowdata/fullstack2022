import { useState, useEffect } from "react";

import personsService from './services/persons.js'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification.js";

const App = () => {
  const [persons, setPersons] = useState(null)
  const [filteredPersons, setFilteredPersons] = useState([])
  const [message, setMessage] = useState({
    type: 'info',
    text: null
  })

  useEffect(() => {
    async function getAsyncPersons() {
      try {
        const persons = await personsService.getAll()
        setPersons(persons)
        setFilteredPersons(persons)
      } catch (error) {
        console.error(error.message)
      }
    }
    getAsyncPersons()
  }, [])


  async function addPerson(p) {
    const existingPerson = persons
      .find(person => person.name === p.name)

    if (existingPerson !== undefined && existingPerson.name) {
      if (confirm(`${p.name} is already added to phonebook, replace the older number with a new one?`)) {
        try {
          const updatedPerson = await personsService.update(existingPerson.id, p)
          setFilteredPersons([...filteredPersons.filter(per => per.id !== updatedPerson.id),
            updatedPerson])
          setPersons([...persons.filter(per => per.id !== updatedPerson.id), updatedPerson])
        } catch (error) {
          setMessage({ type: 'error', text: error.message })
          setTimeout(() => {
            setMessage({ ...message, text: null })
          }, 5000);
          setFilteredPersons([...filteredPersons.filter(per => per.id !== existingPerson.id)])
          setPersons([...persons.filter(per => per.id !== existingPerson.id)])
        }

      }
    }
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
        setMessage({ type: 'info', text: `Added ${person.name}` })
        setTimeout(() => setMessage({ ...message, text: null }), 5000)
        setPersons([...persons, person])
        setFilteredPersons([...filteredPersons, person])
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
      <Notification type={message.type} message={message.text} />
      <Filter handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={handleDeletePerson} />
    </div>
  );
}

export default App;

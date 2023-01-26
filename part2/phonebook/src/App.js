import { useState, useEffect } from "react";

import peopleService from './services/people.js'

import Filter from "./components/Filter";
import PeopleForm from "./components/PersonForm";
import People from "./components/People";

const App = () => {
  const [people, setPeople] = useState([])
  const [filteredPeople, setFilteredPeople] = useState([])

  useEffect(() => {

    async function getAsyncPeople() {
      const people = await peopleService.getAll()
      if (people.error)
        console.log(people.error.message);
      else {
        setPeople(people)
        setFilteredPeople(people)

      }
    }
    getAsyncPeople()
  }, [])


  async function addPerson(p) {
    const existingName = people
      .find(person => person.name === p.name)

    if (existingName !== undefined && existingName.name)
      alert(`${p.name} is already added to phonebook`)
    else {
      const newPersonAdd = {
        id: people.length + 1,
        name: p.name,
        number: p.number
      }
      const person = await peopleService.create(newPersonAdd)
      if (person.error) {
        console.log(person.error.message)
      } else {
        setPeople([person, ...people])
        setFilteredPeople([person, ...filteredPeople])
      }

    }
  }

  function handleFilter(search) {
    const filteredTmpPeople = people
      .filter(p => p.name.toUpperCase().includes(search.toUpperCase()))
    if (search.length === 0)
      setFilteredPeople(people)
    else
      setFilteredPeople(filteredTmpPeople)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PeopleForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <People people={filteredPeople} />
    </div>
  );
}

export default App;

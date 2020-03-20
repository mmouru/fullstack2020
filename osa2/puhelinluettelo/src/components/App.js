import React, { useState } from 'react'

const Person = (props) => {
    return (
        <div>
            {props.persons.map((person, i) =>
        <p key={i}>
            {props.persons[i].name.toUpperCase().includes(props.filter.toUpperCase()) === true &&
            <>{props.persons[i].name} {props.persons[i].number}</>}
        </p>
        )}
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
        <div>
          name: <input
         value={props.newName}
         onChange={props.handleNameChange}/>
        </div>
        <div>number: <input
        value={props.newNumber}
        onChange={props.handleNumberChange}>
        </input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Filter = (props) => {
    return (
        <div>
          filter shown with<input onChange={props.handleFilter}></input>
        </div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setNewFilter] = useState('')

  const addPerson = (event) => {
      event.preventDefault()
      if(persons.some(person => person.name === newName)){
          alert(`${newName} is already added to phonebook`)
      } else{
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
      setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person filter={filter} persons={persons}/>
    </div>
  )

}

export default App
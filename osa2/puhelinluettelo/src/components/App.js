import React, { useState, useEffect } from 'react'
import noteService from '../services/persons'
import '../index.css'

const Person = (props) => {
    return (
        <div>
            {props.persons.map((person, i) =>
        <div key={i}>
            {props.persons[i].name.toUpperCase().includes(props.filter.toUpperCase()) === true &&
            <div>{props.persons[i].name} {props.persons[i].number}
            <button onClick={() => {
              if(window.confirm(`Delete ${person.name}`)) {
                props.delete(person.id)}
              }
              }>delete</button></div>}
        </div>
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

const Notification = (props) => {
  if(props.message === null) {
    return (
      null
    )
  }
  else if(props.message.includes("has already been removed from server") || props.message.includes("Person validation failed")){
    return (
      <div className="error">
        {props.message}
      </div>
    )
  }
  else {
    return (
      <div className="style">
        {props.message}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setNewFilter] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
      noteService.getAll().then(person => {
        setPersons(person)
      })
  }, [])


  const addPerson = (event) => {
      event.preventDefault()
      const newPerson = { name: newName, number: newNumber }
      if(persons.some(person => person.name === newName)){
        const id = persons.find(person => person.name === newName).id
        const name = persons.find(person => person.id === id).name
          if(window.confirm(`${newName} is already added to phonebook,
          replace the old number with a new one?`)){
            noteService.update(id, newPerson).then(updatedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
              setMessage(`Updated ${name}`)
              setTimeout(() => setMessage(null), 3000)
            }).catch(error => {
              setMessage(
                `Information of ${name} has already been removed from server`
              ) 
              setTimeout(() => {
                setMessage(null)
              }, 3000)
              setPersons(persons.filter(person => person.id !== id))
            })
          }
      } else{
      noteService.create(newPerson).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(error => {
        setNewName('')
        setNewNumber('')
        setMessage(error.response.data.error)
        setTimeout(() => setMessage(null), 3000)
      })
    }
  }

  const deletePerson = id => {
    noteService.remove(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
      const name = persons.find(person => person.id === id).name
      setMessage(`deleted user ${name}`)
      setTimeout(() => setMessage(null), 3000)
    })
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
      <Notification message={message}/>
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
      <Person filter={filter} persons={persons} delete={deletePerson}/>
    </div>
  )

}

export default App
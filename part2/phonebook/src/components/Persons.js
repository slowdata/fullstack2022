const Persons = ({ persons, deletePerson }) => {
    function handleDelete(person) {
        if (confirm(`Delete ${person.name}?`)) {
            deletePerson(person)
        }
    }

    return (
        <ul style={{ padding: 0 }}>
            {
                persons.map(person =>
                (<li key={person.name} style={{
                    padding: '1px 0px',
                    'display': 'flex', 'alignItems': 'center'
                }}>
                    {person.name} {person.number}

                    <button
                        style={{
                            'backgroundColor': 'lightgray', 'marginLeft': 4,
                            padding: '4px 4px', borderRadius: '100%', border: '1px solid gray',
                        }}
                        onClick={() => handleDelete(person)}
                    >✖️</button>
                </li>
                ))
            }
        </ul >
    )
}

export default Persons
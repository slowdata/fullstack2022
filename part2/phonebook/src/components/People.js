const People = ({ people }) => {
    function handleDelete(id) {
        console.log(id);
    }

    return (
        <ul>
            {
                people.map(person =>
                (<div key={person.name} style={{ 'display': 'flex', 'alignItems': 'center' }}>
                    <li >{person.name} {person.number}</li>
                    <button
                        style={{ 'backgroundColor': 'lightblue', 'marginLeft': 4 }}
                        onClick={() => handleDelete(person.id)}
                    >
                        delete</button>
                </div>)
                )
            }
        </ul>
    )
}

export default People
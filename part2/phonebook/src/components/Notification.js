const noficationStyles = {
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: 'lightGray',
    fontSize: 18,
    fontWeight: 'bold'
}

const noficationStylesInfo = {
    ...noficationStyles,
    border: '2px solid green',
    color: 'green',
}

const noficationStylesError = {
    ...noficationStyles,
    border: '2px solid red',
    color: 'red',
}

const Notification = ({ type, message }) => {
    return message && (
        <div style={type === 'error' ? noficationStylesError :
            noficationStylesInfo} >
            {message}
        </div>
    )
}

export default Notification
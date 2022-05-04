const Notification = ({notification}) => {
  const styles = {
    color: notification.color,
    padding: 10, 
    background: 'lightgrey',
    border: `3px solid ${notification.color}`,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: '1.4em'
  }
  return (
    <div style={styles}>
        {notification.message}
    </div>
  )
}
 
export default Notification
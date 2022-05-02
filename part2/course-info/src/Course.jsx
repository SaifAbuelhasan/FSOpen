const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      {
        props.parts.map((part) => {
          return (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          )
        })
      }
    </>
  )
}

const Total = (props) => {
  const total = props.parts.map(element => element.exercises).reduce((prev,curr) => {
    return prev + curr
  }, 0)
  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <li>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </li>
  )
}
 
export default Course
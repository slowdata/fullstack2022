const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ part, exercises }) => (
  <p>{part} {exercises}</p>
)

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part,i) =>
        <Part key={i} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ total }) => (
  <p>Number of exercises {total}</p>
)


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((acc, next) => acc + next.exercises, 0)} />
    </div>
  );
}

export default App;

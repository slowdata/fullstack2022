const Part = ({ part, exercises }) => (
    <p>{part} {exercises}</p>
)

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part, i) =>
                <Part key={i} part={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

export default Content
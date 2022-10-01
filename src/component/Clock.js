const Clock = (props)=>{
    return (
        <div>
            <p>It is {props.date.toLocaleTimeString()}</p>
        </div>
    )
}

export default Clock
import { useState } from "react"


const Clock = ()=>{
    const [ date, setCounter ] = useState(Date().toLocaleString())

    setTimeout(
        () => setCounter(Date().toLocaleString()),
        1000
      )

    return (
        <div>
            <p>It is {date}</p>
        </div>
    )
}

export default Clock
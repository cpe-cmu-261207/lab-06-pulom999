import { useHistory } from "react-router"
import { useState } from "react"

const Dateselect = () => {
    const [start, setStart] = useState<string>("")
    const [end, setEnd] = useState<string>("")
    let history = useHistory()
   
    function GetRecord() {
        const StartDate = start.split("-").map(x => parseInt(x))
        const EndDate = end.split("-").map(x => parseInt(x))
        if (start === "" || end === "" || StartDate[0] > EndDate[0] || StartDate[1] > EndDate[1] || (StartDate[2] > EndDate[2] && StartDate[1] === EndDate[1])) {
            alert('Please select start date and end date correctly')
        }
        else {
            history.push(`/history/result?start=${start}&end=${end}`)
        }
    }

    return (
        <div className='text-center space-y-3 space-x-3'>
            <p className='text-2xl font-semibold'>Select historical range</p>
                    <span>From date</span>
                    <input type='date' onChange={e => setStart(e.target.value)}></input>
                    <span>To date</span>
                    <input type='date' onChange={e => setEnd(e.target.value)}></input>
                    <br />
                    <button type='button' onClick={GetRecord}>Get data</button>
        </div>
    )
}

export default Dateselect
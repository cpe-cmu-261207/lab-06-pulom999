import axios from "axios"
import { useLocation } from "react-router"
import { useState, useEffect } from "react"


type BitcoinType = {
    bpi: Record<string, number>,
    disclaimer: string,
    time: {
        updated: string,
        updatedISO: string,
    },
}
const Records = () => {
    let query = new URLSearchParams(useLocation().search)
    let start = query.get('start')
    let end = query.get('end')
    const [task, setTask] = useState<BitcoinType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const fetchApi = async () => {
        try {
            const resp = await axios.get<BitcoinType>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${start}&end=${end}`)
            setTask(resp.data)
            setLoading(false)
        }
        catch {
            setLoading(false)
            setError(true)
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])
    const render = () => {
        if (loading) {
            return (
                <p className='text-2xl'>Loading ...</p>
            )
        }
        else if (error) {
            return (
                <p className='text-xl text-red-500'>There was an error. Please try again later.</p>
            )
        }
        else {
            let RecordsPrice: [string, number][] = []
            if (task?.bpi) {
                RecordsPrice = Object.entries(task.bpi)
            }
            return (
                <div className='space-y-3'>
                    <p className='text-xl font-semibold'> ( From {start} To {end} )</p>
                    <ul>
                        {
                            RecordsPrice.map(data => <li className='text-xl' key={data[0]}>{data[0]} - {(data[1]).toLocaleString()} THB</li>)
                        }
                    </ul>
                </div>
            )
        }
    }
    return (
        <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Historical price</p>
            {render()}
        </div>
    )
}
export default Records
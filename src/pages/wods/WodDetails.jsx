import { useEffect, useState } from "react"
import {useParams, useNavigate} from "react-router-dom"

import {getWodDetailsService} from "../../services/wod.services"



function WodDetails() {
    const navigate = useNavigate()

    const {wodId} = useParams()

    const [allWodDetails, setAllWodDetails] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    useEffect (()=> {
        getWodDetails()
    },[])

    const getWodDetails = async () => {
        try{
            const response = await getWodDetailsService(wodId)
            //console.log(response.data)
            setAllWodDetails(response.data)
            setIsFetching(false)
        }catch (error) {
            navigate("/error")
        }

        
    }

    if (isFetching === true) {
        return <h3>Loading wod details</h3>
      }

console.log(allWodDetails)



  return (

    <div><h1>Detalles </h1></div>
  )
}

export default WodDetails
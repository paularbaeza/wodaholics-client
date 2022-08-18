import { useEffect, useState } from "react"
import {useParams, Link, useNavigate} from "react-router-dom"


import {getWodsListService} from "../../services/wod.services"

function WodsList() {
    const navigate = useNavigate()


    const {type} = useParams()

    const [allWods, setAllWods] =useState([])
    const [ isFetching, setIsFetching ] = useState(true)

    useEffect (()=> {
        getWods()
    },[type])

    const getWods = async () => {
        try{
            const response = await getWodsListService(type)
            //console.log(response.data)
            setAllWods(response.data)
            setIsFetching(false)
        }catch (error) {
            navigate("/error")

        }
    }

    if (isFetching === true) {
        return <h3>Loading List of wods</h3>
      }
//console.log(allWods)
  return (
    <div>
    <h1>{type.toUpperCase()}</h1>
    {allWods.map((eachWod)=> {
        return <p key={eachWod._id}>
          <Link to={`/${eachWod._id}/details`}>{eachWod.name}</Link>
        </p>
    })}
    </div>
  )
}

export default WodsList
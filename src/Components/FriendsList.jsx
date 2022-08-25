import { Link } from "react-router-dom";

function FriendsList(props) {

    const{friends} = props

  return (
    <div className="user-lists">
    {friends.map((eachFriend) => {
                return <div className="each-benchmark" key={eachFriend._id}><Link to={`profile/${eachFriend._id}`} className="no-decoration-link">
                <img src={eachFriend.img} width="80px" alt="" /></Link>
                <h3 className="dirt-font-links">{eachFriend.username}</h3>

                
                </div>
            })}</div>
  )
}

export default FriendsList
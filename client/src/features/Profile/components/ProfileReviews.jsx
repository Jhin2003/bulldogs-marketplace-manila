
import useUserReviews from "../hooks/useUserReviews";
import { useUser } from "../../../context/UserContext";

const ProfileReviews =  () => {
  const { user } = useUser()
 
    const {reviews, loading, error} =  useUserReviews(user.id)
 

}




export default ProfileReviews
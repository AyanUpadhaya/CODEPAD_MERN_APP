import { useParams } from "react-router-dom"
import NoData from "../../components/shared/NoData"

const PostDetails = () => {
  const params = useParams();
  console.log(params.id)
  return (
    <div>
      <NoData></NoData>
    </div>
  )
}

export default PostDetails
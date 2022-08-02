import { useParams } from "react-router-dom";
import SingleComic from "../singleComic/SingleComic";

const ComicDetailsPage = () => {
    const { id } = useParams();
    return (
        <SingleComic id={id} />
    )
}

export default ComicDetailsPage;
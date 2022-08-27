import { Link } from "react-router-dom"
import Error from "../ui/error/Error"

const NoMatchPage = () => {
    const pStyle = {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "18px"
    }

    const linkStyle = {
        display: "block",
        ...pStyle,
        fontSize: "24px"
    }

    return (
        <div>
            <Error/>
            <p style={pStyle}>Page doesn't exist</p>
            <Link style={linkStyle} to="/">Back to main page</Link>
        </div>
    )
}

export default NoMatchPage;
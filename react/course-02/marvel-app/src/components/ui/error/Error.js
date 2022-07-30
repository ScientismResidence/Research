import errorImage from "./error.gif";

const Error = () => {
    const style = {
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto"
    }
    
    return (
        <img src={errorImage} style={style} alt="Error"/>
    );
}

export default Error;
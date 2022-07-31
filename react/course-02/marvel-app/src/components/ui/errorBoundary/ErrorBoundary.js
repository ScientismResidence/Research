import { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        isError: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);

        this.setState({ isError: true });
    }

    render() {
        if (this.state.isError) {
            return <p>Something went wrong.</p>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
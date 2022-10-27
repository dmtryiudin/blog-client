import NotFound from "../pages/NotFound";
import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) { return <NotFound /> }
        return this.props.children;
    }
}

export default ErrorBoundary


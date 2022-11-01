import NotFound from "../pages/NotFound";
import React from "react";

interface ErrorBoundaryProps {
    children?: React.ReactChild | React.ReactNode
}

interface ErrorBoundaryState {
    hasError:boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false };

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) { return <NotFound /> }
        return this.props.children;
    }
}

export default ErrorBoundary


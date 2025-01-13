import React, { ReactNode } from "react"

interface ErrorBoundaryState {
  hasError: boolean
  message?: string
  status?: number
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: React.ComponentType<{ errorMessage: string; errorStatus: number }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, message: error?.message, status: error?.status }
  }

  render() {
    function addExtraProps(
      Component: React.ComponentType<any>,
      extraProps: object,
    ) {
      return <Component {...extraProps} />
    }

    if (this.state.hasError) {
      return addExtraProps(this.props.fallback, {
        errorMessage: this.state.message ?? "Unknown error",
        errorStatus: this.state.status ?? 500,
      })
    }

    return this.props.children
  }
}

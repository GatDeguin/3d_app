import React, { Component, ReactNode } from 'react';

interface State { hasError: boolean }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { console.error(error); }

  render() {
    if (this.state.hasError){
      return <div className="error">Ha ocurrido un error en la escena 3D.</div>;
    }
    return this.props.children;
  }
}

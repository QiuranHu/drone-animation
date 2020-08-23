import React from 'react';
import './App.scss';
import { DroneAnimation } from './components/DroneAnimation';
import { Header } from './components/Header';
class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <DroneAnimation />
      </>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import { DroneAnimation } from './components/DroneAnimation';
import { Header } from './components/Header';
class App extends React.Component {
  componentDidMount() {

  }
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

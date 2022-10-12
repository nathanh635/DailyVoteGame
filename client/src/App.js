import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
    <div className="flex-column justify-flex-start min-100-vh">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
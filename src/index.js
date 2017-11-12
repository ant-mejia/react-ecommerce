import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './style/main.css';

import io from 'socket.io-client';
import createHistory from 'history/createBrowserHistory';

class App extends Component {
  history = createHistory();
  constructor(props) {
    super(props);
    this.state = {
      activeHeader: false
    };
    this.history.listen(this.listenHistory);
    this.socket = io('http://localhost:3030');
    this.socket.on('connect', () => {
      this.socket.emit('message', { data: 'socket connected!' });
      this.socket.emit('session/view', { path: this.history.location.pathname, type: 'test' })
    })
  }
  componentDidMount() {}

  listenHistory = () => {
    console.log('oh yeah!');
    this.socket.emit('session/view', { path: this.history.location.pathname, type: 'test' })
    this.setState({
      activeHeader: false
    });
  }

  toggleHeader = () => {
    this.setState({ activeHeader: !this.state.activeHeader })
  }

  actions = {
    toggleHeader: this.toggleHeader
  }

  render() {
    return (
      <Routes actions={this.actions} activeHeader={this.state.activeHeader} history={this.history}/>
    );
  }

}

export default App;

ReactDOM.render(<App/>, document.getElementById('root'));

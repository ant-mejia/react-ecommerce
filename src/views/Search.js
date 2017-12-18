import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    };
  }
  componentDidMount() {
    this.props.socket.on('search/results', (result) => {
      this.setState({ results: result });
    })
  }

  handleClick = () => {
    this.props.socket.emit('search', { query: "Pink" })
  }

  handleChange = () => {
    this.setState({ query: this.refs.search.value })
    this.props.socket.emit('search', { query: this.refs.search.value })
  }

  render() {
    return (
      <div className="c-page">
        <h2>Search Page</h2>
        <input ref="search" type="text" placeholder="search here" onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Search!</button>
      </div>
    );
  }

}

export default Search;
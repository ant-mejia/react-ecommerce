import React, { Component } from 'react';
import SearchGallery from '../components/search/SearchGallery';
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
    if (this.refs.search.value.length > 0) {
      this.props.socket.emit('search', { query: this.refs.search.value })
    }
    this.setState({results: []})

  }

  render() {
    return (
      <div className="c-page">
        <h2>Search Page</h2>
        <input ref="search" type="text" placeholder="search here" onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Search!</button>
        <SearchGallery results={this.state.results}/>
      </div>
    );
  }

}

export default Search;

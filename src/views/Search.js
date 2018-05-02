import React, { Component } from 'react';
import View from '../containers/View';
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

  handleClick = (e) => {
    if (e) e.preventDefault();
    this.props.socket.emit('search', { query: "Pink" })
  }

  handleClear = () => {
    this.refs.search.value = '';
    this.setState({ query: '' });
    this.setState({ results: [] });
  }

  handleChange = () => {
    this.setState({ query: this.refs.search.value })
    if (this.refs.search.value.length > 0) {
      this.props.socket.emit('search', { query: this.refs.search.value })
    } else {
      this.handleClear()
    }
    // this.setState({ results: [] })
  }

  inputEmpty = () => {
    let searchRef = this.refs.search || {};
    if (searchRef.value === undefined) {
      return true;
    } else if (searchRef.value.length === 0) {
      return true
    } else { return false; }
  }

  render() {
    return (
      <View classNames="p-search">
        <form onSubmit={e => this.handleClick(e)}>
          <div className={`p-search_input-wrapper ${this.inputEmpty() ? 'empty' : ''}`}>
            <input className="p-search_input" ref="search" type="text" placeholder="search" onChange={this.handleChange}/>
            <span className="p-search_input-icon" onClick={this.handleClear}><span className="li-cancel"></span></span>
          </div>
        </form>
        <SearchGallery inputEmpty={this.inputEmpty} results={this.state.results}/>
      </View>
    );
  }

}

export default Search;
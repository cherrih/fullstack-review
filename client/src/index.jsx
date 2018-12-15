import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    fetch('/repos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({term})
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(`${term} WAS SEARCHED`);
        console.log('Success: ', myJson)
        this.getRepos();
      })
      .catch(error => console.error('Error:', error));
  }

  getRepos() {
    fetch('/repos', {
      method: "GET"
    })
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      this.setState({repos:myJson})
      console.log(myJson)
    })
    .catch(error => console.error('Error:', error));
  }

  componentDidMount() {
    this.getRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
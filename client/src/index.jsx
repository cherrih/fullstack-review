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

  // When a user types a GitHub username into the text field, 
  // send a POST request to /repos 

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
        console.log(`${term} was searched`);
        console.log('Success: ', myJson)
      })
      .catch(error => console.error('Error:', error));
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
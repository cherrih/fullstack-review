import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      {props.repos.map(repo => {
        return <Repo repo={repo}/>
      })}
    </table>
  </div>
)

export default RepoList;

/* <tr>
        <th>Username</th>
        <th>Repo Name</th> 
        <th>Stargazers' Count</th>
        <th>Link</th>
      </tr> */
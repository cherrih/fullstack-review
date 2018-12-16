import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <table id="table">
      <thead>
        <tr>
          <th>Stargazers</th>
          <th>Username</th>
          <th>Repo Name</th>
          
        </tr>
      </thead>
      <tbody>
        {props.repos.map(repo => {
          return <Repo repo={repo} key={repo._id}/>
        })}
      </tbody>
    </table>
  </div>
)

export default RepoList;
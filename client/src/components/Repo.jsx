import React from 'react';

const Repo = props => {
  return (
    <tr>
      <td>{props.repo.stargazers_count}</td>
      <td><a href={props.repo.html_url}>{props.repo.repo_name}</a></td> 
      <td>{props.repo.username}</td>
    </tr>
  )
}

export default Repo;
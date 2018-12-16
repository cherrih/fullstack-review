import React from 'react';

const Repo = props => {
  return (
    <tr>
      <td>{props.repo.stargazers_count}</td>
      <td><a href={props.repo.user_url}>{props.repo.username}</a></td>
      <td><a href={props.repo.html_url}>{props.repo.repo_name}</a></td> 
    </tr>
  )
}

export default Repo;
import { useQuery } from '@apollo/client';
import { GET_USER } from '../GraphQL/userQueries';

export default function UserTable({ userData }) {
  const {
    data: userData,
    loading,
    error,
  } = useQuery(GET_USER, {
    variables: { id: '6458a2f6a0687fa0545ee643' },
  });

  const userAttributes = Object.keys(userData);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  console.log(userData);

  return (
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {userAttributes.map((attr) => (
          <tr key={attr}>
            <td>{attr}</td>
            <td>{userData[attr]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

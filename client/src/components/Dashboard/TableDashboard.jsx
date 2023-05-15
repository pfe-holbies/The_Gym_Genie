import { Container, Row, Table, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../GraphQL/userQueries';
import { useContext } from 'react';
import { AuthContext } from '../../utils/authContext';
import { Link } from 'react-router-dom';

export default function TableDashboard() {
  const { user } = useContext(AuthContext);

  //Get user dat from the DB via getUser() query
  const {
    data: userData,
    loading,
    error,
  } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const userFields = [
    { label: 'Username', value: userData.getUser.username },
    { label: 'Email', value: userData.getUser.email },
    { label: 'Age', value: userData.getUser.age },
    { label: 'Gender', value: userData.getUser.gender },
    { label: 'Height', value: userData.getUser.height },
    { label: 'Weight', value: userData.getUser.weight },
    { label: 'Primary Goal', value: userData.getUser.primaryGoal },
    { label: 'Activity Level', value: userData.getUser.activityLevel },
    { label: 'Strength Level', value: userData.getUser.strengthLevel },
    { label: 'Workout Type', value: userData.getUser.workoutType },
    { label: 'Workouts per Week', value: userData.getUser.workoutsPerWeek },
    { label: 'Diet Type', value: userData.getUser.dietType },
    { label: 'Food Allergies', value: userData.getUser.foodAllergies },
  ];

  return (
    <div>
      <Container fluid className="layout-container layout-img ">
        <div className="layout-row">
          <Row className="layout-table text-center  ">
            <h2>
              <span className="text-highlight">{user.username}</span> please
              confirm your info
            </h2>
            <Table className="layout-table">
              <tbody>
                {userFields.map((field) => (
                  <tr key={field.label}>
                    <td>{field.label}</td>
                    <td>{field.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link to="/plan">
              <Button className="btn-dashboard">confirm</Button>
            </Link>
          </Row>
        </div>
      </Container>
    </div>
  );
}

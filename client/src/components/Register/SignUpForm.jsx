import { Form, Row, Col, Button, } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { REGISTER_USER } from '../../GraphQL/userMutations';
import { cloneDeep } from '@apollo/client/utilities';


export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [primaryGoal, setGoal] = useState('');
  const [activityLevel, setActivity] = useState('');
  const [strengthLevel, setStrength] = useState('');
  const [workoutType, setWorkout] = useState('');
  const [workoutsPerWeek, setWorkoutNum] = useState('');
  const [dietType, setDiet] = useState('');
  const [foodAllergies, setAllergies] = useState('');

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      age,
      gender,
      height,
      weight,
      primaryGoal,
      activityLevel,
      strengthLevel,
      workoutType,
      workoutsPerWeek,
      dietType,
      foodAllergies,
    };

    console.log('User Data:', userData);
    registerMutation({ variables: userData });
    console.log(
      `register mutation completed ${userData.username} is registered!`
    );
    alert(`${userData.username} is registered!`);

    setUsername('');
    setEmail('');
    setPassword('');
    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setGoal('');
    setActivity('');
    setStrength('');
    setWorkout('');
    setWorkoutNum('');
    setDiet('');
    setAllergies('');
  };

  let navigate = useNavigate();
  const [registerMutation] = useMutation(REGISTER_USER, {
    onCompleted({ register }) {
      // Create a copy of the cache object
      const cacheCopy = cloneDeep(cache);

      // Modify the copy of the cache object to include the token
      cacheCopy.writeData({
        data: {
          isLoggedIn: true,
          token: register.token,
        },
      });

      // Replace the original cache object with the modified copy
      client.cache.restore(cacheCopy);

      // set token to Local storage also
      localStorage.setItem('token', register.token);
      // Navigate to the login page
      navigate('/login');
      navigate('/login');
      console.log();
    },
  });

  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className="form">
      <div className="form-container">
        <div className="form-header">
          <h2>Register Here</h2>
        </div>
        <div className="form-body"></div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password..."
                  onChange={(e) => setPassword(e.target.value)}
                />
                
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter valid email..."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr className="form-divider" />
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Age"
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  className="custom-select"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Height in cm"
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Weight in kgs"
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr className="form-divider" />
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Primary Goal</Form.Label>
                <Form.Select
                  className="custom-select"
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Lose Weight">Lose Weight</option>
                  <option value="Gain Muscle">Gain Muscle</option>
                  <option value="Gain Weigh">Gain Weight</option>
                  <option value="Maintain Weight">Maintain Weight</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Activity Level</Form.Label>
                <Form.Select
                  className="custom-select"
                  onChange={(e) => setActivity(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Lightly Active">Lightly Active</option>
                  <option value="Moderately Active">Moderately Active</option>
                  <option value="Very Active">Very Active</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Strength Level</Form.Label>
                <Form.Select
                  className="custom-select"
                  onChange={(e) => setStrength(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Workout Type</Form.Label>
                <Form.Select
                  className="custom-select"
                  onChange={(e) => setWorkout(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Flexibility">Flexibility</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Workouts</Form.Label>
                <Form.Select
                  type="number"
                  className="custom-select"
                  onChange={(e) => setWorkoutNum(parseInt(e.target.value))}
                >
                  <option value=""></option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Diet Type </Form.Label>
                <Form.Select
                  className="custom-select"
                  onChange={(e) => setDiet(e.target.value)}
                >
                  <option value=""></option>
                  <option value="No restriction">No restriction</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Pescatarian">Pescatarian</option>
                  <option value="Keto">Keto</option>
                  <option value="Paleo">Paleo</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Food Allergies</Form.Label>
                <Form.Select
                  className="custom-select"
                  onChange={(e) => setAllergies(e.target.value)}
                >
                  <option value=""></option>
                  <option value="No allergies">No allergies</option>
                  <option value="gluten">Gluten</option>
                  <option value="dairy">Dairy</option>
                  <option value="nuts">Nuts</option>
                  <option value="eggs">Eggs</option>
                  <option value="soy">Soy</option>
                  <option value="fish">Fish</option>
                  <option value="shellfish">Shellfish</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <hr className="form-divider" />
              <p className='push-item'>
                Already have an account?{' '}
                <Link to="/login" className="login-here">
                  Log in here
                </Link>
              </p>
          <hr className="form-divider" />
          <Button className="submit-btn" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../utils/authContext';
import { REGISTER_USER } from '../../GraphQL/userMutations';

export default function SignUpForm() {
  const context = useContext(AuthContext);
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
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

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Trigger backend registerMutation() function
  const [registerMutation, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerMutation: userData } }) {
      context.login(userData);
      navigate('/login');
    },
    variables: {
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
    },
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      signupInput: {
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
      },
    };

    registerMutation({ variables: userData });

    console.log('New User Data:', userData);

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

  return (
    <div className="form">
      <div className="form-container">
        <div className="form-header">
          <h2>Create your account</h2>
        </div>
        <div className="form-body"></div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email..."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="password-visibility-icon ml-auto"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
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
                  placeholder="cm..."
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="kgs..."
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
                  <option value="Gain Weight">Gain Weight</option>
                  <option value="Maintain Weight">Maintain Weight</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Row>
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
            </Row>
          </Row>
          <Row>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
          </Row>

          <Row>
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
          </Row>
          <hr className="form-divider" />
          <Row>
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
          </Row>
          <Row>
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
          </Row>

          <hr className="form-divider" />
          <p className="push-item">
            Have an account?{' '}
            <Link to="/login" className="login-here">
              Log in now
            </Link>
          </p>
          <hr className="form-divider" />
          <Button className="submit-btn" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

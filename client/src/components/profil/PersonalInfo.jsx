import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function PersonalInfo() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    primaryGoal: "",
    activityLevel: "",
    strengthLevel: "",
    workoutType: "",
    workoutsPerWeek: "",
    dietType: "",
    foodAllergies: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(userInfo);
    // Save the user's info to the database 
  };

  return (
    
    <Container className="update-personal-info-container">
     <h2 style={{ color: "#522A83", marginTop:"20%", marginBottom:"2%" }}>Personal Info</h2>
     <p> Update your personal details here.</p>   
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label style={{ color: "#522A83" }}>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label style={{ color: "#522A83" }}>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAge">
        <Form.Label style={{ color: "#522A83" }}>Age</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={userInfo.age}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGender">
        <Form.Label style={{ color: "#522A83" }}>Gender</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          value={userInfo.gender}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        >
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formHeight">
        <Form.Label style={{ color: "#522A83" }}>Height (cm)</Form.Label>
        <Form.Control
          type="number"
          name="height"
          value={userInfo.height}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWeight">
        <Form.Label style={{ color: "#522A83" }}>Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={userInfo.weight}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrimaryGoal">
        <Form.Label style={{ color: "#522A83" }}>Primary Goal</Form.Label>
        <Form.Control
          type="text"
          name="primaryGoal"
          value={userInfo.primaryGoal}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formActivityLevel">
        <Form.Label style={{ color: "#522A83" }}>Activity Level</Form.Label>
        <Form.Control
          type="text"
          name="activityLevel"
          value={userInfo.activityLevel}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStrengthLevel">
        <Form.Label style={{ color: "#522A83" }}>Strength Level</Form.Label>
        <Form.Control
          type="text"
          name="strengthLevel"
          value={userInfo.strengthLevel}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWorkoutType">
        <Form.Label style={{ color: "#522A83" }}>Workout Type</Form.Label>
        <Form.Control
          type="text"
          name="workoutType"
          value={userInfo.workoutType}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWorkoutsPerWeek">
        <Form.Label style={{ color: "#522A83" }}>Workouts Per Week</Form.Label>
        <Form.Control
          type="number"
          name="workoutsPerWeek"
          value={userInfo.workoutsPerWeek}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDietType">
        <Form.Label style={{ color: "#522A83" }}>Diet Type</Form.Label>
        <Form.Control
          type="text"
          name="dietType"
          value={userInfo.dietType}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFoodAllergies">
        <Form.Label style={{ color: "#522A83" }}>Food Allergies</Form.Label>
        <Form.Control
          type="text"
          name="foodAllergies"
          value={userInfo.foodAllergies}
          onChange={handleInputChange}
          style={{ borderColor: "#E4BD5B", borderWidth:"3px", width:"100%" }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ backgroundColor: "#522A83", color: "#E4BD5B", borderRadius:"20px" }}>
        Save
      </Button>{" "}
      <Button variant="secondary" style={{ backgroundColor: "#E4BD5B", color: "#522A83", borderRadius:"20px" }}>Cancel</Button>
    </Form>
    </Container>
  );
}

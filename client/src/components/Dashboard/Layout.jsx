import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaTh, FaDumbbell, FaUtensils, FaSignOutAlt } from 'react-icons/fa';

import Workouts from './Workouts';
import Meals from './Meals';

export default function Layout() {
  const [activeTab, setActiveTab] = useState('welcome');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Container fluid className="layout-container layout-img ">
        <div className="layout-row">
          <Row >
            <Col sm={3} className="layout-sidebar">
              <div className="layout-header">
                <h3>GymGenie</h3>
              </div>
              <Nav
                className="flex-column"
                activeKey={activeTab}
                onSelect={handleTabClick}
              >
                <Nav.Link eventKey="welcome" className='nav-link-dash'>
                  <FaTh />
                  Dashboard
                </Nav.Link>
                <Nav.Link eventKey="workouts" className='nav-link-dash'>
                  <FaDumbbell />
                  Workouts
                </Nav.Link>
                <Nav.Link eventKey="meals" className='nav-link-dash'>
                  <FaUtensils />
                  Meals
                </Nav.Link>
                <Nav.Link eventKey="logout" className='nav-link-dash'>
                  <FaSignOutAlt />
                  Logout
                </Nav.Link>
              </Nav>
            </Col>
            <Col sm={9} className="main-content">
              {activeTab === 'welcome' && (
                <div>
                  <h2> ABRACADABRA! </h2>
                  <p>
                    Oh great and powerful master, welcome! I am GymGenie, at
                    your service!
                  </p>
                  <p>
                    Just tell me what you desire, and I shall make it come true.
                    Whether it be six-pack abs, an attractive body, or big
                    muscles, I can make it happen! So speak your wishes, and
                    let's make AI magic together!
                  </p>
                </div>
              )}
              {activeTab === 'workouts' && (
                <div>
                  <h2>Workouts</h2>
                  <Workouts />
                </div>
              )}
              {activeTab === 'meals' && (
                <div>
                  <h2>Meals</h2>
                  <Meals />
                </div>
              )}
              {activeTab === 'logout' && (
                <div>
                  <h2>Logout</h2>
                  {/* LOG OUT */}
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

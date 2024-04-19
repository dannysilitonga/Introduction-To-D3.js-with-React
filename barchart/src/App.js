import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChartWrapper from './ChartWrapper';
import GenderDropdown from './GenderDropdown';

class App extends Component {
  state = {
    date: "march15"
  }

  dateSelected = (date) => this.setState({ date })

  render() {
    return (
      <div className="App">
        <Navbar bg="light">
          <Navbar.Brand>Sentiment Analysis: Top Trending Videos</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col xs={12}><GenderDropdown dateSelected={this.dateSelected} /></Col>
          </Row>
          <Row>
            <Col xs={12}><ChartWrapper date={this.state.date} /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

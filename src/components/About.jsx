import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  colStyle: {
    marginBottom: 25,
    border: '5px',
    borderColor: 'red',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container style={styles.colStyle}>
          {data
            ? (
              <Fade>
                <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                  <Col style={styles.colStyle}>
                    <h1>Introduction</h1>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.colStyle}>
                    <h1>Passion</h1>
                    {parseIntro(data.passion)}
                  </Col>
                  <Col style={styles.colStyle}>
                    <h1>Experience</h1>
                    {parseIntro(data.experience)}
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;

import React from "react";
import { Container, Row, Col, Text, Image } from "react-bootstrap";
import { Grid, Typography, Link as ButtonLink } from "@material-ui/core";

const Kid = () => {
  return (
    <Container>
      <Row>
        <Col>
          {/* Profile Image and Name */}
          <Image style={{width: "120px", height: "120px", borderRadius: "60px"}} src="img/kid-1.jpg"></Image>
          <Typography>Harold Smith</Typography>
          
          <Row>
            {/* Savings Balance */}
            <Col>
              <Typography>Checking:</Typography>
              <Typography>$ 2.32</Typography>
            </Col>
            
            {/* Checking Balance */}
            <Col>
              <Typography>Savings:</Typography>
              <Typography>$ 3.24</Typography>
            </Col>
          </Row>
          
        </Col>
        <Col>

        </Col>
      </Row>
    </Container>
  );
};

export default Kid;

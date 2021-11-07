import React from "react";
import { Container, Row, Col, Text, Image, ListGroup, Badge } from "react-bootstrap";
import { Grid, Typography, Link as ButtonLink } from "@material-ui/core";

import ShowChartIcon from '@mui/icons-material/ShowChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from '@mui/icons-material/Close';

import "./Task.css"

const Kid = () => {
  return (
    <Container className="Kid-Container">
      <Row>
        <Col className="align-items-center">
          {/* Profile Image and Name */}
          <Image style={{width: "120px", height: "120px", borderRadius: "60px"}} src="img/kid-1.jpg"></Image>
          <Typography>Harold Smith</Typography>
          
          {/* Balances Row */}
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

          {/* Stocks Row */}
          <Row>
            {/* Stocks */}
            <Col>
              <ShowChartIcon></ShowChartIcon>
              <Typography>Stocks</Typography>
            </Col>

            {/* Bonds */}
            <Col>
              <BusinessCenterIcon></BusinessCenterIcon>
              <Typography>Bonds</Typography>
            </Col>

            {/* Crypto */}
            <Col>
              <MonetizationOnIcon></MonetizationOnIcon>
              <Typography>Crypto</Typography>
            </Col>
          </Row>
          
        </Col>

        {/* Tasks List */}
        <Col className="align-items-center ">
          <ListGroup as="ol" numbered>
            <Task price={4.99} name={"Sweep Floor"} infoLine={"More Info"}></Task>
            <Task price={9.99} name={"Clean Room"} infoLine={"More Info"}></Task>
            <Task price={6.99} name={"Put Away Dishes"} infoLine={"More Info"}></Task>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

const Task = (props) => {
  return (
    <ListGroup.Item
      as="li"
      className="Chore-Item d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.name}</div>
        {props.infoLine}
      </div>
      <CloseIcon className="CloseIcon" style={{display: "none"}}></CloseIcon>
      <Badge bg="success" pill>
        ${props.price}
      </Badge>
    </ListGroup.Item>
  )
}

export default Kid;

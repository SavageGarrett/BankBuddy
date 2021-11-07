import React, {useState} from "react";
import { Container, Row, Col, Image, ListGroup, Badge } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../theme";

import "./Task.css";

const Kid = () => {
  let taskList = [];
  taskList.push({ price: 3.99, name: "Do Dishes", infoLine: "More Info" })
  taskList.push({ price: 6.99, name: "Clean Room", infoLine: "More Info" })
  taskList.push({ price: 8.99, name: "Vacuum", infoLine: "More Info" })
  console.log(taskList)

  return (
    <Container className="Kid-Container">
      <Row>
        <Col className="align-items-center">
          {/* Profile Image and Name */}
          <Image
            style={{ width: "120px", height: "120px", borderRadius: "60px" }}
            src="img/kid-1.jpg"
          ></Image>
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
            {taskList.map(({price, name, infoLine}) => {
              return <Task key={name} price={price} name={name} infoLine={infoLine}></Task>
            })}
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
      <CloseIcon className="CloseIcon" style={{ display: "none" }}></CloseIcon>
      <Badge bg="danger" pill style={{ color: theme.palette.primary }}>
        ${props.price}
      </Badge>
    </ListGroup.Item>
  );
};

export default Kid;

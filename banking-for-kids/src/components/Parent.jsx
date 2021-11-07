import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import {
  Typography,
  Button,
  Grid,
  Card,
  TextField,
  Box,
} from "@material-ui/core";
import "./Task.css";
import theme from "../theme";
import CloseIcon from "@mui/icons-material/Close";

const Parent = () => {
  //   const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(0);
  //   const [taskInfo, setTaskInfo] = useState(0);

  let tasks = [];

  const addTask = () => {
    console.log(description);
    tasks.push({ description: description, number: number });
    setDescription("");
    setNumber("");
    console.log(tasks);
  };
  return (
    <Container>
      <Card style={{ backgroundColor: theme.palette.primary, padding: 40 }}>
        <Row>
          <Typography variant="body1">Task Portal</Typography>
          <Typography variant="h1">
            Post a task for you child to do! Add a description and the amount of
            points it's worth and you're all set!
          </Typography>
        </Row>
        <Row>
          <TextField
            label="Description"
            // value={description}
            onChangeText={(e) => setDescription(e.target.value)}
          />
          <Col>
            <TextField
              label="Point Value"
              //   value={number}
              onChangeText={(e) => setNumber(e.target.value)}
            />
          </Col>
        </Row>
        <Box mt={5}>
          <Button style={{ textTransform: "none" }} onClick={addTask}>
            Post Task
          </Button>
        </Box>
      </Card>
      {/* Tasks List */}
      <Col className="align-items-center ">
        <ListGroup as="ol" numbered>
          <Task name={"Sweep Floor"} infoLine={"More Info"}></Task>
          <Task name={"Clean Room"} infoLine={"More Info"}></Task>
          <Task
            price={6.99}
            name={"Put Away Dishes"}
            infoLine={"More Info"}
          ></Task>
        </ListGroup>
      </Col>
    </Container>
  );
};

const Task = (props) => {
  return (
    <ListGroup.Item
      style={{ hover: "none" }}
      as="li"
      className="Chore-Item d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.name}</div>
        {props.infoLine}
      </div>
      <CloseIcon className="CloseIcon" style={{ display: "none" }}></CloseIcon>
      <Button>Pay</Button>
    </ListGroup.Item>
  );
};
export default Parent;

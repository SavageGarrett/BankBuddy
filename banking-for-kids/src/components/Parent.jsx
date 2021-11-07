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
  const [number, setNumber] = useState("$");
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useState([]);

  let tasks = [];

  const addTask = () => {
    console.log(description);
    //post task
    tasks.push({
      title: title,
      description: description,
      price: number,
      completed: false,
    });
    setDescription("");
    setTitle("");
    setNumber("$");

    console.log(tasks);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
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
            label="Title"
            value={title.toString()}
            onChange={handleTitle}
          />
          <TextField
            label="Description"
            value={description.toString()}
            onChange={handleDescription}
          />
          <Col>
            <TextField
              label="Cost (dollars)"
              value={number.toString()}
              onChange={handleNumber}
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

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

const Parent = (props) => {
  //   const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useState([]);

  let tasks = [];

  const addTask = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      task_name: title,
      cur_value: number,
      complete: false,
      more_info: description,
    });

    var config = {
      method: "put",
      url: "https://1u6xfou096.execute-api.us-east-1.amazonaws.com/default/gettersetter_tasks",
      headers: {
        "x-api-key": "r1rC7mLDKb1Bxc5neUsNt7JtxbSYF9ti3yYUMjkE",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    tasks.push({
      title: title,
      description: description,
      price: number,
      completed: false,
    });
    setDescription("");
    setTitle("");
    setNumber(0);
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

          {/* Loop Through Task State Value */}
          {props.tasks.map(({price, name, infoLine, id, completed}) => {
            return <Task key={id} name={name} price={price} infoLine={infoLine}></Task>
          })}

          {/* Add Task */}
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
          <Button
            disabled={true}
            style={{ textTransform: "none" }}
            onClick={addTask}
          >
            Post Task
          </Button>
        </Box>
      </Card>
      {/* Tasks List */}
      <Col className="align-items-center ">
        <ListGroup as="ol" numbered>
          
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

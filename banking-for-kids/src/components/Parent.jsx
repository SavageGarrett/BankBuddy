import React, { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import {
  Typography,
  Button,
  Card,
  TextField,
  Box,
} from "@material-ui/core";
import "./Task.css";
import theme from "../theme";
import CloseIcon from "@mui/icons-material/Close";
var axios = require("axios");

const Parent = (props) => {
  //   const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState("");

  const addTask = () => {
    var data = JSON.stringify({
      task_name: title,
      cur_value: number,
      complete: false,
      more_info: description,
    });

    var config = {
      method: "PUT",
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

    props.tasks.push({
      name: title,
      infoLine: description,
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
        {/* Headline Text */}
        <Row>
          <Typography variant="body1">Task Portal</Typography>
          <Typography variant="h1">
            Post a task for you child to do! Add a description and the amount of
            points it's worth and you're all set!
          </Typography>
        </Row>

        {/* Task Row */}
        <Row style={{marginTop: "40px"}}>
          {/* Loop Through Task State Value */}
          {props.tasks.map(({price, name, infoLine, id, completed}) => {
            return <Task key={id} name={name} price={price} infoLine={infoLine}></Task>
          })}

          {/* Add Task */}
          <TextField
            label="Title"
            value={title.toString()}
            onChange={handleTitle}
            style={{marginTop: "20px"}}
          />
          <TextField
            label="Description"
            value={description.toString()}
            onChange={handleDescription}
            style={{marginTop: "20px"}}
          />
          <Col>
            <TextField
              label="Cost (dollars)"
              value={number.toString()}
              onChange={handleNumber}
              style={{marginTop: "20px"}}
            />
          </Col>
        </Row>

        {/* Submit Task */}
        <Box mt={5}>
          <Button
            disabled={false}
            style={{ textTransform: "none" }}
            onClick={addTask}
          >
            Post Task
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

/* Parent Task Component */
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

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, ListGroup, Badge } from "react-bootstrap";
import { Typography, Card, IconButton } from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import SimpleModal from "../components/ParentComponents/SimpleModal";
import theme from "../theme";
import "./Task.css";
var axios = require("axios");

const Kid = (props) => {
  const [kidInfo, setKidInfo] = useState([]);
  const [showStocksPage, setShowStocksPage] = useState(false);
  let taskList = [];
  taskList.push({ price: 3.99, name: "Do Dishes", infoLine: "More Info" });
  taskList.push({ price: 6.99, name: "Clean Room", infoLine: "More Info" });
  taskList.push({ price: 8.99, name: "Vacuum", infoLine: "More Info" });

  useEffect(() => {
    var data = JSON.stringify({
      user_id: 2,
    });
    var config = {
      method: "GET",
      url: "https://c7j9xga7y9.execute-api.us-east-1.amazonaws.com/default/gettersetter",
      headers: {
        "x-api-key": "hkW0Vha0KA8GH60qfJmv88h8EAJx8VNp5Fgpem2G",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setKidInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container style={{ paddingTop: 50, flexDirection: "column" }}>
      <Card style={{ margin: 50 }}>
        {/* Profile Image and Name */}
        <Image
          style={{ width: "120px", height: "120px", borderRadius: "60px" }}
          src="img/kid-1.jpg"
        ></Image>
        {/* TODO: Fix Undefined Display if We Get to It */}
        {!!kidInfo ? (
          <Typography variant="body1">{`${kidInfo[1]} ${kidInfo[5]}`}</Typography>
        ) : (
          <></>
        )}

        {/* Stocks */}
        {/* <IconButton
          onClick={() => setShowStocksPage(true)}
          style={{ width: 100, color: "red" }}
        >
          <Col>
            <ShowChartIcon></ShowChartIcon>
            <Typography style={{ textDecorator: "underline" }}>
              Stocks
            </Typography>
          </Col>
        </IconButton> */}

        {/* Transfer */}
        <IconButton
          onClick={() => setShowStocksPage(true)}
          style={{ width: 280, color: "red" }}
        >
          <Col>
            <AttachMoneyIcon />
            <Typography style={{ textDecorator: "underline" }}>
              Transfer Money
            </Typography>
          </Col>
        </IconButton>
        {showStocksPage && (
          <SimpleModal
            handleClose={() => setShowStocksPage(false)}
            handleOpen={() => setShowStocksPage(true)}
          />
        )}
        {/* Balances Row */}
        <Row>
          {/* Savings Balance */}
          <Col>
            <Typography variant="h1">Checking:</Typography>
            <Typography variant="body1">$ {kidInfo[2]}</Typography>
          </Col>

          {/* Checking Balance */}
          <Col>
            <Typography variant="h1">Savings:</Typography>
            <Typography variant="body1">$ {kidInfo[3]}</Typography>
          </Col>
        </Row>
      </Card>
          
      {/* Tasks List */}
      <ListGroup as="ol" numbered>
        {props.tasks.filter(tasks => tasks.completed === false).map(({ price, name, infoLine, id }) => {
          return (
            <Task key={id} price={price} name={name} infoLine={infoLine}></Task>
          );
        })}
      </ListGroup>
    </Container>
  );
};

const Task = (props) => {
  return (
    <ListGroup.Item
      as="li"
      className="Chore-Item d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto align-items-start">
        <div className="Left-Align fw-bold">{props.name}</div>
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

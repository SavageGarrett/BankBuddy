import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Typography, Button, TextField } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 100,
    margin: 333,
    marginTop: 60,
  },
}));

export default function SimpleModal({ handleClose, handleOpen }) {
  const classes = useStyles();
  const [moneyAmount, setMoneyAmount] = useState();

  const sendToSavings = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "r1rC7mLDKb1Bxc5neUsNt7JtxbSYF9ti3yYUMjkE");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      subtract_cash_balance: moneyAmount,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://1u6xfou096.execute-api.us-east-1.amazonaws.com/default/gettersetter_tasks",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setMoneyAmount(0);
  };

  const sendToChecking = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "r1rC7mLDKb1Bxc5neUsNt7JtxbSYF9ti3yYUMjkE");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      subtract_user_account_balance: moneyAmount,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://1u6xfou096.execute-api.us-east-1.amazonaws.com/default/gettersetter_tasks",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setMoneyAmount(0);
  };
  const handleChange = (e) => {
    setMoneyAmount(e.target.value);
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={handleOpen}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <Typography>Transfer Money</Typography>
        <Typography variant="caption1">
          Send money to your account of choice!
        </Typography>
        <Row>
          <Col style={{ paddingBottom: 20 }}>
            <TextField
              label="Amount"
              value={moneyAmount}
              onChange={handleChange}
              style={{ marginTop: "20px" }}
            />
          </Col>
        </Row>
        <Button onClick={sendToChecking} style={{ marginRight: 20 }}>
          Send to Savings
        </Button>
        <Button onClick={sendToSavings}>Send to Checking</Button>
      </div>
    </Modal>
  );
}

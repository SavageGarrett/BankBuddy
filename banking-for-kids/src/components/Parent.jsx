import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Typography, Button } from "@material-ui/core";
import SimpleModal from "./ParentComponents/SimpleModal";

const Parent = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Container>
      <Row>
        <Typography>I am a parent!</Typography>
      </Row>
      <Button onClick={() => setOpenModal(true)}>POST A TASK</Button>
      <SimpleModal
        handleClose={() => setOpenModal(false)}
        handleOpen={openModal}
      />
    </Container>
  );
};

export default Parent;

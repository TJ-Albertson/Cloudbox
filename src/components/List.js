import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useApi } from "../hooks/useApi";
import { UserContext } from "./CloudBox";
import "../SCSS/List.scss";

export default function List(props) {
  const signedInUser = useContext(UserContext);

  const {
    loading: filesLoading,
    refresh: refreshFiles,
    data: fileList,
  } = useApi(`/files/${signedInUser.email}`, {
    dummyData: [],
  });

  if (props.recent) {
    //sort by updatedAt
  }
  if (props.starred) {
    //get files based on users starred array
  }
  if (props.trash) {
    //get files with directory trash
  }

  if (filesLoading) {
    return <p id="list">loading</p>;
  }


  return (
    <Container id="list">
      {fileList.map(item => 
        <Row key={item._id}>
          <Col>{item.name}</Col>
          <Col>{item.updatedAt}</Col>
          <Col>{item.mimeType}</Col>
          <Col>{item.size}</Col>
        </Row>
      )}
    </Container>
  );
}

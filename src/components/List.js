import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useApi } from "../hooks/useApi";
import { UserContext } from "./CloudBox";
import "../SCSS/List.scss";


import { useSortableData, FileImage, localDate } from "../utilities/functions";

export default function List(props) {
  const signedInUser = useContext(UserContext);


  //const [list, setList] = useState()

  const {
    loading: filesLoading,
    refresh: refreshFiles,
    data: fileList,
  } = useApi(`/files/${signedInUser.email}`, {
    dummyData: [],
  });

  let list=[]
  //setList(fileList)

  if (props.recent) {
    list = fileList;


    list.sort((a, b) => {
      if(a.updatedAt === b.updatedAt) {
        // If two elements have same number, then the one who has larger rating.average wins
        return b.updatedAt - a.updatedAt
      } else {
        // If two elements have different number, then the one who has larger number wins
        return b.name - a.name;
      }
    });
    
    
    list = list.filter((element, index) => {
      return index === 0 || element.mimeType !== "File folder";
    });

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

      <Row>
        <Col>Name</Col>
        <Col>Date</Col>
        <Col>Type</Col>
        <Col>Size</Col>
      </Row>

      {list.map(item => 
        <Row key={item._id}>
          <Col>{item.name}</Col>
          <Col>{localDate(item.updatedAt)}</Col>
          <Col>{item.mimeType}</Col>
          <Col>{item.size}</Col>
        </Row>
      )}
    </Container>
  );
}

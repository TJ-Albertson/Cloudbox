import { React, useState, useContext } from "react";
import { Button, Form, Stack } from "react-bootstrap";

import { UserContext } from "./CloudBox";

export default function Upload(props) {
  const [file, setFile] = useState();
  const signedInUser = useContext(UserContext);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();


    let id = Math.random() * 10000 + 100;
    const date = new Date();

    props.newfolder({
      _id: id,
      owner: "johndoe@email.com",
      name: file.name,
      size: file.size,
      directory: props.directory,
      path: "0",
      mimeType: file.type,
      updatedAt: date.toISOString(),
    });

  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack direction="horizontal" gap={3}>
        <Form.Control type="file" onChange={handleChange} />
        <Button type="submit">Upload</Button>
      </Stack>
    </Form>
  );
}

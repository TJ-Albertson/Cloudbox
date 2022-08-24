import { React, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";

import { postApi } from "../api/postApi";

export default function Upload(props) {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("owner", props.email);
    formData.append("name", file.name);
    formData.append("size", file.size); //bytes

    await postApi("/upload", formData, props.token);
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

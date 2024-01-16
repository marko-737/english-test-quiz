// Settings.jsx
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import TextFieldComp from "../components/TextFieldComp";

const Settings = () => {
  const history = useHistory();
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    history.push("/questions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextFieldComp
        label={"Enter your name"}
        type={"text"}
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextFieldComp
        label={"Enter your email"}
        type={"email"}
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit" mb={3}>
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default Settings;

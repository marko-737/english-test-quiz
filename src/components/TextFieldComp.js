// TextFieldComp.jsx
import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TextFieldComp = ({ label, type, value, onChange }) => {
  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          onChange={onChange}
          variant="outlined"
          label={label}
          type={type}
          size="small"
          required
          value={value}
        />
      </FormControl>
    </Box>
  );
};

export default TextFieldComp;

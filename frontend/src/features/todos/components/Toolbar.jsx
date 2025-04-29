import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Toolbar = ({ onApply }) => {
  const [text, setText] = useState('');

  const apply = () => {
    onApply(text.trim());
  };

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <TextField
        label="Filter"
        variant="standard"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button variant="contained" color="info" onClick={apply}>
        Apply
      </Button>
    </div>
  );
};

export default Toolbar;

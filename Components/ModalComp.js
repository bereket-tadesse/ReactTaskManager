import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

const containerStyle = {
  padding: 3,
};

export default function ModalComp({ sendDatatoTuple }) {
  //states
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  
  const handleAdd = () => {
    //check if all  fields are not empty
    if (title && Description && deadline && priority) {
      const data = [
        title,
        Description,
        moment(deadline).format('MM-DD-YYYY'),
        priority,
      ];
      sendDatatoTuple(data);
      toast.success('Successfully Added😀');
      handleClose();
    } else {
      toast.error('Please Enter all required fields!');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDatePickerChange = (date) => {
    setDeadline(date);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <div>
      <Button
        id="addButton"
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={handleOpen}
      >
        ADD
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <AddCircleIcon />
                Add Task
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid sx={containerStyle} align="center">
            <Grid>
              {/**Title */}
              <TextField
                id="title-TF"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                fullWidth
                error={title.trim() === ''}
                helperText={title.trim() === '' ? 'Title is required' : ''}
              />
              {/**Description */}
              <TextField
                id="description-TF"
                label="Description"
                variant="outlined"
                value={Description}
                onChange={handleDescriptionChange}
                fullWidth
                error={Description.trim() === ''}
                helperText={
                  Description.trim() === '' ? 'Description is required' : ''
                }
              />
              {/**datepicker buttons */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} id="demo">
                  <DatePicker
                    id="datePicker"
                    label="Deadline"
                    value={deadline}
                    onChange={handleDatePickerChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {/**radio buttons */}
              <FormControl>
                <FormLabel id="priorityRadio">Priority</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={priority}
                  onChange={handlePriorityChange}
                >
                  <FormControlLabel
                    value="Low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="Med"
                    control={<Radio />}
                    label="Med"
                  />
                  <FormControlLabel
                    value="High"
                    control={<Radio />}
                    label="High"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid xs={9}>
              {' '}
              <Button
                id="addButton2"
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleAdd}
              >
                Add
              </Button>{' '}
              <Button
                id="cancelButton"
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={handleClose}
                style={{ backgroundColor: 'red' }}
              >
                Cancel
              </Button>{' '}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tuple from './Tuple.js';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ModalComp from '../Components/ModalComp.js';
import { toast } from 'react-toastify';

export default function BasicTable() {
  const [dataFromModal, setDataFromModal] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleDatafromModal = (newDataArray) => {
    // Check if a tuple with the same title already exists
    const titleExists = dataFromModal.some(
      (tuple) => tuple[0] === newDataArray[0]
    );

    if (!titleExists) {
      setDataFromModal((prevData) => [...prevData, newDataArray]);
    } else {
      // already exists
      toast.error(
        `Tuple with title ${newDataArray[0]} already exists. Choose a unique title.`
      );
    }
  };

  const handleOpen = () => {
    console.log('bool from main table ---- ');
    setIsOpen(true);
    console.log(isOpen);
    console.log('add button is clicked----');
  };

  const handleUpdateTuple = (updatedTuple) => {
    // Update the parent component state with the updated tuple
    setDataFromModal((prevData) => {
      const newData = [...prevData];
      newData[updatedTuple.index] = [
        updatedTuple.title,
        updatedTuple.description,
        updatedTuple.deadline,
        updatedTuple.priority,
        updatedTuple.isComplete,
      ];
      return newData;
    });
  };
  useEffect(() => {
    console.log('rerendering');
  });

  return (
    <>
      {/** App bar*/}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              align="center"
            >
              <MenuIcon />
              FRAMEWORKS
            </Typography>

            <ModalComp sendDatatoTuple={handleDatafromModal} />
          </Toolbar>
        </AppBar>
      </Box>
      {/** Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Deadline</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">IsComplete</TableCell>
              <TableCell align="center"> Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Rendering Tuples */}
            {dataFromModal.map((tuple, index) => (
              <Tuple
                index={index}
                title={tuple[0]}
                description={tuple[1]}
                deadline={tuple[2]}
                priority={tuple[3]}
                isComplete={false}
                onUpdate={handleUpdateTuple}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

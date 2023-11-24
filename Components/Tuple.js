import React, { useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify';
import UpdateModal from './TupleModal.js';

function createData(index, title, description, deadline, priority, isComplete) {
  return { index, title, description, deadline, priority, isComplete };
}

export default function Tuple(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isChecked, setIsChecked] = useState(props.isComplete);

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [deadline, setDeadline] = useState(props.deadline);
  const [priority, setPriority] = useState(props.priority);

  const rows = [
    createData(
      props.index,
      props.title,
      props.description,
      props.deadline,
      props.priority,
      props.isComplete
    ),
  ];

  const handleUpdateClick = () => {
    setIsModalOpen(true);
    setModalData({
      title,
      description,
      deadline,
      priority,
    });
  };

  const handleCheckedChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleDeleteClick = (e) => {
    console.log('delete works');
    e.target.parentNode.parentNode.parentNode.remove();
    toast.success('Task Deleted! 🗑️');
  };

  const handleUpdateData = (updatedData) => {
    // Update the state with the new data
    setTitle(updatedData[0]);
    setDescription(updatedData[1]);
    setDeadline(updatedData[2]);
    setPriority(updatedData[3]);
    // Call the callback function from props to update the parent component state
    props.onUpdate({
      index: props.index,
      title: updatedData[0],
      description: updatedData[1],
      deadline: updatedData[2],
      priority: updatedData[3],
      isComplete: isChecked,
    });
  };

  useEffect(() => {
    const updateButton = document.getElementById(`updateButton_${props.index}`);

    if (updateButton && isChecked) {
      // Access the parent node and remove the button
      const parentElement = updateButton.parentNode;
      parentElement.removeChild(updateButton);
      toast.success('🙌 Task completed!');
    }
  });

  return (
    <>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell align="center">{row.description}</TableCell>
          <TableCell align="center">{row.deadline}</TableCell>
          <TableCell align="center">{row.priority}</TableCell>
          <TableCell align="center">
            <Checkbox checked={isChecked} onChange={handleCheckedChange} />
          </TableCell>
          <TableCell align="center">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <Button
                id={`updateButton_${props.index}`}
                variant="contained"
                startIcon={<EditNoteIcon />}
                onClick={handleUpdateClick}
              >
                Update
              </Button>
              <UpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sendDatatoTuple={handleUpdateData}
                data={modalData}
              />
              <Button
                id={`deleteButton_${props.index}`}
                variant="contained"
                startIcon={<DeleteForeverIcon />}
                style={{ backgroundColor: 'red' }}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

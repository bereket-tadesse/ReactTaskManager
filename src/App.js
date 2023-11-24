/*  >>> README <<<

>>> For usecase #120 (distct validation), instead of displaying error under the textbox for using same title key,  I replaced the error to be a MUI toaster that gets displayed when trying to update.

>>> When running the app, a bug might occur and if it happens please refresh the page to test again and test other use cases as it might affect other features.

>>>  The app might freeze when trying to update the date by clicking the icon, this was due to the MUI date picker elemenent format when being transfered across components as a state. but it works if numbers are manually entered by typing. It works sometimes and sometimes it freezes.

>>> For the dialogue boxes I used Modal component instead, it is similar to dialogue comp but I find it better.
**/

import React from 'react';
import './style.css';
import MainTable from '../Components/MainTable.js';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Container>
      <Row>
        <MainTable />
      </Row>
      <ToastContainer position="bottom-right" />
    </Container>
  );
}

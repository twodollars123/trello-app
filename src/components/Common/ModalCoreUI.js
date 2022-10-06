import { useState } from "react";

import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CForm,
  CCol,
  CFormCheck,
  CFormFeedback,
  CFormTextarea,
  CFormLabel,
} from "@coreui/react";

import Select from "react-select";

const options = [
  { label: "Tuấn", value: "Tuấn" },
  { label: "Kiên", value: "Kiên" },
  { label: "Đạt", value: "Đạt" },
  { label: "Dũng", value: "Dũng" },
];

const priorityOptions = [
  { label: "low", value: "low" },
  { label: "medium", value: "medium" },
  { label: "high", value: "high" },
];
function ModalCoreUI(props) {
  const { visible, setVisible, column } = props;
  const [approve, setAppprove] = useState([]);
  const [titleNewTask, setTitleNewTask] = useState();
  const [desciptionNewTask, setDesciptionNewTask] = useState();
  const [priority, setPriority] = useState();

  // const handleAddNewTask = () => {
  //   let newTask = {
  //     id: Math.random().toString(36).substring(2, 5),
  //     boardId: column.boardId,
  //     columnId: column.id,
  //     title: titleNewTask,
  //     description: desciptionNewTask,
  //     cover: null,
  //     priority: "low",
  //     approve: selected,
  //   };
  //   console.log("A", newTask);
  // };
  const handleAddNewTask = () => {
    let newTask = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: titleNewTask,
      description: desciptionNewTask,
      cover: null,
      priority: priority,
      approve: approve,
    };
    //console.log("newTask", newTask);
    props.onHandleAddNewTask(newTask);
  };

  const handleChange = (value) => {
    let customValue = [];
    value.map((item) => {
      customValue.push(item.value);
    });
    setAppprove(customValue);
  };

  const handleChangePriority = (value) => {
    setPriority(value.value);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Add a new task in </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" noValidate>
          <CCol md={12}>
            <CFormInput
              type="text"
              feedbackValid="Looks good!"
              id="validationCustom01"
              label="Title"
              required
              onChange={(e) => {
                setTitleNewTask(e.target.value);
              }}
            />
          </CCol>
          <CCol md={12}>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              label="Description"
              rows="3"
              text="Must be 8-20 words long."
              onChange={(e) => {
                setDesciptionNewTask(e.target.value);
              }}
            />
          </CCol>

          <CCol md={12}>
            <CFormLabel>Priority</CFormLabel>
            <Select
              options={priorityOptions}
              closeMenuOnSelect={true}
              onChange={handleChangePriority}
            />
          </CCol>

          <CCol md={12}>
            <CFormLabel>Approve</CFormLabel>
            <Select
              options={options}
              isMulti
              closeMenuOnSelect={false}
              onChange={handleChange}
            />
          </CCol>

          <CCol xs={12}>
            <CFormCheck
              type="checkbox"
              id="invalidCheck"
              label="Agree to terms and conditions"
              required
            />
            <CFormFeedback invalid>
              You must agree before submitting.
            </CFormFeedback>
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            props.setVisible(false);
          }}
        >
          Close
        </CButton>
        <CButton color="primary" onClick={handleAddNewTask}>
          Add
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default ModalCoreUI;

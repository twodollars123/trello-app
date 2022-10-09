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
  const {
    visible,
    setVisible,
    column,
    title,
    description,
    approve,
    priority,
    onUpdateTask,
    onAction,
  } = props;
  const [curentApprove, setAppprove] = useState([approve] || []);
  const [titleNewTask, setTitleNewTask] = useState(title || "");
  const [desciptionNewTask, setDesciptionNewTask] = useState(description || "");
  const [curentPriority, setPriority] = useState(priority || "");

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

  const handleChange = (value, action) => {
    let customValue = [];
    value.map((item) => {
      customValue.push(item.value);
    });
    setAppprove(customValue);
  };

  const handleChangePriority = (value) => {
    setPriority(value.value);
  };

  const handleConfirmUpdate = () => {
    let newTask = {
      id: props.task.id,
      boardId: props.column.boardId,
      columnId: props.column.id,
      title: titleNewTask,
      description: desciptionNewTask,
      cover: null,
      priority: curentPriority,
      approve: curentApprove,
    };
    console.log("approve", newTask.id);
    onUpdateTask(newTask);
    setVisible(false);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        {onAction !== "_comfirmUpdateTask" ? (
          <CModalTitle>Add a new task in {column.title}</CModalTitle>
        ) : (
          <CModalTitle>Update task in {column.title}</CModalTitle>
        )}
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" noValidate>
          <CCol md={12}>
            <CFormInput
              type="text"
              feedbackValid="Looks good!"
              id="validationCustom01"
              label="Title"
              value={titleNewTask}
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
              value={desciptionNewTask}
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
              defaultValue={priorityOptions.find(
                (item) => item.value === priority
              )}
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
              defaultValue={options.find((item) => item.value === approve)}
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
        {onAction !== "_comfirmUpdateTask" ? (
          <CButton color="primary" onClick={handleAddNewTask}>
            Add
          </CButton>
        ) : (
          <CButton color="primary" onClick={handleConfirmUpdate}>
            Confirm
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  );
}

export default ModalCoreUI;

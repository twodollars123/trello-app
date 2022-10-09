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
import { useState } from "react";

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
function ModalUpdateTask(props) {
  const {
    visible,
    setVisible,
    title,
    description,
    approve,
    priority,
    onUpdateTask,
  } = props;
  const [curentApprove, setAppprove] = useState([approve]);
  const [titleNewTask, setTitleNewTask] = useState(title);
  const [desciptionNewTask, setDesciptionNewTask] = useState(description);
  const [curentPriority, setPriority] = useState(priority);

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
    console.log("approve", newTask.approve);
    onUpdateTask(newTask);
    setVisible(false);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Update a new task in </CModalTitle>
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
        <CButton color="primary" onClick={handleConfirmUpdate}>
          Confirm
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default ModalUpdateTask;

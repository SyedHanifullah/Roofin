import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Api } from "../../utils/Api";

const AddStudent = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (props.currentStudent) {
      setStudent({
        firstName: props.currentStudent.first_name,
        lastName: props.currentStudent.last_name,
        email: props.currentStudent.email,
        address: props.currentStudent.address,
      });
    } else {
      setStudent({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
      });
    }
  }, [props.showModal, props.currentStudent]);

  const closeModal = () => {
    setShowModal(false);
    props.hideModal(false);
  };
  const { firstName, email, address, lastName } = student;

  const handleSave = async () => {
    if (props.currentStudent) {
      const response = await Api("put", `update-student`, {
        first_name: firstName,
        last_name: lastName,
        email,
        address,
        id: props.currentStudent.id,
      });
      if (response.status == 200) {
        closeModal();
      }
    } else {
      const response = await Api("post", `add-student`, {
        first_name: firstName,
        last_name: lastName,
        email,
        address,
      });
      if (response.status == 200) {
        closeModal();
      }
    }
  };

  return (
    <>
      <Dialog
        open={props.openModal}
        onClose={() => closeModal()}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth="sm"
      >
        <DialogTitle id="form-dialog-title" style={{ fontSize: 18 }}>
          {props.currentStudent ? "Update Student " : "Add Student"}
        </DialogTitle>
        <DialogContent sx={{ m: 3 }}>
          <br />
          <Grid container>
            {Object.entries(student).map((key, ind) => (
              <Grid
                key={ind}
                sm={12}
                md={6}
                item
                sx={{ paddingRight: 2, marginBottom: 2 }}
              >
                <TextField
                  value={key[1]}
                  label={key[0]}
                  onChange={(e) => {
                    student[key[0]] = e.target.value;
                    setStudent({ ...student });
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal()} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            {props.currentStudent ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStudent;

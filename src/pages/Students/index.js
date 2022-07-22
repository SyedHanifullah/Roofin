import React, { useState, useEffect } from "react";
import { Api } from "../../utils/Api";
import { Card, CardContent, Input, Button } from "@mui/material";
import DataTable from "react-data-table-component";
import AddStudent from "./AddStudent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Users = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [currentStudent, setCurrentUser] = useState(null);
  useEffect(() => {
    getAllStudents();
  }, [addStudent]);

  const getAllStudents = async () => {
    const response = await Api("get", `get-all-student`);
    if (response.status == 200) setAllStudents(response.data);
  };

  let columns = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <EditIcon
              onClick={() => handleUpdate(row)}
              style={{ cursor: "pointer" }}
            />
            <DeleteIcon
              onClick={() => handleDelete(row)}
              style={{ cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];
  const handleUpdate = async (row) => {
    setCurrentUser({
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      address: row.address,
    });

    setAddStudent(true);
  };
  const handleDelete = async (row) => {
    const response = await Api("delete", `delete-student/${row.id}`);
    if (response.status) {
      let updated = allStudents.filter((a, i) => a.id != row.id);
      setAllStudents(updated);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={allStudents}
            subHeader
            pagination
            paginationComponentOptions={{ noRowsPerPage: true }}
            persistTableHead
            theme="solarized"
            highlightOnHover
            subHeaderComponent={
              <>
                <Input
                  id="search"
                  name="search"
                  label="search"
                  type="text"
                  variant="outlined"
                  placeholder="Filter"
                  my={2}
                  style={{ position: "absolute", left: "2%" }}
                />
                <Button variant="contained" onClick={() => setAddStudent(true)}>
                  Add Student
                </Button>
              </>
            }
          />
        </CardContent>
      </Card>
      <AddStudent
        openModal={addStudent}
        hideModal={(e) => {
          setAddStudent(e);
          setCurrentUser(null);
        }}
        currentStudent={currentStudent}
      />
    </>
  );
};

export default Users;

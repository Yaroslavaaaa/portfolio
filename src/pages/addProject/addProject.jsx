import React from "react";
import { AddForm } from "../../components/addForm/addForm";
import withAuth from "../../withAuthHOC";

const AddProject = () => {
    return (
        <div>
            <AddForm />
        </div>
      );
    };


export default withAuth(AddProject);
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavBtn({text, icon, link, fun}) {
  return (
    <Link to={link} onClick={fun} className="w-100 mb-3 text-decoration-none" > 
      <Button id="navButton" className="w-100 p-1 ps-lg-2 border border-0 rounded flex-column align-items-center flex-lg-row justify-content-start fs-6">
         {icon} <span className="btntxt d-none d-lg-block mx-3 mt-1 text-capitalize fw-bolder" >{text}</span> 
      </Button>
    </Link>
  );
}

export default NavBtn;

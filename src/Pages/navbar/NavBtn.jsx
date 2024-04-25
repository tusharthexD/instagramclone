import React from "react";
import { Button } from "@mui/material";

function NavBtn({text, icon, link, fun}) {
  return (
      <Button onClick={fun} id="navButton" className="w-100 p-1 ps-lg-2 border border-0 rounded flex-column align-items-center flex-lg-row justify-content-start fs-6">
         {icon} <span className="btntxt d-none d-lg-block mx-3 text-capitalize fw-bolder" >{text}</span> 
      </Button>

  );
}

export default NavBtn;

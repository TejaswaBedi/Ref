import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductFrom from "../features/admin/components/ProductFrom";

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <ProductFrom />
      </Navbar>
    </div>
  );
};

export default AdminProductFormPage;

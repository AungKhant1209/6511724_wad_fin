"use client";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomerForm from "@/app/components/forms/CustomerForm";  // Adjust import based on your structure

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    { field: "memberNumber", headerName: "Member Number", width: 150 },
    { field: "interests", headerName: "Interests", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="secondary"
            onClick={() => handleEditCustomer(params.row)}
          >
            ✏️
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteCustomer(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers directly from the relative API path
  async function fetchCustomers() {
    try {
      const data = await fetch('/api/customer');  // Use relative path
      if (!data.ok) {
        throw new Error("Failed to fetch customers");
      }
      const customers = await data.json();
      const formattedCustomers = customers.map((customer) => ({
        ...customer,
        id: customer._id,
      }));
      setCustomers(formattedCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  const handleOpen = () => {
    setEditMode(false);
    setCurrentCustomer(null);
    setOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditMode(true);
    setCurrentCustomer(customer);
    setOpen(true);
  };

  function handleCustomerFormSubmit(data) {
    const method = editMode ? "PUT" : "POST";  // Use PUT for editing, POST for creating
    const url = editMode
      ? `/api/customer/${currentCustomer._id}`  // Add customer ID for editing
      : `/api/customer`;  // For creating a new customer

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(() => {
      fetchCustomers();  // Refresh customers after submission
      setOpen(false);  // Close modal after submit
    })
    .catch((error) => {
      console.error("Error during form submission:", error);
    });
  }

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(`/api/customer/${id}`, {
        method: "DELETE",
      }).then(() => {
        fetchCustomers();  // Refresh customers after deletion
      });
    }
  };

  return (
    <main>
      <div className="mx-4">
        <span>Customers ({customers.length})</span>
        <IconButton aria-label="new-customer" color="secondary" onClick={handleOpen}>
          <AddBoxIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomerForm onSubmit={handleCustomerFormSubmit} />
        </Modal>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={customers}
          columns={columns}
          onRowClick={(params) => handleEditCustomer(params.row)}  // Trigger edit on row click
        />
      </div>
    </main>
  );
}

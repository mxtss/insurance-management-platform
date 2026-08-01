import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import SearchBar from "../../components/customers/SearchBar";
import CustomerTable from "../../components/customers/CustomerTable";
import CustomerModal from "../../components/customers/CustomerModal";

import {
  getCustomers,
  createCustomer,
  searchCustomers,
  updateCustomer,
  deleteCustomer
} from "../../services/customerService";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const saveCustomer = async (customer) => {
  try {
    const payload = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      dob: customer.dob,
    };
    if (editing) {
      await updateCustomer(editing.id, payload);   // id goes in the URL, not the body
    } else {
      await createCustomer(payload);
    }
    setOpen(false);
    setEditing(null);
    await loadCustomers();
  } catch (error) {
    console.error(error);
    alert("Unable to save customer.");
  }
};

  const handleEdit = (customer) => {
    setEditing(customer);   // pre-fills the modal
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await deleteCustomer(id);
      await loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete customer.");
    }
  };

  const searchCustomer = async (keyword) => {

  if (keyword === "") {
    loadCustomers();
    return;
  }

  const data = await searchCustomers(keyword);

  setCustomers(data);

};

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Customer Management

      </h1>

      <SearchBar
  value={search}
  onChange={(e) => {

    setSearch(e.target.value);

    searchCustomer(e.target.value);

  }}
  onAdd={() => {
          setEditing(null);   // blank form for Add
          setOpen(true);
        }}
/>
      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CustomerModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={saveCustomer}
        customer={editing}
      />

    </MainLayout>

  );

}

export default Customers;
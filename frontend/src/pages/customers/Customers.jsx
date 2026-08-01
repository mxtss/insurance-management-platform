import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import SearchBar from "../../components/customers/SearchBar";
import CustomerTable from "../../components/customers/CustomerTable";
import CustomerModal from "../../components/customers/CustomerModal";

import {
  getCustomers,
  createCustomer,
  searchCustomers,
} from "../../services/customerService";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const saveCustomer = async (customer) => {
  try {
    await createCustomer(customer);

    setOpen(false);

    await loadCustomers();

  } catch (error) {

    console.error(error);

    alert("Unable to save customer.");

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
  onAdd={() => setOpen(true)}
/>
      <CustomerTable
        customers={customers}
        onEdit={() => {}}
        onDelete={() => {}}
      />

      <CustomerModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={saveCustomer}
      />

    </MainLayout>

  );

}

export default Customers;
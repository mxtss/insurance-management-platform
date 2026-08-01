import { useEffect, useState } from "react";

function CustomerModal({
  open,
  onClose,
  onSave,
  customer,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });

  useEffect(() => {
    if (customer) {
      setForm(customer);
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
      });
    }
  }, [customer]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {

    e.preventDefault();

    console.log(form);

    onSave(form);

};

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          {customer ? "Edit Customer" : "Add Customer"}
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <input
            className="border w-full p-3 rounded"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="border w-full p-3 rounded"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="border w-full p-3 rounded"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            className="border w-full p-3 rounded"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            className="border w-full p-3 rounded"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CustomerModal;
import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customerService";

function PolicyModal({
  open,
  onClose,
  onSave,
  policy,
}) {

  const [customers, setCustomers] = useState([]);

  const emptyForm = {
    customer_id: "",
    policy_type: "",
    premium_amount: "",
    start_date: "",
    end_date: ""
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {

    loadCustomers();

  }, []);

  useEffect(() => {

    if (policy) {

      setForm({
        customer_id: policy.customer_id,
        policy_type: policy.policy_type,
        premium_amount: policy.premium_amount,
        start_date: policy.start_date,
        end_date: policy.end_date
      });

    } else {

      setForm(emptyForm);

    }

  }, [policy]);

  const loadCustomers = async () => {

    try {

      const data = await getCustomers();

      setCustomers(data);

    } catch (err) {

      console.log(err);

    }

  };

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const submit = (e) => {

    e.preventDefault();

    onSave(form);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">

          {policy ? "Edit Policy" : "Create Policy"}

        </h2>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          >

            <option value="">

              Select Customer

            </option>

            {customers.map(customer => (

              <option
                key={customer.id}
                value={customer.id}
              >

                {customer.name}

              </option>

            ))}

          </select>

          <input
            name="policy_type"
            value={form.policy_type}
            onChange={handleChange}
            placeholder="Policy Type"
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="premium_amount"
            value={form.premium_amount}
            onChange={handleChange}
            type="number"
            placeholder="Premium Amount"
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="start_date"
            type="date"
            value={form.start_date}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="end_date"
            type="date"
            value={form.end_date}
            onChange={handleChange}
            className="border p-3 rounded w-full"
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
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              {policy ? "Update" : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default PolicyModal;
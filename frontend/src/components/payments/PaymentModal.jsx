import { useEffect, useState } from "react";

import { getPolicies } from "../../services/policyService";


function PaymentModal({
  open,
  onClose,
  onSave,
  payment,
}) {


  const [policies, setPolicies] = useState([]);


  const emptyForm = {

    policy_id: "",
    payment_date: "",
    due_date: "",
    amount: "",
    payment_status: "Pending"

  };


  const [form, setForm] = useState(emptyForm);



  useEffect(() => {

    loadPolicies();

  }, []);



  useEffect(() => {

    if(payment) {

      setForm({

        policy_id: payment.policy_id,
        payment_date: payment.payment_date,
        due_date: payment.due_date,
        amount: payment.amount,
        payment_status: payment.payment_status

      });

    }
    else {

      setForm(emptyForm);

    }

  }, [payment]);



  const loadPolicies = async () => {

    try {

      const data = await getPolicies();

      setPolicies(data);

    }
    catch(error) {

      console.log(error);

    }

  };



  if(!open) return null;



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

          {payment ? "Edit Payment" : "Add Payment"}

        </h2>



        <form
          onSubmit={submit}
          className="space-y-4"
        >



          <select

            name="policy_id"

            value={form.policy_id}

            onChange={handleChange}

            className="border p-3 rounded w-full"

            required

          >

            <option value="">

              Select Policy

            </option>


            {
              policies.map(policy => (

                <option
                  key={policy.id}
                  value={policy.id}
                >

                  {policy.policy_number} - {policy.customer_name}

                </option>

              ))
            }


          </select>




          <input

            name="payment_date"

            type="date"

            value={form.payment_date}

            onChange={handleChange}

            className="border p-3 rounded w-full"

            required

          />



          <input

            name="due_date"

            type="date"

            value={form.due_date}

            onChange={handleChange}

            className="border p-3 rounded w-full"

            required

          />



          <input

            name="amount"

            type="number"

            value={form.amount}

            onChange={handleChange}

            placeholder="Payment Amount"

            className="border p-3 rounded w-full"

            required

          />




          <select

            name="payment_status"

            value={form.payment_status}

            onChange={handleChange}

            className="border p-3 rounded w-full"

          >

            <option value="Pending">
              Pending
            </option>


            <option value="Paid">
              Paid
            </option>


            <option value="Overdue">
              Overdue
            </option>


          </select>




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

              {payment ? "Update" : "Create"}

            </button>


          </div>



        </form>


      </div>


    </div>

  );

}


export default PaymentModal;
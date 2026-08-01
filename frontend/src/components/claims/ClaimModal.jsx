import { useEffect, useState } from "react";
import { getPolicies } from "../../services/policyService";


function ClaimModal({
  open,
  onClose,
  onSave,
  claim,
}) {


  const [policies, setPolicies] = useState([]);


  const emptyForm = {

    policy_id: "",
    claim_amount: "",
    reason: "",
    status: "Pending",
    submission_date: ""

  };



  const [form, setForm] = useState(emptyForm);



  useEffect(() => {

    loadPolicies();

  }, []);



  useEffect(() => {


    if(claim) {


      setForm({

        policy_id: claim.policy_id,

        claim_amount: claim.claim_amount,

        reason: claim.reason,

        status: claim.status,

        submission_date: claim.submission_date

      });


    }
    else {


      setForm(emptyForm);


    }


  }, [claim]);





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

          Submit Claim

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



            {policies.map((policy)=>(


              <option
                key={policy.id}
                value={policy.id}
              >

                {policy.policy_number}

              </option>


            ))}



          </select>







          <input

            name="claim_amount"

            value={form.claim_amount}

            onChange={handleChange}

            type="number"

            placeholder="Claim Amount"

            className="border p-3 rounded w-full"

            required

          />







          <textarea

            name="reason"

            value={form.reason}

            onChange={handleChange}

            placeholder="Claim Reason"

            className="border p-3 rounded w-full"

            required

          />








          <input

            name="submission_date"

            value={form.submission_date}

            onChange={handleChange}

            type="date"

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

              Submit

            </button>



          </div>





        </form>



      </div>



    </div>

  );

}



export default ClaimModal;
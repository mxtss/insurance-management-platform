import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import PaymentSearch from "../../components/payments/PaymentSearch";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentModal from "../../components/payments/PaymentModal";

import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getDuePayments,
  getOverduePayments,
} from "../../services/paymentService";


function Payments() {


  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [filter, setFilter] = useState("all");



  useEffect(() => {

    loadPayments();

  }, [filter]);



  const loadPayments = async () => {

    try {

      setLoading(true);

      let data;


      if(filter === "due") {

        data = await getDuePayments();

      }
      else if(filter === "overdue") {

        data = await getOverduePayments();

      }
      else {

        data = await getPayments();

      }


      setPayments(data);

    }
    catch(error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };




  const savePayment = async (payment) => {

    try {


      if(selectedPayment) {


        await updatePayment(
          selectedPayment.id,
          payment
        );


        alert(
          "Payment updated successfully."
        );


      }
      else {


        await createPayment(payment);


        alert(
          "Payment created successfully."
        );


      }



      setOpen(false);

      setSelectedPayment(null);

      await loadPayments();


    }
    catch(error) {


      console.log(error);


      alert(
        "Unable to save payment."
      );


    }

  };






  const handleDelete = async (id) => {


    const confirm = window.confirm(
      "Delete this payment?"
    );


    if(!confirm) return;



    try {


      await deletePayment(id);


      alert(
        "Payment deleted successfully."
      );


      await loadPayments();


    }
    catch(error) {


      console.log(error);


      alert(
        "Unable to delete payment."
      );


    }


  };






  const filtered = payments.filter((payment) => {


    return (

      payment.policy_number
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );


  });







  if(loading) {


    return (

      <MainLayout>


        <div className="text-center text-xl py-20">

          Loading Payments...

        </div>


      </MainLayout>

    );


  }






  return (

    <MainLayout>


      <h1 className="text-3xl font-bold mb-6">

        Premium Payment Tracking

      </h1>





      <div className="flex gap-3 mb-5">


        <button

          onClick={() => setFilter("all")}

          className="bg-blue-600 text-white px-4 py-2 rounded"

        >

          All Payments

        </button>



        <button

          onClick={() => setFilter("due")}

          className="bg-yellow-500 text-white px-4 py-2 rounded"

        >

          Due Payments

        </button>




        <button

          onClick={() => setFilter("overdue")}

          className="bg-red-600 text-white px-4 py-2 rounded"

        >

          Overdue Payments

        </button>



      </div>






      <PaymentSearch

        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }


        onAdd={() => {

          setSelectedPayment(null);

          setOpen(true);

        }}

      />






      <PaymentTable

        payments={filtered}


        onEdit={(payment)=>{

          setSelectedPayment(payment);

          setOpen(true);

        }}



        onDelete={handleDelete}

      />






      <PaymentModal

        open={open}

        payment={selectedPayment}


        onClose={()=>{

          setOpen(false);

          setSelectedPayment(null);

        }}


        onSave={savePayment}

      />



    </MainLayout>

  );

}


export default Payments;
import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ClaimSearch from "../../components/claims/ClaimSearch";
import ClaimTable from "../../components/claims/ClaimTable";
import ClaimModal from "../../components/claims/ClaimModal";

import {
  getClaims,
  createClaim,
  approveClaim,
  rejectClaim,
} from "../../services/claimService";


function Claims() {


  const [claims, setClaims] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);





  useEffect(() => {

    loadClaims();

  }, []);






  const loadClaims = async () => {


    try {


      setLoading(true);


      const data = await getClaims();


      setClaims(data);



    }
    catch(error) {


      console.log(error);


    }
    finally {


      setLoading(false);


    }


  };







  const saveClaim = async (claim) => {


    try {


      await createClaim(claim);


      alert(
        "Claim submitted successfully."
      );



      setOpen(false);



      await loadClaims();



    }
    catch(error) {


      console.log(error);



      alert(
        "Unable to submit claim."
      );


    }


  };









  const handleApprove = async (id) => {


    try {


      await approveClaim(id);


      alert(
        "Claim approved successfully."
      );


      await loadClaims();



    }
    catch(error) {


      console.log(error);


      alert(
        "Unable to approve claim."
      );


    }


  };









  const handleReject = async (id) => {


    try {


      await rejectClaim(id);


      alert(
        "Claim rejected successfully."
      );


      await loadClaims();



    }
    catch(error) {


      console.log(error);


      alert(
        "Unable to reject claim."
      );


    }


  };









  const filtered = claims.filter((claim) => {

  return (

    claim.policy_number
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

});








  if(loading) {


    return (

      <MainLayout>


        <div className="text-center text-xl py-20">

          Loading Claims...

        </div>


      </MainLayout>

    );


  }







  return (


    <MainLayout>



      <h1 className="text-3xl font-bold mb-6">

        Claim Management

      </h1>





      <ClaimSearch

        value={search}

        onChange={(e)=>
          setSearch(e.target.value)
        }


        onAdd={()=>

          setOpen(true)

        }

      />






      <ClaimTable

        claims={filtered}

        onApprove={handleApprove}

        onReject={handleReject}

      />






      <ClaimModal

        open={open}

        onClose={()=>
          setOpen(false)
        }

        onSave={saveClaim}

      />



    </MainLayout>


  );

}



export default Claims;
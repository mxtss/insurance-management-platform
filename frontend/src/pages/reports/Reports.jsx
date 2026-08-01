import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  getActivePolicies,
  getExpiredPolicies,
  getClaimStatistics,
  getPremiumCollection,
  getCustomerGrowth,
  downloadMonthlyReport,
  downloadPolicyReport,
  downloadClaimReport
} from "../../services/reportService";


function Reports(){

  const [data,setData] = useState({
    active:0,
    expired:0,
    claims:0,
    premium:0,
    customers:0
  });


  useEffect(()=>{

    loadReports();

  },[]);



  const loadReports = async()=>{

    try{

      const active =
        await getActivePolicies();

      const expired =
        await getExpiredPolicies();

      const claims =
        await getClaimStatistics();

      const premium =
        await getPremiumCollection();

      const customers =
        await getCustomerGrowth();


      setData({

        active:
        active.active_policies,

        expired:
        expired.expired_policies,

        claims:
        claims.total,

        premium:
        premium.total_collection,

        customers:
        customers.total_customers

      });


    }
    catch(error){

      console.log(error);

    }

  };

  const downloadFile = async (type)=>{

  try{

    let file;


    if(type==="monthly"){

      file = await downloadMonthlyReport();

    }

    if(type==="policy"){

      file = await downloadPolicyReport();

    }

    if(type==="claim"){

      file = await downloadClaimReport();

    }


    const url =
      window.URL.createObjectURL(
        new Blob([file])
      );


    const link =
      document.createElement("a");


    link.href = url;


    link.setAttribute(
      "download",
      `${type}_report.pdf`
    );


    document.body.appendChild(link);


    link.click();


    link.remove();


  }
  catch(error){

    console.log(error);

    alert("Unable to download report");

  }

};



  return(

    <MainLayout>


      <h1 className="text-3xl font-bold mb-8">
        Reports
      </h1>


      <div className="
      grid 
      grid-cols-1 
      md:grid-cols-3 
      gap-6">


        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-gray-500">
            Active Policies
          </h2>

          <p className="text-3xl font-bold">
            {data.active}
          </p>

        </div>



        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-gray-500">
            Claims
          </h2>

          <p className="text-3xl font-bold">
            {data.claims}
          </p>

        </div>



        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-gray-500">
            Premium Collection
          </h2>

          <p className="text-3xl font-bold">
            ₹ {data.premium}
          </p>

        </div>



        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-gray-500">
            Customers
          </h2>

          <p className="text-3xl font-bold">
            {data.customers}
          </p>

        </div>



        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-gray-500">
            Expired Policies
          </h2>

          <p className="text-3xl font-bold">
            {data.expired}
          </p>

        </div>


      </div>

      <div className="mt-10">

<h2 className="text-2xl font-bold mb-4">
Download Reports
</h2>


<div className="flex gap-4 flex-wrap">


<button
onClick={()=>downloadFile("monthly")}
className="bg-blue-600 text-white px-5 py-3 rounded-lg"
>
Monthly Report
</button>



<button
onClick={()=>downloadFile("policy")}
className="bg-green-600 text-white px-5 py-3 rounded-lg"
>
Policy Report
</button>



<button
onClick={()=>downloadFile("claim")}
className="bg-orange-600 text-white px-5 py-3 rounded-lg"
>
Claim Report
</button>


</div>

</div>


    </MainLayout>

  );

}


export default Reports;
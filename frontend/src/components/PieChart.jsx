import { useEffect, useState } from "react";

import {

Chart as ChartJS,

ArcElement,

Tooltip,

Legend

} from "chart.js";

import { Pie } from "react-chartjs-2";

import { getClaimStatistics } from "../services/reportService";

ChartJS.register(

ArcElement,

Tooltip,

Legend

);

function PieChart(){

const [stats,setStats]=useState({

approved:0,

pending:0,

rejected:0

});

useEffect(()=>{

load();

},[]);

const load=async()=>{

try{

const data=await getClaimStatistics();

setStats(data);

}

catch(error){

console.log(error);

}

};

const chartData={

labels:[

"Approved",

"Pending",

"Rejected"

],

datasets:[{

data:[

stats.approved,

stats.pending,

stats.rejected

],

backgroundColor:[

"#22c55e",

"#f59e0b",

"#ef4444"

]

}]

};

return(

<div className="bg-white rounded-xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-4">

Claim Statistics

</h2>

<Pie data={chartData}/>

</div>

);

}

export default PieChart;
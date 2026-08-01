import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    BarElement,

    Tooltip,

    Legend

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    Tooltip,

    Legend

);

function BarChart() {

    const data = {

        labels: [

            "Jan",

            "Feb",

            "Mar",

            "Apr",

            "May",

            "Jun"

        ],

        datasets: [

            {

                label: "Premium Collection",

                data: [

                    25000,

                    30000,

                    28000,

                    35000,

                    40000,

                    50000

                ]

            }

        ]

    };

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">

                Premium Collection

            </h2>

            <Bar data={data} />

        </div>

    );

}

export default BarChart;
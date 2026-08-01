import { useEffect, useState } from "react";

import { getPolicies } from "../services/policyService";

function RecentPolicies() {

  const [policies, setPolicies] = useState([]);

  useEffect(() => {

    loadPolicies();

  }, []);

  const loadPolicies = async () => {

    try {

      const data = await getPolicies();

      setPolicies(data.slice(0, 5));

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-4">

        Recent Policies

      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th>Policy</th>
            <th>Type</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {policies.map((policy) => (

            <tr key={policy.id}>

              <td>{policy.policy_number}</td>

              <td>{policy.policy_type}</td>

              <td>{policy.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default RecentPolicies;
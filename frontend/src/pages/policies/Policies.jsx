import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import PolicySearch from "../../components/policies/PolicySearch";
import PolicyTable from "../../components/policies/PolicyTable";
import PolicyModal from "../../components/policies/PolicyModal";

import {
  getPolicies,
  createPolicy,
  updatePolicy,
  cancelPolicy,
  renewPolicy,
} from "../../services/policyService";

function Policies() {

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {

    loadPolicies();

  }, []);

  const loadPolicies = async () => {

    try {

      setLoading(true);

      const data = await getPolicies();

      setPolicies(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const savePolicy = async (policy) => {

    try {

      if (selectedPolicy) {

        await updatePolicy(selectedPolicy.id, policy);

        alert("Policy updated successfully.");

      } else {

        await createPolicy(policy);

        alert("Policy created successfully.");

      }

      setOpen(false);

      setSelectedPolicy(null);

      await loadPolicies();

    } catch (error) {

      console.log(error);

      alert("Unable to save policy.");

    }

  };

  const handleCancel = async (id) => {

    const confirm = window.confirm(
      "Cancel this policy?"
    );

    if (!confirm) return;

    try {

      await cancelPolicy(id);

      alert("Policy cancelled successfully.");

      await loadPolicies();

    } catch (error) {

      console.log(error);

      alert("Unable to cancel policy.");

    }

  };

  const handleRenew = async (id) => {

    const newDate = prompt(
      "Enter new end date (YYYY-MM-DD)"
    );

    if (!newDate) return;

    try {

      await renewPolicy(id, newDate);

      alert("Policy renewed successfully.");

      await loadPolicies();

    } catch (error) {

      console.log(error);

      alert("Unable to renew policy.");

    }

  };

  const filtered = policies.filter((policy) =>
    policy.policy_number
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {

    return (

      <MainLayout>

        <div className="text-center text-xl py-20">

          Loading Policies...

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Policy Management

      </h1>

      <PolicySearch
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        onAdd={() => {

          setSelectedPolicy(null);

          setOpen(true);

        }}
      />

      <PolicyTable
        policies={filtered}
        onEdit={(policy) => {

          setSelectedPolicy(policy);

          setOpen(true);

        }}
        onCancel={handleCancel}
        onRenew={handleRenew}
      />

      <PolicyModal
        open={open}
        policy={selectedPolicy}
        onClose={() => {

          setOpen(false);

          setSelectedPolicy(null);

        }}
        onSave={savePolicy}
      />

    </MainLayout>

  );

}

export default Policies;
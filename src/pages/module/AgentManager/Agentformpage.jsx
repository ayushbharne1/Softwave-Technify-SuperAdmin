import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AgentForm from "./Agentform";
import { useDispatch, useSelector } from "react-redux";
import { postAgent } from "../../../redux/slice/agent/agentAddSlice";
import { toast } from "react-toastify";
export default function AgentFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.agent);

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    occupation: "",
  });

  useEffect(() => {
    if (isEdit) {
      const agents = JSON.parse(localStorage.getItem("agents")) || [];
      const agent = agents.find((a) => a.id === id);
      if (agent) setForm(agent);
    }
  }, [id, isEdit]);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      // alert("Required fields missing");
      toast.error("Required fields missing!",{
        autoClose:2000
      })
      return;
    }

    try {
      await dispatch(postAgent(form)).unwrap();
      toast.success("Agent data saved successfully!",{
        autoClose:2000
      });
      navigate("/agent");
    } catch (err) {
      // alert("Error saving agent: " + err);
      toast.error("Error saving agent ",err,{
        autoClose:2000
      });
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <AgentForm
        title={isEdit ? "Edit Agent" : "Add Agent"}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />
      {loading && <p>Saving...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {error && <p className="text-red-500">{error.message}</p>}

    </div>
  );
}

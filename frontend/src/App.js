import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchUsers = async () => {
    const res = await axios.get("http://192.168.49.2:31500/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    await axios.post("http://192.168.49.2:31500/users", form);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://192.168.49.2:31500/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h2>CRUD with MySQL</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})
            <button onClick={() => deleteUser(user.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

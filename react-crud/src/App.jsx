import { useState } from 'react';
import './App.css';

function App() {
  const [notebooks, setNotebooks] = useState([
    { id: 1, gyarto: 'HP', tipus: 'COMPAQ 615 NX556EA', kijelzo: 15.6, memoria: 1024, ar: 95120 },
    { id: 2, gyarto: 'ASUS', tipus: 'K51AC-SX001D', kijelzo: 15.6, memoria: 2048, ar: 101200 },
    { id: 3, gyarto: 'HP', tipus: 'Pavilion DV6-1110EH', kijelzo: 15.6, memoria: 3072, ar: 167920 },
    { id: 4, gyarto: 'ACER', tipus: 'Aspire 5536G', kijelzo: 15.6, memoria: 2048, ar: 111920 }
  ]);

  const [formData, setFormData] = useState({ gyarto: '', tipus: '', kijelzo: '', memoria: '', ar: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setNotebooks(notebooks.map(nb => nb.id === editId ? { ...formData, id: editId, kijelzo: parseFloat(formData.kijelzo), memoria: parseInt(formData.memoria), ar: parseInt(formData.ar) } : nb));
      setEditId(null);
      alert('Sikeresen módosítva!');
    } else {
      const newId = notebooks.length > 0 ? Math.max(...notebooks.map(n => n.id)) + 1 : 1;
      setNotebooks([...notebooks, { ...formData, id: newId, kijelzo: parseFloat(formData.kijelzo), memoria: parseInt(formData.memoria), ar: parseInt(formData.ar) }]);
      alert('Sikeresen hozzáadva!');
    }
    setFormData({ gyarto: '', tipus: '', kijelzo: '', memoria: '', ar: '' });
  };

  const handleEdit = (nb) => {
    setFormData({ gyarto: nb.gyarto, tipus: nb.tipus, kijelzo: nb.kijelzo, memoria: nb.memoria, ar: nb.ar });
    setEditId(nb.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a notebookot?')) {
      setNotebooks(notebooks.filter(nb => nb.id !== id));
    }
  };

  return (
    <div className="crud-container">
      <div className="form-section">
        <h3>{editId ? 'Notebook szerkesztése' : 'Új Notebook hozzáadása'}</h3>
        <form onSubmit={handleSubmit}>
          <label>Gyártó:</label>
          <input type="text" name="gyarto" value={formData.gyarto} onChange={handleChange} required />
          
          <label>Típus:</label>
          <input type="text" name="tipus" value={formData.tipus} onChange={handleChange} required />
          
          <label>Kijelző (col):</label>
          <input type="number" step="0.1" name="kijelzo" value={formData.kijelzo} onChange={handleChange} required />
          
          <label>Memória (MB):</label>
          <input type="number" name="memoria" value={formData.memoria} onChange={handleChange} required />
          
          <label>Ár (Ft):</label>
          <input type="number" name="ar" value={formData.ar} onChange={handleChange} required />
          
          <button type="submit" className="btn-submit">{editId ? 'Mentés' : 'Hozzáadás'}</button>
          {editId && <button type="button" className="btn-cancel" onClick={() => { setEditId(null); setFormData({ gyarto: '', tipus: '', kijelzo: '', memoria: '', ar: '' }); }}>Mégse</button>}
        </form>
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Gyártó</th><th>Típus</th><th>Kijelző</th><th>Memória</th><th>Ár</th><th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {notebooks.map((nb) => (
              <tr key={nb.id}>
                <td>{nb.id}</td>
                <td>{nb.gyarto}</td>
                <td>{nb.tipus}</td>
                <td>{nb.kijelzo}"</td>
                <td>{nb.memoria} MB</td>
                <td>{nb.ar} Ft</td>
                <td>
                  <button className="action-btn btn-edit" onClick={() => handleEdit(nb)}>Módosít</button>
                  <button className="action-btn btn-delete" onClick={() => handleDelete(nb.id)}>Töröl</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`/api/admin/products/${id}`)
      .then(() => setProducts(products.filter(product => product._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

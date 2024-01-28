import { Metadata } from 'next';
import { useState, useEffect, ChangeEvent } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}



const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity),
        }),
      });
      fetchProducts();
      // Limpar os campos do formulário após a criação
      setNewProduct({
        name: '',
        price: '',
        quantity: '',
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const handleEditProduct = async (productId: string, updatedData: { name?: string; price?: number; quantity?: number }) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      fetchProducts();
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof typeof newProduct) => {
    setNewProduct({
      ...newProduct,
      [field]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R${product.price} - Quantidade: {product.quantity}
            <button onClick={() => handleEditProduct(product.id, { name: 'Novo Nome' })}>
              Editar
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h2>Adicionar Novo Produto</h2>
      <input
        type="text"
        placeholder="Nome do Produto"
        value={newProduct.name}
        onChange={(e) => handleInputChange(e, 'name')}
      />
      <input
        type="number"
        placeholder="Preço"
        value={newProduct.price}
        onChange={(e) => handleInputChange(e, 'price')}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={newProduct.quantity}
        onChange={(e) => handleInputChange(e, 'quantity')}
      />
      <button onClick={handleCreateProduct}>Adicionar Produto</button>
    </div>
  );
};

export default Products;

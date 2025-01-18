import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.css";

const Shop = () => {
  const [cart, setCart] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const [priceRange, setPriceRange] = useState([0, 200]); 
  const navigate = useNavigate(); 

  // قائمة المنتجات مع الكمية المتاحة
  const products = useMemo(() => [
    { id: 1, name: "Nike Shoes", price: 120, description: "High-quality running shoes from Nike.", image: "/assets/images/nike-shoes.jpg", category: "Shoes", availableQuantity: 10 },
    { id: 2, name: "Adidas T-Shirt", price: 40, description: "Comfortable and stylish T-shirt by Adidas.", image: "/assets/images/adidas-shirt.jpg", category: "Clothing", availableQuantity: 5 },
    { id: 3, name: "Rugby ball", price: 25, description: "Rugby ball.", image: "/assets/images/Rugby ball.jpg", category: "Sports", availableQuantity: 15 },
    { id: 4, name: "Tennis racket", price: 35, description: "Tennis racket.", image: "/assets/images/Tennis racket.jpg", category: "Sports", availableQuantity: 8 },
    { id: 5, name: "Puma Hat", price: 25, description: "Trendy Puma cap for casual wear.", image: "/assets/images/puma hat.jpg", category: "Clothing", availableQuantity: 20 },
    { id: 6, name: "Basketball", price: 95, description: "Basketball.", image: "/assets/images/Basketball.jpg", category: "Sports", availableQuantity: 12 }
  ], []);

  // إضافة المنتج إلى السلة مع التحقق من الكمية المتاحة
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item.id === product.id);
      if (!productExists) {
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        return updatedCart;
      } else {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.availableQuantity), // التأكد من عدم زيادة الكمية عن الكمية المتاحة
              }
            : item
        );
        return updatedCart;
      }
    });
  }, []);

  // تصفية المنتجات بناءً على البحث والفئة والنطاق السعري
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearchQuery;
    });
  }, [searchQuery, categoryFilter, priceRange, products]);

  // الانتقال إلى صفحة السلة
  const goToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <div>
      <h1>Shop</h1>

      {/* خانة البحث */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="">All Categories</option>
          <option value="Shoes">Shoes</option>
          <option value="Clothing">Clothing</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="range"
          min="0"
          max="200"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, e.target.value])}
        />
        <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
      </div>

      {/* عرض المنتجات */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image || "/assets/images/default.jpg"}
              onAddToCart={() => addToCart(product)} // إضافة المنتج للسلة
              onProductClick={() => navigate(`/products/${product.id}`)} // التنقل إلى صفحة تفاصيل المنتج
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button 
            onClick={() => {
              filteredProducts.forEach((product) => addToCart(product));
              goToCart(); 
            }}
            style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Add All Products to Cart
          </button>
        </div>
      )}

      {/* عرض السلة */}
      <div>
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price} x {product.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Shop;

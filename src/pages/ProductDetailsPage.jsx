import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Nike Shoes",
      price: 120,
      description: "High-quality sports shoes.",
      image: "/assets/images/nike-shoes.jpg",
      availableQuantity: 10,  // كمية المنتج المتاحة
      reviews: [
        { id: 1, author: "Mustafa Mohammed", text: "Amazing shoes, very comfortable!" },
        { id: 2, author: "Hussein", text: "Loved the quality, worth the price!" }
      ]
    },
    {
      id: 2,
      name: "Adidas T-Shirt",
      price: 40,
      description: "Comfortable sports t-shirt.",
      image: "/assets/images/adidas-shirt.jpg",
      availableQuantity: 5,  // كمية المنتج المتاحة
      reviews: []
    },
    {
      id: 3,
      name: "Rugby Ball",
      price: 25,
      description: "Durable and high-quality rugby ball.",
      image: "/assets/images/rugby ball.jpg",
      availableQuantity: 8,  // كمية المنتج المتاحة
      reviews: []
    },
    {
      id: 4,
      name: "Tennis Racket",
      price: 35,
      description: "Professional tennis racket.",
      image: "/assets/images/tennis racket.jpg",
      availableQuantity: 3,  // كمية المنتج المتاحة
      reviews: []
    },
    {
      id: 5,
      name: "Puma Hat",
      price: 25,
      description: "Trendy Puma cap for casual wear.",
      image: "/assets/images/puma hat.jpg",
      availableQuantity: 20,  // كمية المنتج المتاحة
      reviews: []
    },
    {
      id: 6,
      name: "Basketball",
      price: 95,
      description: "Official size basketball for games.",
      image: "/assets/images/basketball.jpg",
      availableQuantity: 15,  // كمية المنتج المتاحة
      reviews: []
    }
  ];

  const product = products.find((p) => p.id === parseInt(productId));
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [newReview, setNewReview] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [quantity, setQuantity] = useState(1); // الكمية المبدئية

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    // إضافة المنتج إلى السلة مع الكمية المحددة
    navigate("/cart", { state: { cart: [{ ...product, quantity }] } });
  };

  const handleAddReview = () => {
    if (newReview.trim() && reviewAuthor.trim()) {
      const newReviewObj = {
        id: reviews.length + 1,
        author: reviewAuthor,
        text: newReview
      };
      setReviews((prevReviews) => [...prevReviews, newReviewObj]);
      setNewReview("");
      setReviewAuthor("");
      setSuccessMessage("Your review has been added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // إخفاء الرسالة بعد 3 ثوانٍ
    } else {
      setSuccessMessage("Please provide both your name and review text.");
      setTimeout(() => setSuccessMessage(""), 3000); // إخفاء الرسالة بعد 3 ثوانٍ
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: "300px", display: "block", marginBottom: "20px" }}
      />
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>

      {/* حقل تحديد الكمية مع الحد الأقصى من الكمية المتاحة */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="quantity" style={{ marginRight: "10px" }}>Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.min(product.availableQuantity, Math.max(1, e.target.value)))}
          min="1"
          max={product.availableQuantity} // الحد الأقصى للكمية المتاحة
          style={{
            padding: "5px",
            width: "60px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <p>Available Quantity: {product.availableQuantity}</p> {/* عرض الكمية المتاحة */}
      </div>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>

      <div style={{ marginTop: "30px" }}>
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li
                key={review.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              >
                <strong>{review.author}:</strong> {review.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        <div style={{ marginTop: "20px" }}>
          <h3>Add a Review</h3>
          {successMessage && (
            <p style={{ color: successMessage.includes("added") ? "green" : "red" }}>
              {successMessage}
            </p>
          )}
          <input
            type="text"
            value={reviewAuthor}
            onChange={(e) => setReviewAuthor(e.target.value)}
            placeholder="Your name"
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
            style={{
              width: "100%",
              resize: "none",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          ></textarea>
          <button
            onClick={handleAddReview}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

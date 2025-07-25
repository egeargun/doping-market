import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
    return (
        <div className="product">
            <Link to={`/product-detail/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
            </Link>
            <p>{product.price} TL</p>
            <button onClick={() => addToCart(product.id)}>Sepete Ekle</button>
        </div>
    );
}

export default ProductCard;
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../App';

function ProductDetailPage() {
    const { products, addToCart, fetchProductsData } = useContext(ShopContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const productId = parseInt(id);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            setError(false);
            let currentProducts = products;
            if (currentProducts.length === 0) { // App.js'ten ürünler gelmediyse API'den tekrar çek
                try {
                    currentProducts = await fetchProductsData();
                } catch (err) {
                    console.error("Ürünler detay sayfası için çekilirken hata oluştu:", err);
                    setError(true);
                    setLoading(false);
                    return;
                }
            }

            const foundProduct = currentProducts.find(p => p.id === productId);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                setError(true);
            }
            setLoading(false);
        };

        getProduct();
    }, [id, products, fetchProductsData, productId, navigate]);


    if (loading) {
        return (
            <section id="product-detail-section">
                <p className="loading-message">Ürün detayları yükleniyor...</p>
            </section>
        );
    }

    if (error || !product) {
        return (
            <section id="product-detail-section">
                <p className="error-message">Ürün bulunamadı veya bir hata oluştu.</p>
                <button onClick={() => navigate('/')} className="back-to-products-btn">Ana Sayfaya Dön</button>
            </section>
        );
    }

    return (
        <section id="product-detail-section">
            <div className="product-detail-container">
                <img src={product.image} alt={product.name} className="detail-image" />
                <div className="detail-info">
                    <h2>{product.name}</h2>
                    <p className="detail-price">{product.price} TL</p>
                    <p className="detail-description">{product.description || 'Bu ürün hakkında açıklama bulunmamaktadır.'}</p>
                    <button onClick={() => addToCart(product.id)} className="add-to-cart-detail-btn">Sepete Ekle</button>
                    <button onClick={() => navigate(-1)} className="back-to-products-btn">Geri Dön</button>
                </div>
            </div>
        </section>
    );
}

export default ProductDetailPage;
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../App';
import ProductCard from '../components/ProductCard';


function HomePage() {
    const { products, fetchProductsData, addToCart } = useContext(ShopContext);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                if (products.length === 0) { // Ürünler App.js'ten gelmediyse yükle
                    await fetchProductsData();
                }
            } catch (error) {
                console.error("Ürünler yüklenirken hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        if (products.length > 0) { // Ürünler zaten yüklü ise yükleniyor durumunu kapat
            setLoading(false);
        } else {
            getProducts(); // Değilse yüklemeyi başlat
        }
    }, [products, fetchProductsData]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredProducts(products);
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const newFilteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(lowercasedSearchTerm) ||
                product.description.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredProducts(newFilteredProducts);
        }
    }, [searchTerm, products]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return (
            <section id="products-section">
                <h2>Ürünler</h2>
                <div id="product-list">
                    <p className="loading-message">Ürünler yükleniyor...</p>
                </div>
            </section>
        );
    }

    if (products.length === 0 && !loading) {
        return (
            <section id="products-section">
                <h2>Ürünler</h2>
                <div id="product-list">
                    <p className="error-message">Gösterilecek ürün bulunamadı.</p>
                </div>
            </section>
        );
    }

    return (
        <div className="container">
            <section id="products-section">

                <h2>Ürünler</h2>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <div id="product-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} addToCart={addToCart} />
                        ))
                    ) : (
                        <p className="no-results-message">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                    )}
                </div>
            </section>
        </div>

    );
}

export default HomePage;
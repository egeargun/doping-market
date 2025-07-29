import React, { useContext, useState } from 'react';
import { ShopContext } from '../App';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const { cart, setCart, showMessage } = useContext(ShopContext);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');

    const totalOrderPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!fullName || !address || !city || !postalCode || !phone) {
            showMessage("Lütfen tüm teslimat bilgilerini doldurun.", 'error');
            return;
        }
        if (cart.length === 0) {
            showMessage("Sepetiniz boş olduğu için sipariş verilemez.", 'error');
            return;
        }

        const orderId = Date.now();
        const newOrder = {
            orderId: orderId,
            timestamp: new Date().toLocaleString(),
            customerInfo: { fullName, address, city, postalCode, phone },
            items: cart,
            totalPrice: totalOrderPrice
        };

        let allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        allOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(allOrders));

        setCart([]); // Sepeti boşalt
        showMessage("Siparişiniz başarıyla alındı! Teşekkür ederiz.", 'success');

        setTimeout(() => {
            navigate('/'); // Ana sayfaya yönlendir
        }, 3000);
    };

    return (
        <section id="checkout-section">
            <h2>Siparişi Tamamla</h2>
            <form onSubmit={handleSubmit}>
                <h3>Teslimat Bilgileri</h3>
                <div className="form-group">
                    <label htmlFor="fullName">Ad Soyad:</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Adres:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Şehir:</label>
                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Posta Kodu:</label>
                    <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefon:</label>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <h3>Sipariş Özeti</h3>
                <ul id="checkout-cart-summary" style={{ listStyle: 'none', padding: 0 }}>
                    {cart.length === 0 ? <p>Sepetiniz boş.</p> : (
                        cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <span>{item.name} x{item.quantity}</span>
                                <span>{item.price * item.quantity} TL</span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="cart-summary">
                    <span>Toplam:</span> <span id="checkout-total">{totalOrderPrice}</span> TL
                </div>
                <button type="submit" className="place-order-button" disabled={cart.length === 0}>Siparişi Onayla</button>
            </form>
        </section>
    );
}

export default CheckoutPage;
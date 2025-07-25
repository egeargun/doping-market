import React, { useContext, useCallback } from 'react'; // useCallback eklendi
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../App';

function CartPage() {
    // Context'ten gerekli değerleri alıyoruz
    const { cart, removeFromCart, changeQuantity, showMessage, setCart } = useContext(ShopContext);
    const navigate = useNavigate();

    // Sepet toplamını ve ürün sayısını hesaplıyoruz
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Ödeme butonuna tıklandığında çalışacak fonksiyon
    // useCallback ile sarmaladık, bağımlılıkları doğru belirledik
    const handleCheckoutClick = useCallback(() => {
        if (cart.length === 0) {
            showMessage("Sepetiniz boş olduğu için ödeme yapılamaz.", 'error');
        } else {
            navigate('/checkout'); // Ödeme sayfasına yönlendir
        }
    }, [cart, showMessage, navigate]); // Bağımlılıklar: cart, showMessage, navigate

    return (
        <section id="cart-section-page">
            <h2>Sepetim ({cartCount})</h2>
            <ul id="cart-items" style={{ listStyle: 'none', padding: 0 }}>
                {cart.length === 0 ? (
                    // Sepet boşsa gösterilecek mesaj
                    <p>Sepetinizde ürün bulunmamaktadır.</p>
                ) : (
                    // Sepette ürün varsa her birini listele
                    cart.map(item => (
                        <li key={item.id} className="cart-item">
                            <span>{item.name} x{item.quantity}</span>
                            <span>{item.price * item.quantity} TL</span>
                            <div className="quantity-buttons">
                                <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                                <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)}>Sil</button>
                        </li>
                    ))
                )}
            </ul>
            <div className="cart-summary">
                <span>Toplam:</span> <span id="cart-total">{total}</span> TL
            </div>
            <button className="checkout-button" onClick={handleCheckoutClick}>Ödeme Yap</button>
        </section>
    );
}

export default CartPage;
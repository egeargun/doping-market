import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../App';

function LoginPage() {
    const { showMessage } = useContext(ShopContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email === "test@example.com" && password === "password123") {
            showMessage("Giriş başarılı!", 'success');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            showMessage("Hatalı e-posta veya şifre. Lütfen tekrar deneyin.", 'error');
        }
    };

    return (
        <section className="auth-section">
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="login-email">E-posta:</label>
                    <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Şifre:</label>
                    <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Giriş Yap</button>
            </form>
            <p>Hesabın yok mu? <Link to="/register">Kayıt Ol</Link></p>
        </section>
    );
}

export default LoginPage;
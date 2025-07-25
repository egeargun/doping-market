import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../App';

function RegisterPage() {
    const { showMessage } = useContext(ShopContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Kayıt Bilgileri:", { username, email, password });
        showMessage("Kayıt başarılı! Şimdi giriş yapabilirsiniz.", 'success');
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <section className="auth-section">
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="register-username">Kullanıcı Adı:</label>
                    <input type="text" id="register-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="register-email">E-posta:</label>
                    <input type="email" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Şifre:</label>
                    <input type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Kayıt Ol</button>
            </form>
            <p>Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link></p>
        </section>
    );
}

export default RegisterPage;
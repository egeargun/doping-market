import React, { useState, useEffect, createContext, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';

import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';

import MessageArea from './components/MessageArea';
import { useTheme } from './ThemeContext'; // useTheme hook'unu import ediyoruz

const fetchProductsData = async () => {
  console.log("Ürünler yükleniyor...");
  return new Promise(resolve => {
    setTimeout(() => {
      const fetchedProducts = [
        { id: 1, name: "Tişört Basic", price: 500, image: "https://static.ticimax.cloud/61950/uploads/urunresimleri/buyuk/regular-tshirt-b345-f.jpg", description: "Yüksek kaliteli pamuklu tişört, günlük kullanım için idealdir." },
        { id: 2, name: "Pantolon Jean", price: 1200, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87010272_TM_B.jpg?imwidth=2048&imdensity=1&ts=1729076664472", description: "Rahat kesim, dayanıklı kumaştan yapılmış modern jean pantolon." },
        { id: 3, name: "Ayakkabı Sneaker", price: 4750, image: "https://minio.yalispor.com.tr/sneakscloud/images/nike-w-court-vision-lo-nn-kadin-spor-ayakkabi-beyaz-6-1-1724306135.jpg", description: "Konforlu ve şık günlük kullanım spor ayakkabısı." },
        { id: 4, name: "Ceket Spor", price: 3500, image: "https://004406.cdn.akinoncloud.com/products/2023/01/17/438082/a94e9308-7627-4479-bd76-c0001e85535f_quality90.jpg", description: "Su geçirmez ve rüzgar kesen, modern tasarımlı dış giyim ceketi." },
        { id: 5, name: "Şapka Yazlık", price: 250, image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/3384/uploads/urunresimleri/buyuk/n041.des.prktk.s.-1bb3-4.jpg", description: "Yazlık, nefes alabilen kumaştan şık şapka." },
        { id: 6, name: "Kazak Triko", price: 850, image: "https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77016751_56_B.jpg?imwidth=2048&imdensity=1&ts=1725982463900", description: "Sıcak tutan yün karışımı, kışlık kazak." },
        { id: 7, name: "Elbise Midi", price: 1000, image: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17091177_99_B.jpg?imwidth=2048&imdensity=1&ts=1744274122479", description: "Özel günler için zarif tasarım midi elbise." },
        { id: 8, name: "Çanta Omuz", price: 900, image: "https://www.getchostore.com/cdn/shop/products/vidar-kadin-cantasi-vr1505-38335.jpg?v=1671178177", description: "Günlük kullanıma uygun, geniş iç hacimli omuz çantası." },
        { id: 9, name: "Gözlük Güneş", price: 600, image: "https://cdn.myikas.com/images/d6f9ffbc-eaac-4c23-84c6-530a77d57b55/6d9e869d-99a0-496f-8558-f6024f31e627/3840/gozluk-1-aci-2.webp", description: "UV korumalı, modern tasarımlı güneş gözlüğü." },
        { id: 10, name: "Etek Pileli", price: 875, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87097700_52_B.jpg?imwidth=2048&imdensity=1&ts=1742546130404", description: "Şık ve rahat, her mevsime uygun pileli etek." },
        { id: 11, name: "Tişört V Yaka", price: 550, image: "https://witcdn.sarar.com/sarar-v-yaka-tisort-15820-v-yaka-tisort-sarar-41051-15-B.jpg", description: "Yumuşak pamuklu V yaka tişört." },
        { id: 12, name: "Pantolon Kargo", price: 1350, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87016359_95_B.jpg?imwidth=2048&imdensity=1&ts=1740597166999", description: "Dayanıklı kargo pantolon, çok cepli." },
        { id: 13, name: "Ayakkabı Klasik", price: 5200, image: "https://akn-desa.a-cdn.akinoncloud.com/products/2024/11/18/265348/60fdeb10-8eb2-48a3-81b3-a5433b14b4af_size1500x1500_quality100_cropCenter.jpg", description: "Resmi günler için klasik deri ayakkabı." },
        { id: 14, name: "Ceket Deri", price: 8000, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87010586_99_B.jpg?imwidth=2048&imdensity=1&ts=1727687075446", description: "Şık ve dayanıklı gerçek deri ceket." },
        { id: 15, name: "Atkı Yün", price: 300, image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/10821/uploads/urunresimleri/buyuk/vizon-yun-atki--b9d7-.jpg", description: "Soğuk havalar için yumuşak yün atkı." },
        { id: 16, name: "Bere Örgü", price: 180, image: "https://8f7eaa.a-cdn.akinoncloud.com/products/2024/11/05/699340/27b7c02a-7952-43fc-ac30-e371f1108761_size780x1186_cropCenter.jpg", description: "Kışlık sıcak tutan örgü bere." },
        { id: 17, name: "Eldiven Deri", price: 400, image: "https://cdn.beymen.com/mnresize/505/704/productimages/tc0fiaco.mvh_IMG_01_2110083466087.jpg", description: "Motor sürüşü veya soğuk havalar için deri eldiven." },
        { id: 18, name: "Şort Denim", price: 650, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87017174_TC_B.jpg?imwidth=2048&imdensity=1&ts=1741172911675", description: "Yazlık rahat denim şort." },
        { id: 19, name: "Mayo Erkek", price: 800, image: "https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77010642_12_B.jpg?imwidth=2048&imdensity=1&ts=1715618257090", description: "Yüzme için hızlı kuruyan erkek mayosu." },
        { id: 20, name: "Mayo Kadın", price: 550, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87075959_70_B.jpg?imwidth=2048&imdensity=1&ts=1737018285216", description: "Plaj için şık tek parça kadın mayosu." },
        { id: 21, name: "Pijama Takımı", price: 700, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87055916_56_B.jpg?imwidth=2048&imdensity=1&ts=1735572871111", description: "Konforlu uyku için pamuklu pijama takımı." },
        { id: 22, name: "Çorap Seti", price: 120, image: "https://a53e12.a-cdn.akinoncloud.com/products/2024/03/01/646421/4ee12afb-d2b0-4369-89eb-8e362f3b7779_size500x650_cropCenter.jpg", description: "Yedili pamuklu çorap seti." },
        { id: 23, name: "Kemer Deri", price: 380, image: "https://www.maleindustry.com.tr/SFolder/ProductImages/kemer-male-industry-kemer-3500-aksesuar240_1317_R5.jpg", description: "Günlük kullanım için şık deri kemer." },
        { id: 24, name: "Şal Desenli", price: 280, image: "https://www.ipekevi.com/parsel-desenli-ipek-sal-model-15-0507900000015-cizgili-ipekevi-20454-33-K.jpg", description: "Çok amaçlı desenli şal." },
        { id: 25, name: "Gömlek Beyaz", price: 750, image: "https://www.wiouniform.com.tr/idea/cy/17/myassets/products/771/61ggnkxf38l-ul1500.jpg?revision=1722499240", description: "Klasik kesim beyaz pamuklu gömlek." },
        { id: 26, name: "Eşofman Altı", price: 600, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWZ6iv9fxWg1yhUpmgk_PePAXTtLwnrcIDMA&s", description: "Spor ve günlük kullanım için rahat eşofman altı." },
        { id: 27, name: "Hoodie Siyah", price: 1700, image: "https://cdn.dsmcdn.com/mnresize/420/620/ty1617/prod/QC/20241226/08/13ce8be4-9d2f-3c70-b4bd-95d8bd6aa9be/1_org.jpg", description: "Kapüşonlu siyah hoodie." },
        { id: 28, name: "Sweatshirt Gri", price: 800, image: "https://cdn.myikas.com/images/744622c2-42d2-4a67-ad4c-664c56b07c71/e19c41dc-9c98-4188-a3e9-651a212e6bc7/3840/aw25-25-0737.webp", description: "Rahat ve şık gri sweatshirt." },
        { id: 29, name: "Hırka Örgü", price: 780, image: "https://ktnimg2.mncdn.com/products/2023/09/26/2817107/85a93616-0c0c-45a5-8c6c-6a61716a9b59_size870x1142.jpg", description: "Soğuk havalar için örgü hırka." },
        { id: 30, name: "Blazer Ceket", price: 2500, image: "https://witcdn.sarar.com/jam-blazer-ceket-13662-blazer-ceket-sarar-34512-13-B.jpg", description: "İş ve özel günler için şık blazer ceket." },
        { id: 31, name: "Jean Ceket", price: 1800, image: "https://cansinmini.com/img/l/7/mavi-dugmeli-erkek-cocuk-kot-ceket-15525-31043.jpg", description: "Klasik kesim jean ceket." },
        { id: 32, name: "Kot Etek", price: 720, image: "https://cdn.myikas.com/images/88a70526-c63f-4cb3-806e-203ae3e453ee/ce34908f-d40c-4000-9824-8b1099c8171b/3840/img-6751.webp", description: "Modern tasarımlı kot etek." },
        { id: 33, name: "Kısa Kol Tişört", price: 400, image: "https://nobero.com/cdn/shop/files/og.jpg?v=1744007258", description: "Yazlık, nefes alabilen kısa kol tişört." },
        { id: 34, name: "Uzun Kol Tişört", price: 580, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlckETrNbdTSDA3XV-2eFjC59eHjkpImhTUQ&s", description: "Mevsimlik uzun kol tişört." },
        { id: 35, name: "Kapüşonlu Ceket", price: 1600, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87043287_07_B.jpg?imwidth=2048&imdensity=1&ts=1730734450365", description: "Soğuktan koruyan kapüşonlu ceket." },
        { id: 36, name: "Polar Ceket", price: 950, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVgisoCAYFnEjnKAh6oJvAyA10mUkz0TjXXQ&s", description: "Hafif ve sıcak tutan polar ceket." },
        { id: 37, name: "Yelek", price: 600, image: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17073270_56_B.jpg?imwidth=2048&imdensity=1&ts=1745417122481", description: "Tarz sahibi yelek." },
        { id: 38, name: "Tayt", price: 450, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87080624_99_B.jpg?imwidth=2048&imdensity=1&ts=1728394454652", description: "Spor ve günlük kullanım için rahat tayt." },
        { id: 39, name: "Spor Sütyeni", price: 300, image: "https://www.tchibo.com.tr/newmedia/art_img/MAIN_ALT_1-CENSHARE/ad9af71c6c7c7857/.jpg", description: "Antrenmanlar için destekleyici spor sütyeni." },
        { id: 40, name: "Eşofman Takımı", price: 1100, image: "https://cdn03.ciceksepeti.com/cicek/kcm38577642-1/M/fifty-color-unisex-yeni-sezon-yazlik-baskili-sort-tshirt-esofman-alti-3lu-set-kombin-kcm38577642-1-ea694781be3d4560a45e14fb8f5f8297.jpg", description: "Tam eşofman takımı." },
        { id: 41, name: "Şort Kumaş", price: 500, image: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17091187_30_B.jpg?imwidth=2048&imdensity=1&ts=1743696329405", description: "Yazlık, hafif kumaş şort." },
        { id: 42, name: "Uzun Etek", price: 980, image: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17073274_52_B.jpg?imwidth=2048&imdensity=1&ts=1746624918037", description: "Şık uzun etek." },
        { id: 43, name: "Kısa Elbise", price: 1250, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87099208_99_B.jpg?imwidth=2048&imdensity=1&ts=1737637481835", description: "Yazlık, hafif kısa elbise." },
        { id: 44, name: "Tulum", price: 1700, image: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17093299_43_B.jpg?imwidth=2048&imdensity=1&ts=1747218910407", description: "Tek parça şık tulum." },
        { id: 45, name: "Ceket Bomber", price: 2800, image: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17005145_99_B.jpg?imwidth=2048&imdensity=1&ts=1746700494034", description: "Modern bomber ceket." },
        { id: 46, name: "Trençkot", price: 3200, image: "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87086343_08_B.jpg?imwidth=2048&imdensity=1&ts=1738242303653", description: "Klasik trençkot." },
        { id: 47, name: "Parfüm Seti", price: 3675, image: "https://static.ticimax.cloud/4183/uploads/urunresimleri/buyuk/siyah-shower-jel-krem-parfum-seti-100--53fc-4.jpg", description: "Özel parfüm seti." },
        { id: 48, name: "Saç Kurutma Makinesi", price: 2400, image: "https://cdn.cimri.io/image/1200x1200/powertec-tr-601-siyah-sac-kurutma-makinesi_562866173.jpg", description: "Güçlü saç kurutma makinesi." },
        { id: 49, name: "Akıllı Saat", price: 14500, image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s10-case-unselect-gallery-1-202503_GEO_TR_FMT_WHH?wid=752&hei=720&fmt=jpeg&qlt=90&.v=1740185545743", description: "Adım sayar ve kalp atışı ölçer akıllı saat." },
        { id: 50, name: "Kablosuz Kulaklık", price: 10000, image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836", description: "Yüksek ses kaliteli kablosuz kulaklık." }
      ];
      resolve(fetchedProducts);
    }, 1000);
  });
};

export const ShopContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const loadCartFromLocalStorage = useCallback(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try { return JSON.parse(savedCart); } catch (e) {
        console.error("Sepet verileri LocalStorage'dan yüklenirken hata oluştu, sepet sıfırlanıyor:", e);
        return [];
      }
    }
    return [];
  }, []);

  const saveCartToLocalStorage = useCallback((currentCart) => {
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }, []);

  const showMessage = useCallback((msg, type = 'success') => {
    setMessage({ text: msg, type: type });
    setTimeout(() => setMessage(null), 3000);
  }, []);

  const addToCart = useCallback((productId) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (product) {
      if (cartItem) {
        setCart(prevCart => {
          const updatedCart = prevCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
          saveCartToLocalStorage(updatedCart);
          return updatedCart;
        });
      } else {
        setCart(prevCart => {
          const updatedCart = [...prevCart, { ...product, quantity: 1 }];
          saveCartToLocalStorage(updatedCart);
          return updatedCart;
        });
      }
      showMessage("Ürün sepete eklendi!");
    } else {
      showMessage("Ürün bulunamadı veya geçersiz ID!", 'error');
    }
  }, [products, cart, saveCartToLocalStorage, showMessage]);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
    showMessage("Ürün sepetten kaldırıldı!");
  }, [saveCartToLocalStorage, showMessage]);

  const changeQuantity = useCallback((productId, delta) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + delta } : item
      ).filter(item => item.quantity > 0);

      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  }, [saveCartToLocalStorage]);

  useEffect(() => {
    fetchProductsData().then(data => {
      setProducts(data);
    });
    const loadedCart = loadCartFromLocalStorage();
    setCart(loadedCart);
  }, [loadCartFromLocalStorage]);

  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, [cart]);


  return (
    <ShopContext.Provider value={{ products, cart, addToCart, removeFromCart, changeQuantity, showMessage, setCart, fetchProductsData, navigate }}>
      <div className="App">
        <header className="main-header">
          <div className="header-brand">
            <Link to="/">
              <img src="images/doplogo.png" alt="Doping Market Logo" className="site-logo" />
              <h1>Doping Market</h1>
            </Link>
          </div>
          <nav>
            <Link to="/">Ürünler</Link>
            <Link to="/cart">Sepetim (<span id="cart-count-nav">{cartCount}</span>)</Link>
            <Link to="/login">Giriş Yap</Link>
            <Link to="/register">Kayıt Ol</Link>
          </nav>
        </header>

        {message && (
          <MessageArea message={message.text} type={message.type} />
        )}

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product-detail/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<section style={{ textAlign: 'center', padding: '50px', fontSize: '1.5em', color: '#e74c3c' }}><h2>404 - Sayfa Bulunamadı</h2><p>Aradığınız sayfa mevcut değil.</p><Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Ana Sayfaya Dön</Link></section>} />
          </Routes>
        </div>
      </div>
    </ShopContext.Provider>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPoints } from '../../redux/scoreSlice';
import './MarketPage.css';

const MarketPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const scores = useSelector((state) => state.scores.players);
    const [selectedUser, setSelectedUser] = useState(null);
    const [purchases, setPurchases] = useState([]);

    const users = [
        { id: 1, name: 'Emin', email: 'emin@example.com' },
        { id: 2, name: 'Irfan', email: 'irfan@example.com' },
        { id: 3, name: 'Mehmet', email: 'mehmet@example.com' },
    ];

    const products = [
        { id: 1, name: 'Çay', price: 50, image: '🍵' },
        { id: 2, name: 'Kahve', price: 100, image: '☕' },
        { id: 3, name: 'Bira', price: 150, image: '🍺' },
        { id: 4, name: 'Cips', price: 75, image: '🥔' },
    ];

    useEffect(() => {
        if (selectedUser) {
            const savedPurchases = localStorage.getItem(`userPurchases_${selectedUser.email}`);
            if (savedPurchases) {
                setPurchases(JSON.parse(savedPurchases));
            } else {
                setPurchases([]);
            }
        }
    }, [selectedUser]);

    const handlePurchase = (product) => {
        if (!selectedUser) {
            alert('Lütfen önce bir kullanıcı seçin!');
            return;
        }

        const userScore = scores[selectedUser.name] || 0;

        if (userScore >= product.price) {
            const newPurchases = [...purchases, {
                ...product,
                purchaseDate: new Date().toISOString()
            }];

            setPurchases(newPurchases);
            dispatch(addPoints({ player: selectedUser.name, points: -product.price }));

            // LocalStorage'a kaydet
            localStorage.setItem(`userPurchases_${selectedUser.email}`, JSON.stringify(newPurchases));

            alert(`${product.name} başarıyla satın alındı!`);
        } else {
            alert('Yetersiz puan!');
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    const toggleUserSelection = (user) => {
        if (selectedUser?.id === user.id) {
            setSelectedUser(null);
            setPurchases([]);
        } else {
            setSelectedUser(user);
        }
    };

    return (
        <div className="market-container">
            <div className="market-header">
                <h1>Market</h1>
                <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
            </div>

            <div className="users-section">
                <h2>Kullanıcılar</h2>
                <div className="users-grid">
                    {users.map((user) => (
                        <div 
                            key={user.id} 
                            className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                            onClick={() => toggleUserSelection(user)}
                        >
                            <h3>{user.name}</h3>
                            <p>Puan: {scores[user.name] || 0}</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedUser && (
                <>
                    <div className="user-info">
                        <h2>Seçili Kullanıcı: {selectedUser.name}</h2>
                        <p>Mevcut Puanınız: {scores[selectedUser.name] || 0}</p>
                    </div>

                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">{product.image}</div>
                                <h3>{product.name}</h3>
                                <p>{product.price} Puan</p>
                                <button 
                                    onClick={() => handlePurchase(product)}
                                    disabled={(scores[selectedUser.name] || 0) < product.price}
                                    className={(scores[selectedUser.name] || 0) < product.price ? 'disabled' : ''}
                                >
                                    Satın Al
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="purchase-history">
                        <h2>Satın Alma Geçmişi</h2>
                        {purchases.length > 0 ? (
                            <div className="purchases-list">
                                {purchases.map((purchase, index) => (
                                    <div key={index} className="purchase-item">
                                        <span>{purchase.image}</span>
                                        <span>{purchase.name}</span>
                                        <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Henüz satın alma yapılmadı.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MarketPage; 
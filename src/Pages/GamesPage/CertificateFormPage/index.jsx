import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './CertificateFormPage.module.css';

const CertificateFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game } = location.state || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        navigate('/thanks', { state: { game } });
    };

    return (
        <div className={styles.container}>
            {/* Передаем hideStats=true чтобы скрыть статистику */}
            <GamesMenu activeGame={game} hideStats={true} />

            <div className={styles.content}>
                <h2 className={styles.title}>
                    Введите свое имя и адрес электронной почты, <br /> чтобы получить грамоту участника
                </h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>ваше имя</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Отправить
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CertificateFormPage;

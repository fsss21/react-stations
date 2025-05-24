import styles from './Historical.module.css';
import { useNavigate } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HistoricalPage = () => {
    const navigate = useNavigate();

    const handleRudolfClick = () => {
        navigate('/rudolf');
    };

    const handleQuietClick = () => {
        navigate('/quiet');
    };

    const handleBallClick = () => {
        navigate('/ball');
    };

    const handleWhiteClick = () => {
        navigate('/white');
    };

    const handleСheluskinClick = () => {
        navigate('/cheluskin');
    };

    const handleNorthClick = () => {
        navigate('/north');
    };

    const handleSchmidtClick = () => {
        navigate('/schmidt');
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.rudolf} onClick={handleRudolfClick}></div>
                <div className={styles.quiet} onClick={handleQuietClick}></div>
                <div className={styles.ball} onClick={handleBallClick}></div>
                <div className={styles.white} onClick={handleWhiteClick}></div>
                <div className={styles.cheluskin} onClick={handleСheluskinClick}></div>
                <div className={styles.north} onClick={handleNorthClick}></div>
                <div className={styles.schmidt} onClick={handleSchmidtClick}></div>
                <Footer />
            </div>
        </>
    );
};

export default HistoricalPage;

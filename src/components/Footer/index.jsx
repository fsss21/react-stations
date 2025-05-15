import { Link, useLocation } from 'react-router';

import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './Footer.module.css';

const Footer = () => {
    const location = useLocation();
    const isMainPage = location.pathname === '/';

    return (
        <>
            <div className={styles.footer}>
                <Link to="/" className={styles.button_home}>
                    <HomeIcon style={{ width: '50px', height: '50px' }} />
                </Link>
                {!isMainPage && (
                    <Link to="/" className={styles.button_back}>
                        <ArrowBackIcon style={{ width: '50px', height: '50px' }} />
                    </Link>
                )}
            </div>
        </>
    );
};

export default Footer;

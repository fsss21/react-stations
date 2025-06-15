import { Link, useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './Footer.module.css';

const Footer = ({ link }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/main';
  const { isEnabled  } = useSelector(state => state.accessibility);


  const baseClass = styles.button_footer;
  const mainPageClass = isMainPage ? styles.button_footer_main : '';
  const enabledClass = isEnabled ? styles.button_footer_enabled : '';


  return (
    <>
      <div className={styles.footer}>
        <Link to={isMainPage ? '/' : '/main'} className={`${baseClass} ${mainPageClass} ${enabledClass}`}>
           {isEnabled ? (
          'ДОМОЙ'
        ) : (
          <HomeIcon style={{ width: '50px', height: '50px' }} />
        )}
        </Link>
        {!isMainPage && (
          <Link onClick={() => navigate(-1)} className={`${baseClass} ${mainPageClass} ${enabledClass}`}>
            {isEnabled ? ( 'НАЗАД' ) : ( <ArrowBackIcon style={{ width: '50px', height: '50px' }} /> ) }
          </Link>
        )}
      </div>
    </>
  );
};

export default Footer;

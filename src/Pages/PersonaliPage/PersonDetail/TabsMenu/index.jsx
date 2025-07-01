import styles from './TabsMenu.module.css';
import { useSelector } from 'react-redux';

const TabsMenu = ({ tabs, activeTab, onTabChange }) => {
     const { isEnabled } = useSelector((state) => state.accessibility);
    return (
        <div className={styles.buttons}>
            {tabs.map(tab => (
                <button key={tab.key} className={`${styles.button} ${activeTab === tab.key ? (isEnabled ? styles.enabledActive : styles.active)  : ''}`} onClick={() => onTabChange(tab.key)}>
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabsMenu;

import styles from './TabsMenu.module.css';

const TabsMenu = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className={styles.buttons}>
            {tabs.map(tab => (
                <button key={tab.key} className={`${styles.button} ${activeTab === tab.key ? styles.active : ''}`} onClick={() => onTabChange(tab.key)}>
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabsMenu;

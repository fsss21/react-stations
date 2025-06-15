import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AccessibilityHandler = () => {
    const { isEnabled, colorScheme, schemes } = useSelector(state => state.accessibility);

    useEffect(() => {
        if (isEnabled && colorScheme !== 'default') {
            const [bgColor, textColor] = schemes[colorScheme];

            // Применяем цветовую схему к корневому элементу
            document.documentElement.style.setProperty('--accessibility-bg', bgColor);
            document.documentElement.style.setProperty('--accessibility-text', textColor);
            document.documentElement.classList.add('accessibility-enabled');
        } else {
            document.documentElement.style.removeProperty('--accessibility-bg');
            document.documentElement.style.removeProperty('--accessibility-text');
            document.documentElement.classList.remove('accessibility-enabled');
        }
    }, [isEnabled, colorScheme, schemes]);

    return null;
};

export default AccessibilityHandler;

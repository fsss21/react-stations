import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './CertificateFormPage.module.css';

const CertificateFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game } = location.state || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [activeInput, setActiveInput] = useState(null);
    const keyboardRef = useRef(null);

    // Конфигурация клавиатуры
    const keyboardOptions = {
        layout: {
            default: ['й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'я ч с м и т ь б ю . {bksp}', '{shift} / - , : ! ? {space}', '{numbers} @ .com .ru'],
            shift: ['Й Ц У К Е Н Г Ш Щ З Х Ъ', 'Ф Ы В А П Р О Л Д Ж Э', 'Я Ч С М И Т Ь Б Ю . {bksp}', '{shift} / - , : ! ? {space}', '{numbers} @ .com .ru'],
            numbers: ['1 2 3', '4 5 6', '7 8 9', '{abc} 0 {bksp}'],
        },
        display: {
            '{numbers}': '123',
            '{shift}': '⇧',
            '{bksp}': '⌫',
            '{space}': 'Пробел',
            '{abc}': 'АБВ',
            '.com': '.com',
            '.ru': '.ru',
        },
        theme: 'hg-theme-default hg-layout-default',
        physicalKeyboardHighlight: true,
        syncInstanceInputs: true,
        mergeDisplay: true,
    };

    const handleSubmit = e => {
        e.preventDefault();
        navigate('/thanks', { state: { game } });
    };

    // Обработчики фокуса для полей ввода
    const handleFocus = inputName => {
        setActiveInput(inputName);
        if (keyboardRef.current) {
            keyboardRef.current.setInput(inputName === 'name' ? name : email);
        }
    };

    // Обработчик изменений клавиатуры
    const handleKeyboardChange = input => {
        if (activeInput === 'name') {
            setName(input);
        } else if (activeInput === 'email') {
            setEmail(input);
        }
    };

    // Обработчик специальных клавиш
    const handleKeyboardKeyPress = button => {
        if (button === '{shift}' || button === '{numbers}') return;

        // Обработка спец.команд для email
        if (activeInput === 'email') {
            if (button === '.com') {
                setEmail(prev => prev + '.com');
                return;
            }
            if (button === '.ru') {
                setEmail(prev => prev + '.ru');
                return;
            }
        }
    };

    // Синхронизация состояния с клавиатурой
    useEffect(() => {
        if (!keyboardRef.current) return;

        if (activeInput === 'name') {
            keyboardRef.current.setInput(name);
        } else if (activeInput === 'email') {
            keyboardRef.current.setInput(email);
        }
    }, [name, email, activeInput]);

    return (
        <div className={styles.container}>
            <GamesMenu activeGame={game} hideStats={true} />

            <div className={styles.content}>
                <h2 className={styles.title}>
                    Введите свое имя и адрес электронной почты, <br />
                    чтобы получить грамоту участника
                </h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>ваше имя</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} onFocus={() => handleFocus('name')} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => handleFocus('email')} required />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Отправить
                    </button>
                </form>
            </div>

            {/* Виртуальная клавиатура */}
            <div className={styles.keyboardWrapper}>
                <Keyboard
                    keyboardRef={r => (keyboardRef.current = r)}
                    {...keyboardOptions}
                    onChange={handleKeyboardChange}
                    onKeyPress={handleKeyboardKeyPress}
                    buttonTheme={[
                        {
                            class: `${styles.keyboardDefaultBtn} hg-button hg-standardBtn`, // Добавлены обязательные классы
                            buttons: 'Й Ц У К Е Н Г Ш Щ З Х Ъ Ф Ы В А П Р О Л Д Ж Э Я Ч С М И Т Ь Б Ю',
                        },
                        {
                            class: `${styles.keyboardDeleteBtn} hg-button hg-button-bksp`, // Добавлены обязательные классы
                            buttons: '{bksp}',
                        },
                    ]}
                    theme={`hg-theme-default ${styles.keyboardTheme}`}
                />
            </div>

            <Footer />
        </div>
    );
};

export default CertificateFormPage;

import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './CertificateFormPage.module.css';

import { useSelector } from 'react-redux';

const CertificateFormPage = () => {
    const { isEnabled } = useSelector((state) => state.accessibility);
    const location = useLocation();
    const navigate = useNavigate();
    const { game } = location.state || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [activeInput, setActiveInput] = useState(null);
    const [keyboardState, setKeyboardState] = useState({
        layout: 'default',
        language: 'ru', // 'ru' или 'en'
        shift: false
    });
    const [keyboardDisplay, setKeyboardDisplay] = useState({
        '{numbers}': '123',
        '{shift}': '⇧',
        '{bksp}': '⌫',
        '{space}': 'Пробел',
        '{abc}': 'АБВ',
        '{lang}': 'EN',
        '{left}': '←',
        '{right}': '→',
        '.com': '.com',
        '.ru': '.ru'
    });
    const keyboardRef = useRef(null);
    

    // Конфигурация клавиатуры
   const keyboardOptions = {
  layout: {
    default: [
      "й ц у к е н г ш щ з х ъ",
      "ф ы в а п р о л д ж э",
      "я ч с м и т ь б ю . {bksp}",
      "{shift} / - , : ! ? {space} {left} {right}",
      "{numbers} @ .com .ru {lang}"
    ],
    shift: [
      "Й Ц У К Е Н Г Ш Щ З Х Ъ",
      "Ф Ы В А П Р О Л Д Ж Э",
      "Я Ч С М И Т Ь Б Ю . {bksp}",
      "{shift} / - , : ! ? {space} {left} {right}",
      "{numbers} @ .com .ru {lang}"
    ],
    numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {bksp}", "{left} {right}"],
    english: [
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "z x c v b n m . {bksp}",
      "{shift} / - , : ! ? {space} {left} {right}",
      "{numbers} @ .com .ru {lang}"
    ],
    english_shift: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "Z X C V B N M . {bksp}",
      "{shift} / - , : ! ? {space} {left} {right}",
      "{numbers} @ .com .ru {lang}"
    ]
  },
  display: {
            ...keyboardDisplay,
            '{lang}': keyboardState.language === 'ru' ? 'EN' : 'RU'
        },
  theme: `hg-theme-default ${styles.keyboardTheme} ${isEnabled ? styles.keyboardTheme_enabled : ''}`,
  mergeDisplay: true,
  buttonTheme: [
    {
      class: `${styles.keyboardDefaultBtn} hg-button`,
      buttons: 'й ц у к е н г ш щ з х ъ ф ы в а п р о л д ж э я ч с м и т ь б ю Й Ц У К Е Н Г Ш Щ З Х Ъ Ф Ы В А П Р О Л Д Ж Э Я Ч С М И Т Ь Б Ю q w e r t y u i o p a s d f g h j k l z x c v b n m Q W E R T Y U I O P A S D F G H J K L Z X C V B N M'
    },
    {
      class: `${styles.keyboardDeleteBtn} hg-button`,
      buttons: '{bksp}'
    },
    {
      class: `${styles.keyboardAbcBtn} hg-button`,
      buttons: '/ - , : ! ? {right} {left} .ru {shift} {space} {numbers} @ .com {lang} 1 2 3 4 5 6 7 8 9 0 . {abc}'
    },
  ],
  preventInput: [
    
  ]
};



const handleKeyboardKeyPress = (button) => {
        // Переключение регистра
         if (button === '{shift}') {
    setKeyboardState(prev => {
        const newShift = !prev.shift;
        let newLayout = prev.layout;
        
        // Исправленные названия раскладок
        if (prev.layout === 'default') newLayout = newShift ? 'shift' : 'default';
        else if (prev.layout === 'english') newLayout = newShift ? 'english_shift' : 'english';
        else if (prev.layout === 'shift') newLayout = newShift ? 'shift' : 'default';
        else if (prev.layout === 'english_shift') newLayout = newShift ? 'english_shift' : 'english';
        
        return { ...prev, shift: newShift, layout: newLayout };
    });
    return;
}


  // Переключение на цифры
  if (button === '{numbers}') {
            setKeyboardState(prev => ({ ...prev, layout: 'numbers' }));
            return;
  }


  // Возврат к буквам
  if (button === '{abc}') {
            setKeyboardState(prev => ({
                ...prev,
                layout: prev.language === 'ru' ? 'default' : 'english',
                shift: false
            }));
            return;
        }

  // Переключение языков
  if (button === '{lang}') {
    setKeyboardState(prev => {
        const newLanguage = prev.language === 'ru' ? 'en' : 'ru';
        let newLayout = 'default';
        
        // Исправленные названия раскладок
        if (prev.layout === 'english' || prev.layout === 'english_shift') {
            newLayout = prev.shift ? 'shift' : 'default';
        } else {
            newLayout = prev.shift ? 'english_shift' : 'english';
        }
        
        return {
            ...prev,
            language: newLanguage,
            layout: newLayout
        };
    });
    return;
}

  // Навигация стрелками (только при активном вводе)
  if ((button === '{left}' || button === '{right}') && activeInput) {
    const input = activeInput === 'name' 
      ? document.querySelector(`.${styles.formGroup}:first-child input`)
      : document.querySelector(`.${styles.formGroup}:last-child input`);
    
    if (input) {
      try {
        const cursorPosition = input.selectionStart;
        const newPosition = button === '{left}' 
          ? Math.max(0, cursorPosition - 1) 
          : Math.min(input.value.length, cursorPosition + 1);
        
        input.setSelectionRange(newPosition, newPosition);
        input.focus();
      } catch (error) {
        console.error("Ошибка перемещения курсора:", error);
      }
    }
    return;
  }


        // Специальные команды для email
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
    const handleSubmit = e => {
        e.preventDefault();
        navigate('/thanks', { state: { game } });
    };

    // Обработчики фокуса для полей ввода
    const handleFocus = (inputName) => {
    setActiveInput(inputName);
    if (keyboardRef.current && keyboardRef.current.setInput) {
        keyboardRef.current.setInput(inputName === 'name' ? name : email);
    }
};

    // Обработчик изменений клавиатуры
    const handleKeyboardChange = (input) => {
        if (activeInput === 'name') {
            setName(input);
        } else if (activeInput === 'email') {
            setEmail(input);
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

    const basicSumbitButton = styles.submitButton;
    const enabledSumbitButton = isEnabled ? styles.submitButton_enabled : '';

    return (
        <section className={styles.container}>
            <GamesMenu activeGame={game} hideStats={true} />

            <div className={styles.content}>
                <span className={styles.title}>
                    Введите свое имя и адрес электронной почты, <br /> 
                    чтобы получить грамоту участника
                </span>
                
                <form className={styles.form} >
                    <div className={styles.formGroup}>
                        <label>ваше имя</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            onFocus={() => handleFocus('name')}
                            required 
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>e-mail</label>
                        <input 
                          type="text"
                          inputMode="email"
                          value={email} 
                          onChange={e => setEmail(e.target.value)}
                          onFocus={() => handleFocus('email')}
                          required 
                        />
                    </div>
                    
                </form>
                
            </div>

            {/* Виртуальная клавиатура */}
            <div className={styles.keyboardWrapper}>
            <Keyboard
              keyboardRef={r => (keyboardRef.current = r)}
              layoutName={keyboardState.layout}
              {...keyboardOptions}
              onChange={handleKeyboardChange}
              onKeyPress={handleKeyboardKeyPress}
            />
            </div>
            <button type="submit" onClick={handleSubmit} className={`${basicSumbitButton} ${enabledSumbitButton}`}>
                Отправить
            </button>
            <Footer />
        </section>
    );
};

export default CertificateFormPage;
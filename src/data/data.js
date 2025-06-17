import { ru } from './ru';
import { en } from './en';

export const translations = {
  ru: {
    ...ru,
    accessibilityToggle: 'Версия для\nслабовидящих',
    accessibilityNormal: 'Обычная версия\nприложения',
    catalog: 'каталог\nэкспонатов',
    audioguide: 'аудиогид\nпо приложению',
  },
  en: {
    ...en,
    accessibilityToggle: 'Visually impaired\nversion',
    accessibilityNormal: 'Normal\nversion',
    catalog: 'catalog\nof exhibits',
    audioguide: 'audio guide\nof the app',
  },
};

export const operationStyles = {
  rudolf: {
    position: 'absolute',
    top: '15%',
    left: '7%',
    width: '400px',
    height: '160px',
    cursor: 'pointer',
  },
  quiet: {
    position: 'absolute',
    top: '34%',
    left: '1%',
    width: '400px',
    height: '160px',
    cursor: 'pointer',
  },
  ball: {
    position: 'absolute',
    bottom: '17%',
    left: '2%',
    width: '350px',
    height: '130px',
    cursor: 'pointer',
  },
  white: {
    position: 'absolute',
    bottom: '8%',
    left: '31%',
    width: '530px',
    height: '160px',
    cursor: 'pointer',
  },
  cheluskin: {
    position: 'absolute',
    top: '40%',
    right: '35%',
    width: '355px',
    height: '130px',
    cursor: 'pointer',
  },
  north: {
    position: 'absolute',
    top: '22%',
    left: '41%',
    width: '390px',
    height: '130px',
    cursor: 'pointer',
  },
  schmidt: {
    position: 'absolute',
    top: '25%',
    right: '5%',
    width: '345px',
    height: '130px',
    cursor: 'pointer',
  },
};

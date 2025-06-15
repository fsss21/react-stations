import { ru } from './ru';
import { en } from './en';

export const translations = {
  ru: {
    ...ru,
    accessibilityToggle: 'Версия для\nслабовидящих',
    accessibilityNormal: 'Обычная версия\nприложения',
    catalog: 'каталог\nэкспонатов',
    audioguide: 'аудиогид\nпо приложению'
  },
  en: {
    ...en,
    accessibilityToggle: 'Visually impaired\nversion',
    accessibilityNormal: 'Normal\nversion',
    catalog: 'catalog\nof exhibits',
    audioguide: 'audio guide\nof the app'
  }
};

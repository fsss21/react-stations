import emailjs from '@emailjs/browser';
import html2canvas from 'html2canvas';

// Новый синтаксис инициализации
emailjs.init({
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  blockHeadless: true,
  limitRate: {
    throttle: 10000
  }
});

export const EMAIL_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  FROM_EMAIL: process.env.REACT_APP_EMAILJS_FROM_EMAIL || 'ckalovskaviacia@gmail.com'
};

// Генерация изображения грамоты
const generateCertificateImage = async (name) => {
  const certificateElement = document.getElementById('certificate-template');

  if (!certificateElement) {
    throw new Error('Certificate template element not found');
  }

  try {
    const canvas = await html2canvas(certificateElement, {
      scale: 1.3, // Для высокого разрешения
      useCORS: true,
      logging: false
    });

    return canvas.toDataURL('image/jpeg', 0.5);
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw new Error('Certificate generation failed');
  }
};

// Обновленная функция отправки
export const sendCertificate = async (userData) => {
  const { name, email, game, score, total, time } = userData;

  // Генерация изображения грамоты
  const certificateImage = await generateCertificateImage(name);

  const templateParams = {
    title: 'Грамота участника',
    to_name: name,
    to_email: email,
    from_name: 'Чкаловская авиация',
    from_email: EMAIL_CONFIG.FROM_EMAIL,
    game_name: game,
    score: score || '',
    total: total || '',
    time: time || '',
    certificate_date: new Date().toLocaleDateString('ru-RU')
  };

  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  try {
    const response = await emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams, {
      publicKey
    });

    console.log('Грамота успешно отправлена!', response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error('Ошибка отправки грамоты:', {
      status: error.status,
      message: error.text,
      details: error.response?.data
    });
    return { success: false, error };
  }
};

export default emailjs;

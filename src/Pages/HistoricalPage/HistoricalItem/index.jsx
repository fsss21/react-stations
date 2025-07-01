import { useParams } from 'react-router';
import Menu from '../../../components/Menu';
import { useLanguage } from '../../../LanguageContext.jsx';

const HistoricalItem = () => {
  const { data } = useLanguage();
  const { id } = useParams();
  const item = data.operations.find((item) => item.id === id);
  return <Menu data={{ ...item, ...data }} />;
};

export default HistoricalItem;

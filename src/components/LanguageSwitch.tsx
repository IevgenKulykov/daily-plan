import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitchProps {
  switchLanguage: (lang: string) => void;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ switchLanguage }) => {
  const { t } = useTranslation();

  return (
    <div className="settings-btn-container">
      <button className="lang-btn" onClick={() => switchLanguage('en')}>
        {t('english')}
      </button>
      <button className="lang-btn" onClick={() => switchLanguage('uk')}>
        {t('ukrainian')}
      </button>
    </div>
  );
};

export default LanguageSwitch;

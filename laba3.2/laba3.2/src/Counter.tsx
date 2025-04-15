import { useState } from 'react';

const translations = {
  en: {
    click: (count: number) => `${count} ${count === 1 ? 'click' : 'clicks'}`,
    reset: 'Reset',
    lang: 'English',
  },
  ru: {
    click: (count: number) => `${count} ${count === 1 ? 'клик' : (count < 5 ? 'клика' : 'кликов')}`,
    reset: 'Сбросить',
    lang: 'Русский',
  },
};

const MultiLangCounter = () => {
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const [count, setCount] = useState(0);

  const handleLangSwitch = (newLang: 'en' | 'ru') => {
    setLang(newLang);
  };

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const isActive = (buttonLang: 'en' | 'ru') =>
    lang === buttonLang ? 'btn-primary' : 'btn-outline-primary';

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="btn-group mb-3" role="group">
        <button
          type="button"
          className={`btn mb-3 ${isActive('en')}`}
          data-testid="en"
          onClick={() => handleLangSwitch('en')}
        >
          English
        </button>
        <button
          type="button"
          className={`btn mb-3 ${isActive('ru')}`}
          data-testid="ru"
          onClick={() => handleLangSwitch('ru')}
        >
          Русский
        </button>
      </div>

      <button
        type="button"
        className="btn btn-info mb-3 align-self-center"
        data-testid="counter"
        onClick={handleClick}
      >
        {translations[lang].click(count)}
      </button>

      <button
        type="button"
        className="btn btn-warning"
        data-testid="reset"
        onClick={handleReset}
      >
        {translations[lang].reset}
      </button>
    </div>
  );
};

export default MultiLangCounter;

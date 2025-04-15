import { useState } from 'react';

interface ButtonsProps {
  count?: number;
}

const Buttons = ({ count = 3 }: ButtonsProps) => {
  const [counters, setCounters] = useState<number[]>(Array(count).fill(0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    const newCounters = [...counters];
    newCounters[index]++;
    setCounters(newCounters);
    setActiveIndex(index);
  };

  return (
    <div className="text-center">
      <h2 className="mb-4 fw-semibold text-secondary">Нажми на кнопку</h2>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {counters.map((value, index) => (
          <button
            key={index}
            className={`btn btn-lg shadow-sm px-4 py-2 fw-bold rounded-pill ${
              activeIndex === index ? 'btn-primary' : 'btn-outline-primary'
            }`}
            style={{ transition: '0.2s ease-in-out' }}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;

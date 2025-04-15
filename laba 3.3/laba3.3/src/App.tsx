import SortableTable from './SortableTable';

const data = [
  { name: 'Алиса', age: 25, city: 'Санкт-Петербург', email: 'alice@example.com', status: 'Активна' },
  { name: 'Вова', age: 30, city: 'Москва', email: 'vova@example.com', status: 'Неактивна' },
  { name: 'Чарли', age: 22, city: 'Екатеринбург', email: 'charlie@example.com', status: 'Активна' },
  { name: 'Диана', age: 27, city: 'Новокузнецк', email: 'diana@example.com', status: 'Неактивна' },
  { name: 'Ева', age: 29, city: 'Воронеж', email: 'eva@example.com', status: 'Активна' },
];

function App() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">User Table</h2>
      <SortableTable data={data} />
    </div>
  );
}

export default App;

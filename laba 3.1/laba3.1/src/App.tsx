import Buttons from './Buttons';

function App() {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-light p-5 rounded-4 shadow w-100" style={{ maxWidth: 600 }}>
        <Buttons count={5} />
      </div>
    </div>
  );
}

export default App;

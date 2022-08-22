import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Survey App
        </p>
        <a
          href='/auth/google'
        >
          Sign In With Google
        </a>
      </header>
    </div>
  );
}

export default App;

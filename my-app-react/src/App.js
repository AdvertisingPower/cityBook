import logo from './logo.svg';
import './App.css';
import Weather from './component/signUp'
import GetWeather from './component/getWeather'
window.cityObjectKeys = [];

function App() {
  return (
    <div className="App">
      <GetWeather></GetWeather>
      {/* <Copyright></Copyright> */}
      {/* <Weather></Weather> */}
   
    </div>
  );
}

export default App;

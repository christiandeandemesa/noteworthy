// Imports BrowserRouter, Routes, and Route from the react-router-dom package.
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// Imports the Header component.
import Header from './components/Header';
// Imports the Dashboard component.
import Dashboard from './pages/Dashboard';
// Imports the Login component.
import Login from './pages/Login';
// Imports the Register component.
import Register from './pages/Register';

function App() {
  return (
    // BrowserRouter connects the browser's url with the React app.
    // BrowserRouter must be wrapped around the entire app.
    <BrowserRouter>
      <div>
        {/* Example of using a component. */}
        <Header/>
        {/* Routes holds all of the Route paths. */}
        <Routes>
          {/* Each Route has a path which is the url it appends (e.g. path='/' goes to http://localhost:3000/). 
              Each Route also has an element which is the component rendered at the url. */}
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Exports this component, so it can be imported elsewhere.
export default App;
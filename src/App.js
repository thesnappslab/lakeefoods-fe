import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CategoriesScreen from './screens/admin/CategoriesScreen';
import Container from 'react-bootstrap/esm/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import SegmentsScreen from './screens/admin/SegmentsScreen';

function App() {
  return (
   <div className='d-flex flex-column'>
    <Router>
      <div className='d-flex flex-column' style={{height: '100vh'}}>
        <Header style={{height: '10vh'}} />
          <Container style={{height: '89vh'}}  className='flex-1 mt-4'>
            <Routes>
              <Route path='/segments' element={<SegmentsScreen />} />
              <Route path='/categories' element={<CategoriesScreen />} />
            </Routes>
          </Container>
        <Footer style={{height: '1vh'}} />
      </div>
    </Router>
   </div> 
  );
}

export default App;
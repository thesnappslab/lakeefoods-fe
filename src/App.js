import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CategoriesScreen from './screens/admin/CategoriesScreen';
import Container from 'react-bootstrap/esm/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import SegmentsScreen from './screens/admin/SegmentsScreen';
import { Spinner } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { setPageMessage } from './store/AppStore';

function App() {
  const { pageMessage, loading } = useSelector(state=> state.app);
  const dispatch= useDispatch();
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
      <Toast onClose={() => dispatch(setPageMessage({show: false, message: "", variant: ""}))} animation autohide show={pageMessage.show} delay={3000} style={{position: 'absolute', right: 0, top: 0}} bg={pageMessage.variant}><Toast.Body><span style={{
        fontSize: '1rem', 
        color: "#FFFFFF"
      }}>{pageMessage.message}</span></Toast.Body></Toast>
      {loading&&
        <div style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#FFF',
          opacity: 0.5,
          zIndex: 1000,
          position: 'absolute',
          left: 0,
          top: 0
        }}>
          <Spinner style={{position: 'absolute', left: '50%', top: '50%'}} animation="border" role="status" />
        </div>
      }
    </Router>
   </div> 
  );
}

export default App;
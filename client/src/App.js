import React from 'react';
import AppNavbar from'./components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import {Container} from 'reactstrap';



function App() {
  return (
    <Provider store={store}>
      <div >
     <AppNavbar />
     <Container>
       <ItemModal></ItemModal>
     <ShoppingList />
     </Container>
    
     </div>

    </Provider>
    
  );
}

export default App;

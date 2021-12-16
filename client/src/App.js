import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import Decks from './views/Decks';
import Cards from './views/Cards';
import Account from './views/Account';
import NotFound from './views/NotFound';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
        <Layout>

          <Header></Header>

          <Content>
            <Routes>
              <Route path="/" element={<Decks />} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/decks/:id/cards" element={<Cards />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
          
          <Footer></Footer>
      
        </Layout>
    </BrowserRouter>
  ) 
}

export default App;

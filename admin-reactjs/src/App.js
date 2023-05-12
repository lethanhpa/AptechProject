import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { publicRoutes } from './routes';
import DefaultLayout from './components/DefaultLayout/index';
import Login from "./pages/Auth/Login.js";
import { Fragment } from 'react';
import { Button } from 'antd';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLogin');

    if (storedLoginState === 'true') {
      setIsLogin(true);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  };
  return (
    <>
      {isLogin ? (
        <BrowserRouter setIsLogin={setIsLogin}>
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                let Layout = DefaultLayout
                if (route.layout) {
                  Layout = route.layout
                }
                else if (route.layout === null) {
                  Layout = Fragment
                }

                const Page = route.component
                return <Route key={index} path={route.path} element={
                  <Layout >
                    <div style={{ textAlign: "right", marginBottom: "24px" }}>
                      <Button danger onClick={handleLogout}>Logout</Button>
                    </div>
                    <Page />
                  </Layout>
                } ></Route>
              })}
            </Routes>
          </div>
        </BrowserRouter>
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default App;

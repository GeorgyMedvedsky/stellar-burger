import {
  ConstructorPage,
  NotFound404,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

// Функция для проверки аутентификации пользователя
const isAuthenticated = () => {};

type ProtectedRouteProps = {
  children: React.ReactElement;
};

// Компонент высшего порядка для защиты роутов
// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   if (!isAuthenticated()) {
//     return <Navigate to='/login' />;
//   }
//   return children;
// };

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='*' element={<NotFound404 />} />
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
    </Routes>
    <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal
            title='Информация о заказе'
            onClose={() => {
              console.log(1);
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title='Информация о заказе'
            onClose={() => {
              console.log(1);
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal
            title='Информация о заказе'
            onClose={() => {
              console.log(1);
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;

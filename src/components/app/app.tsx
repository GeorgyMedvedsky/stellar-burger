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
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  checkUserAuth,
  selectUser,
  setUser
} from '../../services/slices/authSlice';
import Protected from '../protected-route/protected-route';

const App = () => {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.backgroundLocation;
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(setUser(user));
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/login'
          element={<Protected onlyUnAuth component={<Login />} />}
        />
        <Route
          path='/forgot-password'
          element={<Protected onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<Protected onlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<Protected component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<Protected component={<ProfileOrders />} />}
        />
        <Route path='/ingredients/:id' element={<ConstructorPage />} />
        <Route path='/feed/:number' element={<Feed />} />
      </Routes>

      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={handleClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title={`# ${orderNumber}`} onClose={handleClose}>
              <OrderInfo setOrderNumber={setOrderNumber} />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

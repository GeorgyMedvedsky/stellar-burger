import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserOrders } from '../../services/user-orders/slice';
import { getUserOrdersthunk } from '../../services/user-orders/actions';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrdersthunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

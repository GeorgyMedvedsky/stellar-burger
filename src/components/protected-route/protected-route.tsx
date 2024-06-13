import { Navigate, useLocation } from 'react-router-dom';
import { selectAuthChecked, selectUser } from '../../services/slices/authSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps) => {
  const isAuthChecked = useSelector(selectAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return component;
};

export default Protected;
// export const OnlyAuth = Protected;
// export const OnlyUnAuth = ({
//   component
// }: {
//   component: React.JSX.Element;
// }): React.JSX.Element => <Protected onlyUnAuth component={component} />;

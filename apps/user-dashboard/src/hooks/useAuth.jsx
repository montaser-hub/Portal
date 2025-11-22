import api from '../services/api';
import { logoutUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.get('/users/logout');
    } catch (err) {
      // Even if server fails, still logout locally
      console.warn('Logout API failed, clearing locally anyway');
    } finally {
      dispatch(logoutUser());
      toast.success('Logged out successfully');
      navigate('/Login', { replace: true });
    }
  };

  return { logout };
};

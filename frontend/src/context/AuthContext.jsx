import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import client from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('ttm_user')) || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem('ttm_user', JSON.stringify(user));
    else localStorage.removeItem('ttm_user');
  }, [user]);

  const login = async (values) => {
    setLoading(true);
    try {
      const { data } = await client.post('/auth/login', values);
      setUser(data.data);
      toast.success('Logged in successfully');
      return data.data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values) => {
    setLoading(true);
    try {
      const { data } = await client.post('/auth/register', values);
      setUser(data.data);
      toast.success('Account created successfully');
      return data.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out');
  };

  const value = useMemo(() => ({ user, setUser, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

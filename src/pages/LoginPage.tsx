import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      setToken(data.data.token);
      setUser(data.data.user);
      navigate('/student'); // Or check role and redirect
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" disabled={mutation.isLoading}>Login</button>
      {mutation.isError && <p>Error logging in</p>}
    </form>
  );
};

export default LoginPage;
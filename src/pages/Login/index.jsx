import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './style.scss';
import Button from '../../components/Button';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    if (event) event.preventDefault();
    
    setError('');

    if (username.trim() === 'admin' && password.trim() === '123456') {
      navigate('/dashboard');
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-page container-fluid min-vh-100 d-flex justify-content-center align-items-md-center bg-light">
      <div className="col-11 col-sm-8 col-md-6 col-lg-4 mt-3 mt-md-0 mb-3 mb-md-0">
        <div className="card p-4 shadow">
          <div className="card-body">
            <img
              src={"/images/logoPrincipal.png"}
              width={142}
              height={115}
              alt="Logo principal"
              className="d-block mx-auto mb-3"
            />

            <h1 className="h3 text-center mb-2">Sistema de Mercado</h1>
            <h2 className="h5 text-center text-muted mb-4">Gerenciamento</h2>

            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuário</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Senha</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Digite sua senha"
                  />
                  <span onClick={togglePasswordVisibility} className="password-toggle-icon" style={{ cursor: 'pointer' }}>
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </span>
                </div>
              </div>

              {error && <p className="text-danger text-center mb-3">{error}</p>}
              
              <div className="d-grid">
                <Button onClick={handleLogin} className="btn btn-primary btn-lg">
                  Entrar
                </Button>
              </div>
            </form>

            <div className="text-center text-muted mt-4">
              <p className="small mb-0">Credenciais de teste:</p>
              <p className="small">Usuário: admin | Senha: 123456</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
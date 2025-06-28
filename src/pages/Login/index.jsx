import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import './style.scss'
import Button from '../../components/Button';

export default function Login () {

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="login-container">
            <div className="login-card">
                <img
                    src={"/images/logoPrincipal.png"}
                    width={142}
                    height={115}
                    alt="Logo principal"
                />
                <h1 className="title">Sistema de Mercado</h1>
                <h2 className="subtitle">Gerenciamento</h2>

                <form className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Usuário</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <div className="password-wrapper">
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>
                    </div>
                    <Button>Entrar</Button>
                </form>
                
                <div className="test-credentials">
                    <p>Credenciais de teste:<br/>
                        Usuário: admin<br/>
                        Senha: 123456
                    </p>
                </div>
            </div>
        </div>
    )
}
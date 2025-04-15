import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login () {
    //info do usuario 
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const navigate = useNavigate();

    //configurando form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMensagemErro('');
        setMensagemSucesso('');

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email: email,
                senha: senha,
            })

            // caso funcione
            if (response.status === 200) {
                setMensagemSucesso(response.data.message);
                console.log('Login efetuado', response.data);
                //redirecionando para o crud
                setTimeout(() =>{
                    navigate('/produtos');
                },2000)
            } else {
                setMensagemErro(response.data.message || 'Erro ao fazer login');
                console.error('Erro no login' , response.data);
            }

        } catch(error) {
            if(error.response) {
                setMensagemErro(`Erro no login: ${error.response.data.message || 'Erro desconhecido'}`)
                console.error('Erro no login', error.response.data);
            } else if(error.request){
                setMensagemErro('Não foi possivel conectar o servidor');
                console.error('Erro de conexão', error.request)
            } else {
                setMensagemErro(`Erro ao fazer login: ${error.message}`);
                console.error('Erro de requisição', error.message);
            }
        }
    };

    // configurando o html
    return (
        <div>
            <h2>Login</h2>
            {mensagemErro &&  <p> {mensagemErro}</p>}
            {mensagemSucesso && <p>{mensagemSucesso}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange= {(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor= "senha">Senha:</label>
                    <input
                    type= "password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    />
                </div>
                <button type= "submit">Entrar</button>
            </form>
            <p>
                Não tem conta? <Link to="/criar-conta">Criar conta</Link>
            </p>
          
        </div>
    );
}

export default Login;
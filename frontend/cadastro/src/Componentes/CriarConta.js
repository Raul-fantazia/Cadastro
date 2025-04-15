import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarConta () {
    const [nome,setNome ] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const navigate = useNavigate();

    //botao form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMensagemErro('');
        setMensagemSucesso('');

            // enviando as infos do usuario para o banco de dados 
        try {
            const response = await axios.post('http://localhost:8000/usuarios' , {
                nome,
                email,
                senha,
            });

            if(response.status === 201) {
                setMensagemSucesso('Conta criada com sucesso!');
                console.log('Usuário criado:' , response.data);
                //redirecionando para a pagina de login
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMensagemErro(response.data.message || 'Erro ao criar conta.');
                console.error('Erro ao criar usuário' , response.data);
            }
        }   catch (error) {
            if (error.message) {
                setMensagemErro(error.response.data.message || 'Erro ao criar conta');
                console.error('Erro ao criar usuário:' , error.response.data);
            }  else if (error.request) {
                setMensagemErro('Erro ao criar conta');
                console.error('Erro de requisição: ' , error.message);
            }
        }
    }
    
    return (
        <div>
            <h2>Criar Conta</h2>
            {mensagemErro && <p style = {{ color: 'red'}}>{mensagemErro}</p>}
            {mensagemSucesso && <p style = {{ color: 'red'}}>{mensagemSucesso}</p>}
            <form onSubmit= {handleSubmit}>
                <div>
                    <label htmlFor='nome'>Nome:</label>
                    <input 
                    type="text"
                    id="nome"
                    value= { nome }
                    onChange= {(e) => setNome(e.target.value)}
                    required
                    />
                </div>
                <div>
                <label htmlFor='email'>Email:</label>
                <input 
                type="email"
                id="email"
                value= {email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                </div>
                <div>
                    <label htmlFor='senha'>Senha:</label>
                    <input
                    type= "password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha (e.target.value)} 
                    required
                    />
                </div>
                <button type="submit">Criar Conta</button>
            </form>
        </div>
    );
}

export default CriarConta;
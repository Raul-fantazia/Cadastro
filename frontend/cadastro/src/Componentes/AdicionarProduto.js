import React, { useState } from 'react';
import axios from 'axios' ;


function AdicionarProduto() {
    // carateristicas do produto 
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMensagem('');
        setErro('');

        try {
            const response = await axios.post('http://localhost:8000/api/produtos', {
                nome,
                quantidade,
                preco,
            });

            // se não faltar nenhuma info
            if (response.status === 200) {
                setMensagem('Produto adicionado com sucesso!');
                setNome('');
                setQuantidade('');
                setPreco('');
            } else {
                setErro('Erro adicionar produto.');
            }

        } catch(error){
            console.log("Erro ao adcionar produto:", error);
            setErro(error.response?.data?.message || 'Erro ao adicionar produto. Verifique a conexão com o servidor.');
        }
    };

    return(
        <div>
            <h2>Adicionar produto</h2>
            {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    />
                </div>
                <div>
                <label htmlFor="quantidade">Quantidade:</label>
                <input
                    type="text"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="preco">Preço:</label>
                <input
                    type="number"
                    id="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                    />
                </div>
                <button type="submit">Adicionar Produto</button>
            </form>
        </div>
    );
}

export default AdicionarProduto;
const Product = require('../Models/ProductModel');
const mongoose= require('mongoose');

// para adicionar produto 

exports.Addproduct = async (req, res) => {
    try {
        // pegando as informações adicionadas pelo usuario
        const { nome, quantidade, preco } = req.body;

        // instaciando produto 
        const novoProduto = new Product ({
            nome,
            quantidade,
            preco
        });

        // salvando no banco de dados 
        const produtoSalvo = await novoProduto.save();

        res.send('Produto adicionado com sucesso');
    } catch (error){
        console.error("Erro ao adicionar produto:", error);
        res.status(400).json({ message: error.message});
    }
};

// para atualizar produto 
    exports.UpdatedProduct = async (req, res) => {
        try {
            // pegando o id do produto
            const produtoId = req.params.id;

            // todas as outras infos do produto
            const{ nome, quantidade, preco } = req.body;

            //buscando e atualizando os dados do produto
            const produtoAtualizado = await Product.findByIdAndUpdate(
                produtoId,
                { nome, quantidade, preco },
                { new: true, runValidators: true }
            );

            //caso nao encontre 
            if(!produtoAtualizado) {
                return res.status(404).json({ message: 'Produto não encontrado'});
            }

            // informando a atualizaçao do produto
            res.json(produtoAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            res.status(400).json({ message: error.message}); 
        }
    }

    // para apagar 

    exports.DeleteProduct = async (req, res) => {
        try {
            // buscando o produto pelo id 
            const produtoId = req.params.id;

            // apagando produto
            const produtoapagado = await Product.findByIdAndDelete(produtoId);

             // caso nao encontre 
            if(!produtoapagado){
                return res.status(404).json({message: 'Produto não encontrado'});
            }

            res.send('Produto apagado com sucesso');
        } catch (error) {
            console.error("Erro ao apagar produto:", error);
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'ID de produto inválido' });
        }
        res.status(500).json({ message: 'Erro ao apagar o produto' });
        }
    }

    // para exibir
    exports.Showproduct = async (req,res) => {
        try {
            //pegando id do produto
            const produtoId = req.params.id;

             // Verifique se o ID é um ObjectId válido (boa prática)
        if (!mongoose.Types.ObjectId.isValid(produtoId)) {
            return res.status(400).json({ message: 'ID de produto inválido' });
        }

        // Buscando o produto pelo _id usando findOne com um objeto de filtro
        const produto = await Product.findOne({ _id: produtoId });

        // Caso não encontre
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(200).json(produto);
            

        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            if (error.name === 'CastError' && error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'ID de produto inválido' });
            }
            res.status(500).json({ message: 'Erro ao buscar o produto' }); 
        }
    }
const Usuario = require('../Models/UserModel'); // modelo para criar usuarios
const bcrypt = require('bcrypt'); // para criptografar as senhas
const jwt = require('jsonwebtoken');

// funçao para fazer login 
exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // verificando email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    // Verificando senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }
   
    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'login efetuado com sucesso'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// funçao para criar usuario
exports.criarUsuario = async (req,res) => {
    try {
        const { nome, email , senha } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // salvando infos mais senha criptografada 
        const novoUsuario = new Usuario ({
            nome,
            email,
            senha: senhaCriptografada,
        });

        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};
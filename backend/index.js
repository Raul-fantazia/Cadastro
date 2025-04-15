const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./Routes/UserRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const cors = require('cors');


dotenv.config();

const app = express();
const port = 8000;

//middleware 
app.use(cors());
app.use(express.json());

app.use('/api' , productRoutes);
app.use('/api', UserRoutes);



//conectando ao banco de dados 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectando ao banco de dados '))
    .catch(err => console.error('Erro ao conectar', err));

    
    app.get('/' , (req,res) => {
        res.send('Funcionando');
    });

    

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
// IMPORTAÇÃO
var express = require('express');
var router = express.Router();
const db = require('../../config/config_database');

router.get('/', async function(req,res,next){
    const query = 'SELECT * FROM alunos'
    try {
        const data = await db.any(query)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
})
router.get('/:matricula', async function(req, res, next) {
    const {matricula} = req.params.matricula;
    const query = `SELECT * FROM alunos WHERE matricula= ${matricula}`
    try {
        const data = await db.any(query)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
// POST
router.post('/',function(req,res,next){
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;
    alunos.content[matricula] = {
        ...novoAluno,
        matricula:Number(matricula)
    }
    const response = {
        msg: "Aluno criado com sucesso!",
        aluno: alunos.content[matricula]
    }
    try {
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
})
// PUT 
router.put('/:matricula', function (req, res, next) {
    const {matricula} = req.params.matricula;
    const novoAluno = req.body;
    alunos.content[matricula] = {...novoAluno,matricula:Number(matricula)};
    const response = {
        msg: "Aluno editado com sucesso!",
        aluno: alunos.content[matricula]
    }
    try {
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }

});
// DELETE
router.delete('/:matricula', function (req, res, next) {
    const {matricula} = req.params.matricula;
    delete alunos.content[matricula]
    const response = {
        msg: "Aluno excluido!",
        matricula
    }
    res.status(200).json(response)
});
// EXPORTAÇÃO
module.exports = router;
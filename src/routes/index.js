import {Router} from 'express';
const router=Router();


router.get('/', (req,res) => res.render('index',{title:'Inicio'}))
router.get('/inicio', (req,res) => res.render('inicio',{title:'Productos'}))
router.get('/clientes', (req,res) => res.render('clientes',{title:'Cliente'}))
router.get('/login', (req,res) => res.render('login',{title:'login'}))
router.get('/reportes', (req,res) => res.render('reportes',{title:'reportes'}))
router.get('/oportunidades', (req,res) => res.render('oportunidades',{title:' Oportunidades'}))


export default router;
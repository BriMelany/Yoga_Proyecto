import {Router} from 'express';
const router=Router();


router.get('/', (req,res) => res.render('index',{title:'Inicio'}))
router.get('/clientes', (req,res) => res.render('clientes',{title:'Menu'}))


export default router;
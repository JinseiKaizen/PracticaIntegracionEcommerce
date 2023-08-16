const express = require("express");
let { Router } = require("express");
const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pets = [];

const routerPet = new Router();


app.use('/api/pets', routerPet);

routerPet.get('/', (req, res, next)=>{
    res.json(pets);
})


routerPet.param('pet', (req,res,next,petName)=>{
    const pet = pets.find(pet => pet.name.toLowerCase() === petName.toLowerCase());
    if(!pet) return res.status(404).json({error: "Mascota no encontrada en nuestra BD"});
    req.pet = pet;
    next();
});

routerPet.get('/:pet', (req, res, next)=>{
    res.json(req.pet);
})

routerPet.put('/:pet', (req, res, next)=>{
    req.pet.adopted = true;
    res.json(req.pet);
})

routerPet.post('/', (req, res, next)=>{
    const { name, species } = req.body;
    if(!name || !species) return res.status(400).json({error: 'Faltan datos'});
    pets.push({ name, species });
    res.status(201).json({ name, species });
})

routerPet.get('*', (req,res)=>{res.status(404).send("[404] not Found!")})


app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
})

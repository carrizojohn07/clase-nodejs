const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


let personas = [
    { id: 1, nombre: "Juan", edad: 15 },
    { id: 2, nombre: "Ana", edad: 12 }
];

//middleware para la ruta principal
app.get("/", (req, res) => {
    res.send("ejemplo de api rest");
});

//middleware para obtener todas las personas
app.get("/personas", (req, res) => {
    res.json(personas);
});

//middleware para obtener una persona por id
app.get("/personas/:id", (req, res) => {
    const persona = personas.find(p => p.id == (req.params.id));
    persona ? res.json(persona) : res.status(404).send('Persona no encontrada');
});

//middleware para crear una persona
app.post("/personas", (req, res) => {
    console.log(req.body);
    res.send('creando persona');
    const nuevaid = personas.length + 1;
    const nuevaPersona = 
    { id: nuevaid, 
      nombre: req.body.nombre,
      edad: req.body.edad
    };
    personas.push(nuevaPersona);
    res.status(201).json(nuevaPersona);
});

//middleware para actualizar una persona por id
app.put("/personas", (req, res) => {
    console.log(req.query);
    console.log(req.body);
    const persona = personas.find(p => p.id == (req.query.id));
    if (!persona) {
        return res.status(404).send('Persona no encontrada');
    }
    persona.nombre = req.body.nombre;
    persona.edad = req.body.edad;
    res.json(persona).send('actualizando persona');
});

//middleware para eliminar una persona por id
app.delete("/personas/:id", (req, res) => {
    const indice = personas.findIndex(i => i.id == (req.params.id));
    if (indice == -1) {
        return res.status(404).send('Persona no encontrada');
    }
    personas.splice(indice, 1);
    res.status(204).send('Persona eliminada');
});

//middleware para url erroneas o inexistentes
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
}); 

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

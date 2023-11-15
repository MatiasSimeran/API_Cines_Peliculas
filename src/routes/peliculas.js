import { Router } from "express";
import _ from "underscore";
import peliculas from "../listadoPeliculas.json" assert { type: "json" };

const router = new Router();

router.get("/", (req, res) => {
  res.json(peliculas);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const pelicula = peliculas.find((pelicula) => pelicula.id === id);

  if (pelicula) {
    res.json(pelicula);
  } else {
    res.status(404).json({ error: "Pelicula no encontrada." });
  }
});

router.post("/", (req, res) => {
  const id = peliculas.length + 1;
  const { titulo, director, anio, rating } = req.body;

  if (id && titulo && director && anio && rating) {
    const nuevaPelicula = { ...req.body, id };
    peliculas.push(nuevaPelicula);
    res.json(peliculas);
  } else {
    res.status(500).json({ error: "Hubo un error." });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, director, anio, rating } = req.body;
  if (id && titulo && director && anio && rating) {
    _.each(peliculas, (pelicula, i) => {
      if (pelicula.id === id) {
        pelicula.titulo = titulo;
        pelicula.director = director;
        pelicula.anio = anio;
        pelicula.rating = rating;
      }
    });
    res.json(peliculas);
  } else {
    res.status(500).json({ error: "Hubo un error." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    _.each(peliculas, (pelicula, i) => {
      if (pelicula && pelicula.id == id) {
        peliculas.splice(i, 1);
      }
    });
    res.json(peliculas);
  }
});

export default router;

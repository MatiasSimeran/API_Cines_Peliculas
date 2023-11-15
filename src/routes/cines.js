import { Router } from "express";
import _ from "underscore";
import cines from "../listadoCines.json" assert { type: "json" };

const router = new Router();

router.get("/", (req, res) => {
  res.json(cines);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const cine = cines.find((cine) => cine.id === id);

  if (cine) {
    res.json(cine);
  } else {
    res.status(404).json({ error: "Cine no encontrado." });
  }
});

router.post("/", (req, res) => {
  const id = cines.length + 1;
  const { nombre, ubicacion, capacidad } = req.body;

  if (id && nombre && ubicacion && capacidad) {
    const nuevoCine = { ...req.body, id };
    cines.push(nuevoCine);
    res.json(cines);
  } else {
    res.status(500).json({ error: "Hubo un error." });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, capacidad } = req.body;
  if (id && nombre && ubicacion && capacidad) {
    _.each(cines, (cine, i) => {
      if (cine.id === id) {
        cine.nombre = nombre;
        cine.ubicacion = ubicacion;
        cine.capacidad = capacidad;
      }
    });
    res.json(cines);
  } else {
    res.status(500).json({ error: "Hubo un error." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    _.each(cines, (cine, i) => {
      if (cine && cine.id == id) {
        cines.splice(i, 1);
      }
    });
    res.json(cines);
  }
});

export default router;

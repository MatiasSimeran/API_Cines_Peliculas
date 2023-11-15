import express from "express";
import morgan from "morgan";


import peliculasRoutes from "./routes/peliculas.js";
import cinesRoutes from "./routes/cines.js";

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// rutas
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/cines", cinesRoutes);

// Abrir servidor
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

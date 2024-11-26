const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Ruta del archivo que guarda el contador
const COUNTER_FILE = path.join(__dirname, 'counter.txt');

// Diagnóstico estático por ahora (puedes cambiar esto según sea necesario)
const STATIC_DIAGNOSIS = 'Dermatitis atópica';

// Leer el contador al iniciar el servidor
let imageCounter = 1; // Valor inicial en caso de que no exista el archivo
if (fs.existsSync(COUNTER_FILE)) {
  const savedCounter = fs.readFileSync(COUNTER_FILE, 'utf8');
  imageCounter = parseInt(savedCounter, 10) || 1; // Convertir a número
}

// Función para guardar el contador en el archivo
const saveCounter = () => {
  fs.writeFileSync(COUNTER_FILE, imageCounter.toString(), 'utf8');
};

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Directorio donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const imageID = `IMG-${imageCounter.toString().padStart(4, '0')}`; // Ejemplo: IMG-0001
    imageCounter += 1; // Incrementar el contador
    saveCounter(); // Guardar el contador actualizado en el archivo
    cb(null, `${imageID}-${STATIC_DIAGNOSIS.replace(/\s+/g, '_')}-${file.originalname}`); // Guardar con el correlativo y diagnóstico en el nombre del archivo
  },
});

const upload = multer({ storage });

// Ruta para subir imágenes
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se recibió ningún archivo');
  }

  console.log(`Archivo recibido: ${req.file.path}`);

  // Responder con el correlativo y el diagnóstico
  res.json({
    message: 'Archivo subido exitosamente',
    path: req.file.path, // Ruta donde se guardó el archivo
    diagnosis: STATIC_DIAGNOSIS, // Diagnóstico simulado
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://192.168.100.6:${PORT}`);
});

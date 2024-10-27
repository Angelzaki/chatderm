const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    const imagePath = path.join(__dirname, req.file.path);

    // Ejecutar el script de Python con YOLO y pasar la ruta de la imagen como argumento
    exec(`python3 analyze.py ${imagePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando YOLO: ${error.message}`);
        return res.status(500).json({ error: 'Error al procesar la imagen' });
      }
      if (stderr) {
        console.error(`Error en el script de Python: ${stderr}`);
        return res.status(500).json({ error: 'Error en el análisis de la imagen' });
      }

      // Enviar el resultado del análisis (stdout) como respuesta
      const result = JSON.parse(stdout); // Asegúrate de que el script devuelve JSON
      res.json(result);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

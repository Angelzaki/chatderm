const firebaseService = require('./services/firebaseService');

exports.register = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    try {
        // Registrar el usuario en Firebase
        const user = await firebaseService.registerUser(email, password);
        
        // Guardar información adicional (nombre, apellido) en Firestore o Realtime Database
        await firebaseService.saveUserProfile(user.uid, { nombre, apellido, email });

        res.status(201).json({ message: "Usuario registrado exitosamente", userId: user.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await firebaseService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
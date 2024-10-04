const USERNAME = 'admin';
const PASSWORD = '1234';

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        req.session.user = username;
        res.status(200).redirect('/dashboard'); // Redirigir a la página de dashboard
    } else {
        res.status(401).json({ success: false, message: 'Datos incorrectos' });
    }
};

exports.logout = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Error al cerrar sesión.');
            }
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(400);
    }
};

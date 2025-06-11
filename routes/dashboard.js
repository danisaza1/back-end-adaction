// exports.index = function(req, res){
//     //changer render
//   res.render('index', { title: 'Route Separation Example' });
// };
// routes/dashboard.js (Tu código de backend, con logs de depuración)
const express = require("express");
const router = express.Router();
const pool = require("../database");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, async (req, res) => {
    console.log("1. Entrando a la ruta /dashboard.");
    try {
        console.log("2. Dentro del bloque try.");
        const userId = req.user.id;
        console.log("3. ID de usuario extraído del token (req.user.id):", userId); // <-- CLAVE: ¿Es 22?

        if (!userId) {
            console.log("4. No se encontró userId, enviando 401.");
            return res.status(401).json({ error: "ID de usuario faltante. Asegúrate de estar autenticado." });
        }

        // Estas son las fechas que el backend usará para la consulta
        const month = parseInt(req.query.month); 
        const year = parseInt(req.query.year);   

        // Validar que sean números válidos, si no, usar la fecha actual como fallback
        const currentMonth = !isNaN(month) && month >= 1 && month <= 12 ? month : new Date().getMonth() + 1;
        const currentYear = !isNaN(year) && year >= 1900 ? year : new Date().getFullYear(); // Ajusta el año mínimo si es necesario

        console.log(`5. Filtrando por Mes: ${currentMonth}, Año: ${currentYear}`); // <-- CLAVE: ¿Es 5 y 2025?

        const wastesQuery = `
            SELECT
                wt.type,
                SUM(wt.quantity) AS total_quantity
            FROM
                collects c
            JOIN
                waste_type wt ON c.id = wt.collecte_id
            WHERE
                c.volunteer_id = $1 AND
                EXTRACT(MONTH FROM c.date) = $2 AND
                EXTRACT(YEAR FROM c.date) = $3
            GROUP BY
                wt.type
            ORDER BY
                wt.type;
        `;
        // CLAVE: ¿Cuáles son los parámetros exactos que se están pasando a la base de datos?
        console.log("6. Ejecutando wastesQuery con parámetros:", [userId, currentMonth, currentYear]); 
        const wastesResult = await pool.query(wastesQuery, [userId, currentMonth, currentYear]);
        // CLAVE: ¿Qué devuelve la base de datos realmente al backend?
        console.log("7. wastesQuery ejecutada. Resultados (wastesResult.rows):", wastesResult.rows);

        let firstname = "Usuario";
        const volunteerQuery = `SELECT firstname FROM volunteers WHERE id = $1;`;
        const volunteerResult = await pool.query(volunteerQuery, [userId]);
        if (volunteerResult.rows.length > 0) {
            firstname = volunteerResult.rows[0].firstname;
        }
        console.log("8. volunteerQuery ejecutada. Primer nombre:", firstname);

        const formattedWastes = wastesResult.rows.map(row => ({
            id: row.type,
            type: row.type,
            quantity: parseInt(row.total_quantity, 10)
        }));
        console.log("9. Desechos formateados. Datos enviados al frontend:", { firstname: firstname, wastes: formattedWastes }); // CLAVE: ¿Qué objeto final se envía?

        res.json({
            firstname: firstname,
            wastes: formattedWastes
        });

    } catch (error) {
        console.error("❌ Error capturado en la ruta /dashboard:", error);
        res.status(500).json({ error: "Error del servidor al recuperar datos del dashboard." });
    }
});

module.exports = router;

// router.post('/waste_type', async (req, res) => {
//   try {
//     const { collecte_id, type, quantity } = req.body;
//   }

//   const values = [collecte_id, type, quantity];
// const result = await pool.query(sql, values);

// app.get('/waste_types', (req, res) => {
//   res.json(waste_types);
// });
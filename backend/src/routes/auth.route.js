import express from 'express';

const router = express.Router();

// GET /api/products
router.post('/signup', (req, res) => {
    res.send('Signup route');
})

// GET /api/products
router.post('/login', (req, res) => {
    res.send('login route');
})

// GET /api/products/:id
router.post('/logout', (req, res) => {
    res.send('logout route');
})
export default router;
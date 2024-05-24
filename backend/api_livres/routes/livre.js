import express from 'express';

import Livre from '../models/livre.js';

const router = express.Router();

router.get('/', async (req, res) => {
    await Livre.find().then((livres) => {
        res.status(200).json(livres)
    }).catch((err) => {
        res.status(500).json({message: err.message})
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    await Livre.findById(id).then((livre) => {
        res.status(200).json(livre);
    }).catch((err) => {
        res.status(404).json({message: err.message})
    })
})

router.get('/search/:titre', async (req, res) => {
    const titre = req.params.titre;
    console.log(titre);
    // Construct a regular expression to match any document where titre includes the given value
    const regex = new RegExp(titre, 'i'); // 'i' flag for case-insensitive matching

    try {
        // Find documents where the titre field matches the regular expression
        const livres = await Livre.find({ titre: { $regex: regex } });
        res.status(200).json(livres);
    } catch (err) {
        // Handle errors, such as if the query fails
        res.status(404).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const livre = req.body;
    await Livre.create(livre).then((livre) => {
        res.status(201).json(livre);
    }).catch((err) => {
        res.status(500).json({message: 'Livre non enregistre'})
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Livre.findByIdAndDelete(id).then(() => {
        res.status(200).json({message: 'Livre supprime'});
    }).catch((err) => {
        res.status(500).json({message: err.message})
    })
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const livre = req.body;
    await Livre.findByIdAndUpdate(id, livre).then((livre) => {
        res.status(200).json(livre);
    }).catch((err) => {
        res.status(500).json({message: err.message})
    })
})


export default router;
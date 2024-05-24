import express from 'express';

import empruntModel from '../models/emprunt.js';

const router = express.Router();

router.get('/', async (req, res) => {
    await empruntModel.find().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    await empruntModel.findById(id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.get('/client/:id', async (req, res) => {
    const id = req.params.id;
    await empruntModel.find({clientId: id}).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.get('/livre/:id', async (req, res) => {
    const id = req.params.id;
    await empruntModel.find({livreId: id}).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.get('/client/:clientId/livre/:livreId', async (req, res) => {
    const clientId = req.params.clientId;
    const livreId = req.params.livreId;
    await empruntModel.find({clientId: clientId, livreId: livreId}).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.post('/', async (req, res) => {
    const emprunt = req.body;
    await empruntModel.create(emprunt).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const emprunt = req.body;
    await empruntModel.findByIdAndUpdate(id, emprunt).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await empruntModel.findByIdAndDelete(id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

export default router
import express from 'express';

import clientModel from '../models/client.js';

const router = express.Router();

router.get('/', async (req, res) => {
    await clientModel.find({}).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json({message: err.message})
    });
})

router.get('/:id', async (req, res) => {
    await clientModel.findById(req.params.id).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json({message: err.message})
    });
})

router.put('/:id', async (req, res) => {
    await clientModel.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json({message: err.message})
    });
})

router.post('/', async (req, res) => {
    await clientModel.create(req.body).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json({message: err.message})
    });
})

router.delete('/:id', async (req, res) => {
    await clientModel.findByIdAndDelete(req.params.id).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json({message: err.message})
    });
})

export default router;
const router = require('express').Router();

const Obugs = require('./obugs-model.js');

router.get('/', (req, res) => {
  Obugs.find()
    .then(obugs => {
      res.json(obugs);
    })
    .catch(err => res.send(err));
});

router.put('/:id', (req, res) => {
    const { id } = req.params

    Obugs.findById(id)
    .then(obug => {
        if (obug) {
            Obugs.update(req.body, id)
            .then(updatedobug => {
                res.json(updatedobug);
        });
        } else {
            res.status(404).json({ message: 'Could not find buggie relationship with given id' });
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to update buggie relationship' });
    });
});

module.exports = router;
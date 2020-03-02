const router = require('express').Router();

const Buggies = require('./buggies-model.js');

router.get('/', (req, res) => {
  Buggies.find()
    .then(bugs => {
      res.json(bugs);
    })
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Buggies.findById(id)
    .then(bugs => {
        if (bugs) {
            res.json(bugs);
        } else {
            res.status(404).json({ message: 'Could not find the buggie with given id.' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to get buggie' });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params

    Buggies.findById(id)
    .then(bug => {
        if (bug) {
            Buggies.update(req.body, id)
            .then(updatedbug => {
                res.json(updatedbug);
        });
        } else {
            res.status(404).json({ message: 'Could not find buggie with given id' });
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to update buggie' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Buggies.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted });
        } else {
            res.status(404).json({ message: 'Could not find buggie with given id' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete buggie' });
    });
});

module.exports = router;
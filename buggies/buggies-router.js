const router = require('express').Router();

const Buggies = require('./buggies-model.js');

router.get('/', (req, res) => {
  Buggies.find()
    .then(bugs => {
      res.json(bugs)
    })
    .catch(err => res.send(err));
});

router.get('/pickedup', (req, res) => {
    Buggies.findPickedUp()
      .then(bugs => {
        res.json(bugs);
      })
      .catch(err => res.send(err))
  })

router.get('/:id', idBuggie, (req, res) => {
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
    })
})

router.put('/:id', idBuggie, updateBuggie, (req, res) => {
    const { id } = req.params

    Buggies.findById(id)
    .then(bug => {
        if (bug) {
            Buggies.update(req.body, id)
            .then(updatedbug => {
                res.json(updatedbug)
        })
        } else {
            res.status(404).json({ message: 'Could not find buggie with given id' });
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to update buggie' });
    })
})

router.post('/', validateBuggie, (req, res) => {
    Buggies.addBuggie(req.body)
    .then(buggie => {
        res.status(201).json(buggie)
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to create new buggie' });
    })
})

router.post('/:id/pickup', validateRelationship, (req, res) => {
    const { id } = req.params; 

    Buggies.findById(id)
    .then(buggie => {
        if (buggie) {
            Buggies.pickupBuggie(req.body, id)
            .then(buggie => {
                res.status(201).json(buggie)
            })
        } else {
            res.status(404).json({ message: 'Could not find buggie with given task id.' })
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to create new buggie relationship' });
    })
})



router.delete('/:id', idBuggie, (req, res) => {
    const { id } = req.params;
  
    Buggies.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find buggie with given id' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete buggie' })
    })
})

function validateBuggie (req, res, next) {
    console.log(`middleware validate buggie ${req.body.location}`)
    if(!req.body.location){
        res.status(400).json({ message: 'Buggie does not have a location' })
    }else{
      next()
    }
}

function idBuggie (req, res, next) {
    const { id } = req.params
    Buggies.findById(id)
        .then(result => {
            if(result && Object.entries(result).length){
                next()
            }else {
                res.status(400).json({ message: 'Buggie does not exist' })
            }
        })
}

function updateBuggie (req, res, next) {
    console.log(`middleware update buggie ${req.body.available}`)
    if(!req.body.available){
        res.status(400).json({ message: 'Buggie does not update available' })
    }else{
      next()
    }
}

function validateRelationship (req, res, next) {
    console.log(`middleware validate project ${req.body.user_id}`)
    if(!req.body.user_id){
        res.status(400).json({ message: 'Did not send user_id, bugs_id' })
    }else{
      next()
    }
}

module.exports = router;
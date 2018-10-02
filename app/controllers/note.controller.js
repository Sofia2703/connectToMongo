const Note = require('../model/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.first_name) {
    //     return res.status(400).send({
    //         message: "Note firstname can not be empty"
    //     });
    // }

    // Create a Note
    const note = new Note({
        customer_id: req.body.customer_id,
        store_id: req.body.store_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address_id: req.body.address_id,
        active: req.body.active
    });

    // Save Note in the database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a customer_id
exports.findOne = (req, res) => {
    Note.findById(req.params.customer_id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.customer_id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.customer_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.customer_id
            });
        });
};

// Update a note identified by the customer_id in the request
    exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body.first_name) {
//         return res.status(400).send({
//             message: "Note first_name can not be empty"
//         });
//     }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.customer_id, {
        customer_id: req.body.customer_id,
        store_id: req.body.store_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address_id: req.body.address_id,
        active: req.body.active,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.customer_id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.customer_id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.customer_id
            });
        });
};

// Delete a note with the specified customer_id in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.customer_id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.customer_id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.customer_id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.customer_id
            });
        });
};
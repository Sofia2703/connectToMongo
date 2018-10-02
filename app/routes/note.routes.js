module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:customer_id', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:customer_id', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:customer_id', notes.delete);
}
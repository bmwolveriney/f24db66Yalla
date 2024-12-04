const Fossil = require('../models/fossil');

// List all Fossils
exports.fossil_list = async function (req, res) {
    try {
        const fossils = await Fossil.find();
        res.send(fossils);
    } catch (err) {
        res.status(500);
        res.send({ "error": err.message });
    }
};

// View all Fossils Page
exports.fossil_view_all_Page = async function (req, res) {
    try {
        const results = await Fossil.find();
        res.render('fossils', { title: 'Fossils', results: results });
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Details for a specific Fossil
exports.fossil_detail = async function (req, res) {
    console.log("Detail of Fossil with ID:", req.params.id);
    try {
        const result = await Fossil.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Fossil document for ID ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${error.message}"}`);
    }
};

// Handle Fossil creation on POST
exports.fossil_create_post = async function (req, res) {
    console.log(req.body);
    let document = new Fossil();
    document.site_name = req.body.site_name;
    document.location = req.body.location;
    document.year_established = req.body.year_established;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle building the view for deleting a fossil
exports.fossil_delete_Page = async function (req, res) {
    try {
        const fossil = await Fossil.findById(req.query.id);
        if (!fossil) {
            return res.status(404).json({ error: `Fossil with ID ${req.query.id} not found` });
        }
        res.status(200).render('fossildelete', { title: 'Fossil Delete', toShow: fossil });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Error fetching fossil: ${err.message}` });
    }
};

// Handle the deletion of a Fossil
exports.fossil_delete = async function (req, res) {
    try {
        const result = await Fossil.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: `Fossil with ID ${req.params.id} not found` });
        }
        res.status(200).json({ message: `Fossil with ID ${req.params.id} deleted successfully` });
    } catch (err) {
        console.error("Error deleting fossil:", err);
        res.status(500).json({ error: `Error deleting fossil: ${err.message}` });
    }
};

// Handle Fossil update form on PUT
exports.fossil_update_put = async function (req, res) {
    console.log(`Updating Fossil with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Fossil.findById(req.params.id);
        if (req.body.site_name) toUpdate.site_name = req.body.site_name;
        if (req.body.location) toUpdate.location = req.body.location;
        if (req.body.year_established) toUpdate.year_established = req.body.year_established;
        toUpdate.is_famous = req.body.checkbox_famous ? true : false;

        let result = await toUpdate.save();
        console.log("Update successful:", result);
        res.send(result);
    } catch (err) {
        console.error("Error updating fossil:", err);
        res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
    }
};

// Handle displaying one Fossil by ID
exports.fossil_view_one_Page = async function (req, res) {
    console.log("Single view for ID:", req.query.id);
    try {
        const result = await Fossil.findById(req.query.id);
        if (!result) {
            res.status(404).send(`{"error": "Fossil with ID ${req.query.id} not found"}`);
        } else {
            res.render('fossildetail', {
                title: 'Fossil Detail',
                toShow: result
            });
        }
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a Fossil
exports.fossil_create_Page = function (req, res) {
    console.log("Create view");
    try {
        res.render('fossilcreate', { title: 'Fossil Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a Fossil
exports.fossil_update_Page = async function (req, res) {
    console.log("Update view for Fossil with ID " + req.query.id);
    try {
        let result = await Fossil.findById(req.query.id);
        res.render('fossilupdate', { title: 'Fossil Update', toShow: result });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.render('fossilupdate', {
                title: 'Fossil Update',
                message: `Error: ${err.message}`,
                toShow: req.body
            });
        } else {
            res.status(500).send(`{"error": "${err}"}`);
        }
    }
};

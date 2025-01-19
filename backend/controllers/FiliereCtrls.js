const mongoose = require('mongoose'); 
const Filiere = require('../models/Filieres');
const Professeur = require('../models/Professeurs');

// Get all filieres
exports.getAllFiliere = async (req, res) => {
    try {
        const filiereList = await Filiere.find().populate('elements', 'libelleElement');

        if (!filiereList || filiereList.length === 0) {
            return res.status(404).json({ success: false, message: 'No filieres found' });
        }

        res.status(200).json({ success: true, filiereList });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create a new Filiere
exports.createFiliere = async (req, res) => {
    try {
        const { nomFiliere, descriptionFiliere, shortNom, typeFiliere, professeurs, semestres, coordinateur, elements } = req.body;

        // Validate ObjectIds
        const allIds = [...professeurs, ...semestres, coordinateur, ...elements];
        const invalidIds = allIds.filter(id => !mongoose.Types.ObjectId.isValid(id));

        if (invalidIds.length > 0) {
            return res.status(400).json({ message: 'Invalid ObjectId(s): ' + invalidIds.join(', ') });
        }

        // Create a new Filiere document
        const newFiliere = new Filiere({
            nomFiliere,
            descriptionFiliere,
            shortNom,
            typeFiliere,
            professeurs,
            semestres,
            coordinateur,
            elements
        });

        // Save the Filiere to the database
        await newFiliere.save();

        res.status(201).json({ message: 'Filiere created successfully', data: newFiliere });
    } catch (error) {
        console.error('Error creating Filiere:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a Filiere by name
exports.getFiliere = async (req, res) => {
    try {
        const filiereInstance = await Filiere.findOne({ nomFiliere: req.params.name })
            .populate({
                path: 'semestres',
            })
            .populate('elements');

        if (!filiereInstance) {
            return res.status(404).json({ success: false, message: 'Filiere not found' });
        }

        res.status(200).json({ success: true, filiereInstance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Filiere by ID
exports.getFiliereById = async (req, res) => {
    try {
        const filiereInstance = await Filiere.findById(req.params.id)
            .populate({
                path: 'semestres',
            })
            .populate('elements');

        if (!filiereInstance) {
            return res.status(404).json({ success: false, message: 'Filiere not found' });
        }

        res.status(200).json({ success: true, filiereInstance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a Filiere
exports.updateFiliere = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid filiere id' });
        }

        if(req.body.coordinateur){
            const cord = await Professeur.findById(req.body.coordinateur);
            if (!cord) {
                return res.status(400).json({ success: false, message: 'Invalid coordinateur' });
            }
        }

        if(req.body.professeurs){
            for (const prof of req.body.professeurs) {
                const profess = await Professeur.findById(prof);
                if (!profess) {
                    return res.status(400).json({ success: false, message: `${prof} is an invalid professor` });
                }
            }
        }

        if(req.body.modules){
            for (const mod of req.body.modules) {
                const modul = await Module.findById(mod);
                if (!modul) {
                    return res.status(400).json({ success: false, message: `${mod} is an invalid module` });
                }
            }
        }

        const updatedFiliere = await Filiere.findByIdAndUpdate(req.params.id, {
            nomFiliere: req.body.nomFiliere,
            descriptionFiliere: req.body.descriptionFiliere,
            coordinateur: req.body.coordinateur,
            modules: req.body.modules,
            professeurs: req.body.professeurs
        }, { new: true });

        res.status(200).json({ success: true, filiere: updatedFiliere });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a Filiere
exports.deleteFiliere = async (req, res) => {
    try {
        const deletedFiliere = await Filiere.findByIdAndDelete(req.params.id);
        if (deletedFiliere) {
            return res.status(200).json({ success: true, message: 'The filiere is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Filiere not found!' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error});
    }
};

// The following section is commented out but kept for reference
/*
exports.countFilieres = async (req, res) => {
    try {
        let filter = {};
        if (req.query.departement) {
            filter = { departement: req.query.departement };
        }

        const filiereCount = await Filiere.countDocuments(filter);

        if (!filiereCount) {
            return res.status(404).json({ success: false, message: "No filieres found with the provided filter" });
        }

        res.status(200).json({ success: true, filiereCount: filiereCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
*/


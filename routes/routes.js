const express = require("express");
const router = express.Router();


const {
    returnAcronyms,
    addAcronyms,
    updateAcronyms,
    deleteAcronyms

} = require("../controllers/acronyms.js")


const {  authorize } = require("../middlewares/auth");


// base route is 'acronym'
router
    .route("/")
    .get(returnAcronyms);


router
    .route('/')
    .post(addAcronyms);


router
    .route('/:acronym')
    .put(authorize, updateAcronyms);
    

router
    .route('/:acronym')
    .delete(authorize, deleteAcronyms); 


module.exports = router;
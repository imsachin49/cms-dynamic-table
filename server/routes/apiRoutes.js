const { Router } = require("express");
const apiController = require('../controllers/apiController');

const router = Router();

router.post('/createtable', apiController.createTable);
router.get('/getalltables', apiController.getAllTables);
router.post('/deletetable', apiController.deleteTable);
router.post('/tabledetails', apiController.tableDetails);
router.post('/updatedata', apiController.updateData);
router.post('/deletedata', apiController.deleteData);
router.post('/insertdata', apiController.insertData);

module.exports = router;

const express = require('express');
import CreatedUserCompany from '../controller/userCompany/createdUserCompany';
import Company from '../controller/userCompany/dataCompany';
import CreatedUserEmployee from '../controller/userEmployee/createdUserEmployee';
import UsersEmployee from '../controller/userEmployee/usersEmployee';
import LoginUsers from '../controller/loginUser/index';


const router = express.Router();



router.get('/loginUser',  LoginUsers.index)
router.get('/logout', (req, res) => {
    res.send('sair')
})


router.post('/postRegisterCompany',  CreatedUserCompany.create)
router.get('/getSectorCompany',  Company.sectorCompany)
router.get('/getUsersEmployee',  Company.usersCompany)
router.get('/getDataHomeUsers',  Company.getDataHomeUsers)
router.put('/putUpdateUserCompany',  CreatedUserCompany.putUpdateUserCompany)




router.post('/postCreatedPPP',  UsersEmployee.postCreatedPPP)
router.post('/postRegisterEmployee',  CreatedUserEmployee.create)
router.get('/getDownloadPPPEmployee',  UsersEmployee.getDownloadPPPEmployee)
router.get('/getUserEmployee',  UsersEmployee.getUserEmployee)
router.get('/getDownloadPDFEmployee/:id',  UsersEmployee.downloadPDF)

module.exports = app => app.use('/v1', router);
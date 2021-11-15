import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CreatedUserModel from '../../model/Company/createdUserCompany'
import GetUserModel from '../../model/Company/getUserCompany'
import authConfig from '../../config/auth.json';
class CreatedUserCompany {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */

  async sectorCompany(request, response) {

    const {
      idUser
    } = request.query;

    if (!idUser) {
      return response.status(404).json({ body: 'missing information' })
    }

    try {
      let resultData = await GetUserModel.getUserSector(idUser)

      console.log(resultData)


      return response.status(200).json(resultData)
    } catch (error) {
      console.log(error)
      return response.status(500)
    }

  }

  async usersCompany(request, response) {

    const {
      filter
    } = request.query;


    if (!filter) {
      return response.status(404).json({ body: 'missing information' })
    }

    try {
      let resultData = await GetUserModel.getUsersEmployee(filter)

      return response.status(200).json(resultData)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ body: 'created erro' })
    }

  }
 
  async getDataHomeUsers(request, response) {

    const {
      filter
    } = request.query;


    if (!filter) {
      return response.status(404).json({ body: 'missing information' })
    }

    try {
      let resultData = await GetUserModel.getDataHome(filter)


      let contEmployee = 0;
      let contSetor = 0;

      let arrayCheck = [];

      resultData.map((el) => {

        contEmployee = contEmployee + 1

        let checkArray = 0
        arrayCheck.map((e) => {
          if (e === el.nm_setor) {
            checkArray = checkArray + 1;
          }
        })

        if(checkArray === 0){
          contSetor = contSetor + 1;
          arrayCheck.push(el.nm_setor)
          checkArray = 0;
        }

        if (arrayCheck.length === 0) {
          contSetor = contSetor + 1;
          arrayCheck.push(el.nm_setor)
        }

      })

      let body = {
        contSetor,
        contEmployee
      }

      return response.status(200).json(body)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ body: 'select erro' })
    }

  }

}
export default new CreatedUserCompany();
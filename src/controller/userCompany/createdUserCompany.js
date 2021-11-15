import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CreatedUserModel from '../../model/Company/createdUserCompany'
import GetUserModel from '../../model/Company/getUserCompany'
import authConfig from '../../config/auth.json';
import GetUserLoginModel from '../../model/loginUsers/index';
class CreatedUserCompany {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */

  async create(request, response) {

    const {
      country,
      district,
      state,
      city,
      street,
      streetNumber,
      phone,
      email,
      passwordTwo,
      cnaeCompany,
      cpfCnpj,
      nameCompany
    } = request.body;
    console.log(request.body)


    function generateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
      });
    }


    try {
      const CNPJ = cpfCnpj.replace(/[^0-9]/g, '');
      const phoneValue = phone.replace(/[^0-9]/g, '');

      const getResult = await GetUserModel.getUser(CNPJ)

      if (getResult.length !== 0) {
        return response.status(409).json({ body: 'user already has registration' })
      }


      const hashPassword = await bcryptjs.hash(passwordTwo, 10)

      await CreatedUserModel.create({
        country,
        district,
        state,
        city,
        street,
        streetNumber,
        phoneValue,
        email,
        hashPassword,
        cnaeCompany,
        CNPJ,
        nameCompany
      });


      let result = await GetUserLoginModel.getUserLogin(CNPJ)

      return response.status(200).json({
        body: {
          CNPJ: result[0].cd_cnpj,
          name: result[0].nm_usuario,
          cd_empresa: result[0].cd_empresa,
          cd_contato: result[0].cd_contato,
          cd_telefone: result[0].cd_telefone,
          nm_email: result[0].nm_email,
          cd_cnae: result[0].cd_cnae,
          cd_endereco: result[0].cd_endereco,
          cd_numero: result[0].cd_numero,
          nm_rua: result[0].nm_rua,
          cd_bairro: result[0].cd_bairro,
          nm_bairro: result[0].nm_bairro,
          cd_cidade: result[0].cd_cidade,
          nm_cidade: result[0].nm_cidade,
          cd_estado: result[0].cd_estado,
          sg_estado: result[0].sg_estado,
          cd_pais: result[0].cd_pais,
          nm_pais: result[0].nm_pais,
          token: generateToken({ id: result.id }),
        }
      })

    } catch (error) {
      console.log(error)
      return response.status(500).json({ body: 'created erro' })
    }

  }

  async putUpdateUserCompany(request, response) {
    const {
      cd_empresa,
      cd_bairro,
      cd_endereco,
      cd_estado,
      cd_pais,
      cd_cidade,
      cd_contato,
      cpfCnpj
    } = request.body;


    if (!cd_empresa || !cd_bairro || !cd_endereco || !cd_estado || !cd_pais || !cd_cidade || !cd_contato) {
      return response.status(404).json({ body: 'missing information' })
    }

    try {
      await CreatedUserModel.putUpdateUserCompany(request.body)

      const CNPJ = cpfCnpj.replace(/[^0-9]/g, '');

      let result = await GetUserLoginModel.getUserLogin(CNPJ)

      function generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
          expiresIn: 86400,
        });
      }

      return response.status(200).json({
        body: {
          CNPJ: result[0].cd_cnpj,
          name: result[0].nm_usuario,
          cd_empresa: result[0].cd_empresa,
          cd_contato: result[0].cd_contato,
          cd_telefone: result[0].cd_telefone,
          nm_email: result[0].nm_email,
          cd_cnae: result[0].cd_cnae,
          cd_endereco: result[0].cd_endereco,
          cd_numero: result[0].cd_numero,
          nm_rua: result[0].nm_rua,
          cd_bairro: result[0].cd_bairro,
          nm_bairro: result[0].nm_bairro,
          cd_cidade: result[0].cd_cidade,
          nm_cidade: result[0].nm_cidade,
          cd_estado: result[0].cd_estado,
          sg_estado: result[0].sg_estado,
          cd_pais: result[0].cd_pais,
          nm_pais: result[0].nm_pais,
          token: generateToken({ id: result.id }),
        }
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ body: 'select erro' })
    }

  }


}
export default new CreatedUserCompany();
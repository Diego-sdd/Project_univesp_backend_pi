import GetUserLoginModel from '../../model/loginUsers/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json';

class LoginUsers {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async index(request, response) {

    const {
      cpfCnpj,
      password
    } = request.query;

    if (!cpfCnpj || !password) {
      return response.status(404).json({ body: 'missing information' })
    }

    try {


      function generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
          expiresIn: 86400,
        });
      }

      const CNPJCPF = cpfCnpj.replace(/[^0-9]/g, '');

      const result = await GetUserLoginModel.getUserLogin(CNPJCPF)


      if (result.length === 0) {
        return response.status(404).json({ body: 'User not found' })
      }

      if (!await bcrypt.compare(password, result[0].cd_senha))
        return response.status(404).send({ error: 'Invalid password' });

      if (result.length === 0) {
        return response.status(404).json({ body: 'User not found' })
      } else {
        delete result[0].cd_senha
        console.log(result)
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
      }

    } catch (error) {
      console.log(error)
      return response.status(500).json({ body: 'created erro' })
    }

  }

}
export default new LoginUsers();
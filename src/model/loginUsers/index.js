import knex from '../../database/knex'

class GetUserLoginModel {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async getUserLogin(cpfCnpj) {
    const dbUser = await knex('tb_empresa')
      .select('*')
      .innerJoin("tb_contato", "tb_contato.cd_empresa", "tb_empresa.cd_empresa")
      .innerJoin("tb_endereco", "tb_endereco.cd_endereco", "tb_empresa.cd_endereco")
      .innerJoin("tb_bairro", "tb_bairro.cd_bairro", "tb_endereco.cd_bairro")
      .innerJoin("tb_cidade", "tb_cidade.cd_cidade", "tb_bairro.cd_cidade")
      .innerJoin("tb_estado", "tb_estado.cd_estado", "tb_cidade.cd_estado")
      .innerJoin("tb_pais", "tb_pais.cd_pais", "tb_estado.cd_pais")
      .where('tb_empresa.cd_cnpj', cpfCnpj)

    return dbUser;

  }


}
export default new GetUserLoginModel()
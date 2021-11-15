import { raw } from 'body-parser';
import knex from '../../database/knex'

class GetUserModel {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async getUser(CNPJ) {

    const dbUser = await knex('tb_empresa')
      .select('cd_empresa')
      .where('cd_cnpj', CNPJ)

    return dbUser;

  }

  async getUserSector(idUser) {
    const dbSector = await knex('tb_funcionario')
      .select(knex.raw(`distinct(tb_setor.nm_setor)`))
      .innerJoin('tb_setor', 'tb_setor.cd_setor', 'tb_funcionario.cd_setor')
      .where('tb_funcionario.cd_empresa', idUser)

    return dbSector;

  }

  async getUsersEmployee(filter) {
    const dbCompany = await knex('tb_funcionario')
      .select(
        'tb_funcionario.cd_funcionario',
        'tb_funcionario.nm_funcionario',
        'tb_funcionario.cd_cpf',
        'tb_funcionario.cd_pis',
        'tb_funcionario.dt_data_nascimento',
        'tb_funcionario.dt_entrada',
        'tb_funcionario.dt_saida',
        'tb_funcionario.nm_cargo',
        'tb_funcionario.ds_atividade',
        'tb_setor.nm_setor',
        'tb_funcionario.ds_imagem'
      )
      .innerJoin('tb_setor', 'tb_setor.cd_setor', 'tb_funcionario.cd_setor')
      .where('cd_empresa', filter)

    return dbCompany;

  }

  async getDataHome(filter) {
    const dbCompany = await knex('tb_funcionario')
      .select('*')
      .innerJoin('tb_empresa', 'tb_empresa.cd_empresa', 'tb_funcionario.cd_empresa')
      .innerJoin('tb_setor', 'tb_setor.cd_setor', 'tb_funcionario.cd_setor')
      .where('tb_empresa.cd_empresa', filter)

    return dbCompany;
  }

}
export default new GetUserModel()
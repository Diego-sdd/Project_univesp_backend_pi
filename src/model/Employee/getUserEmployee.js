import knex from '../../database/knex'

class GetUserModelEmployee {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async getUserLoginEmployee(cpf) {
    const dbUser = await knex('tb_funcionario')
      .select('*')
      .where('cd_cpf', cpf)

    return dbUser;

  }
  async getUserEmployee(id_user) {
    const dbUser = await knex('tb_funcionario')
      .select('*')
      .leftJoin('tb_ppp', 'tb_ppp.cd_funcionario', 'tb_funcionario.cd_funcionario')
      .where('tb_funcionario.cd_funcionario', id_user)
    return dbUser;

  }
  async getUserInfoPPP(id_user) {
    const dbUser = await knex('tb_funcionario')
      .select('*')
      .innerJoin('tb_empresa','tb_empresa.cd_empresa', 'tb_funcionario.cd_empresa')
      .innerJoin('tb_ppp','tb_ppp.cd_funcionario', 'tb_funcionario.cd_funcionario')
      .leftJoin('tb_riscos','tb_riscos.cd_ppp', 'tb_ppp.cd_ppp')
      .where('tb_funcionario.cd_funcionario', id_user)
    return dbUser;

  }
  async created_ppp(data) {
    const dataActual = new Date();

    const createPPP = await knex('tb_ppp')
      .insert({
        'dt_criacao_ppp': dataActual,
        'nm_representante': data.nm_representante,
        'cd_nit': data.cd_nit,
        'cd_funcionario': data.cd_funcionario,
      })
      .returning('id')

    await knex('tb_acidente')
      .insert({
        'dt_acidente': null,
        'cd_cat': null,
        'cd_ppp': createPPP[0]
      })

    data.riscos.map(async (e) => {
      console.log(e)
      await knex('tb_riscos')
        .insert({
          'ds_tipo': null,
          'ds_fator_risco': e.ds_fator_risco,
          'ds_intensidade': e.ds_intensidade,
          'ds_tecnica_usada': e.ds_tecnica_usada,
          'cd_ppp': createPPP[0]
        })
    })

    await knex('tb_responsavel_ambiental')
      .insert({
        'nm_responsavel': data.nm_responsavel_ambientais,
        'cd_nit': data.NIT_ambientais,
        'cd_crea': data.cd_crea,
        'cd_ppp': createPPP[0]
      })

    await knex('tb_requisitos_ambientais')
      .insert({
        'ds_requisitos': 'medidas de proteção coletiva',
        'cd_requisitos_atendidos': data.protecao,
        'cd_ppp': createPPP[0]
      })

    await knex('tb_requisitos_ambientais')
      .insert({
        'ds_requisitos': 'EPI',
        'cd_requisitos_atendidos': data.condicoes,
        'cd_ppp': createPPP[0]
      })
    await knex('tb_requisitos_ambientais')
      .insert({
        'ds_requisitos': 'higienização',
        'cd_requisitos_atendidos': data.higienizacao,
        'cd_ppp': createPPP[0]
      })

    return
  }

}
export default new GetUserModelEmployee()
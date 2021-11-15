import knex from '../../database/knex'

class CreatedUserModelEmployee {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async create(
    name,
    cpfOrCnpj,
    numberPis,
    dtBirth,
    dtAdmission,
    nmSetor,
    nmOffice,
    descriptionActivity,
    phone,
    email,
    ds_imagem,
    cd_empresa
  ) {
    
    const tb_setorId = await knex('tb_setor')
      .insert({
        'nm_setor': nmSetor,
      })
     
    const tb_funcionarioId = await knex('tb_funcionario')
      .insert({
        'nm_funcionario': name,
        'cd_cpf': cpfOrCnpj,
        'cd_pis': numberPis,
        'dt_data_nascimento': dtBirth,
        'dt_entrada': dtAdmission,
        'dt_saida': null,
        'nm_cargo': nmOffice,
        'ds_atividade': descriptionActivity,
        'cd_empresa': cd_empresa,
        'cd_setor': tb_setorId,
        'ds_imagem': ds_imagem,
      })
     

    await knex('tb_contato_funcionario')
      .insert({
        'cd_telefone': phone,
        'nm_email': email,
        'cd_funcionario': tb_funcionarioId
      })


    return tb_funcionarioId
  }

}
export default new CreatedUserModelEmployee()
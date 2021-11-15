import knex from '../../database/knex'

class CreatedUserModel {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async create({
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
  }) {

    const dbCountry = await knex('tb_pais')
      .insert({
        'nm_pais': country
      })

    const dbState = await knex('tb_estado')
      .insert({
        'sg_estado': state,
        'cd_pais': dbCountry
      })

    const dbCity = await knex('tb_cidade')
      .insert({
        'nm_cidade': city,
        'cd_estado': dbState
      })

    const dbDistrict = await knex('tb_bairro')
      .insert({
        'nm_bairro': district,
        'cd_cidade': dbCity
      })

    const dbAddress = await knex('tb_endereco')
      .insert({
        'cd_numero': streetNumber,
        'nm_rua': street,
        'cd_bairro': dbDistrict
      })

    const dbEmployee = await knex('tb_empresa')
      .insert({
        'nm_usuario': nameCompany,
        'cd_cnpj': CNPJ,
        'cd_cnae': cnaeCompany,
        'cd_senha': hashPassword,
        'cd_endereco': dbAddress
      })

    await knex('tb_contato')
      .insert({
        'cd_telefone': phoneValue,
        'nm_email': email,
        'cd_empresa': dbEmployee,
      })

    return dbEmployee;

  }

  async putUpdateUserCompany(data) {

    const CNPJ = data.cpfCnpj.replace(/[^0-9]/g, '');
    const phoneValue = data.phone.replace(/[^0-9]/g, '');
    await knex('tb_empresa')
      .update({
        nm_usuario: data.nameCompany,
        cd_cnpj: CNPJ,
        cd_cnae: data.cnaeCompany,
      })
      .where('tb_empresa.cd_empresa', data.cd_empresa)

    await knex('tb_endereco')
      .update({
        cd_numero: data.streetNumber,
        nm_rua: CNPJ,
      })
      .where('cd_endereco', data.cd_endereco)

    await knex('tb_bairro')
      .update({
        nm_bairro: data.district,
      })
      .where('cd_bairro', data.cd_bairro)

    await knex('tb_cidade')
      .update({
        nm_cidade: data.city,
      })
      .where('cd_cidade', data.cd_cidade)

    await knex('tb_estado')
      .update({
        sg_estado: data.state,
      })
      .where('cd_estado', data.cd_estado)

    await knex('tb_contato')
      .update({
        cd_telefone: phoneValue,
        nm_email: data.email
      })
      .where('cd_contato', data.cd_contato)


    return;
  }


}
export default new CreatedUserModel()
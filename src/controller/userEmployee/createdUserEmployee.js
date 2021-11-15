import CreatedUserModel from '../../model/Employee/createdUserEmployee'
import Employee from '../../model/Employee/getUserEmployee'
class CreatedUserEmployee {
    /**
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     */

    async create(request, response) {

        const {
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
        } = request.body;

        const getResult = await Employee.getUserLoginEmployee(cpfOrCnpj)

        if (getResult.length !== 0) {
            return response.status(409).json({ body: 'user already has registration' })
        }

        try {
            const CNPJCPF = cpfOrCnpj.replace(/[^0-9]/g, '');

            const result = await CreatedUserModel.create(
                name,
                CNPJCPF,
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
            );

            return response.status(200).json(result)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ body: 'created erro' })
        }



    }

}
export default new CreatedUserEmployee();
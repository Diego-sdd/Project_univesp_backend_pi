import CreatedUserModel from '../../model/Employee/createdUserEmployee'
import Employee from '../../model/Employee/getUserEmployee'
import GetUserModel from '../../model/Employee/getUserEmployee'
import ejs from 'ejs'
import pdf from 'html-pdf'
import { join } from 'path'
class CreatedUserEmployee {
    /**
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     */

    async getUserEmployee(request, response) {
        const {
            idUser
        } = request.query;

        if (!idUser) {
            return response.status(404).json({ body: 'missing information' })
        }

        try {
            const result = await Employee.getUserEmployee(idUser)

            return response.status(200).json(result)
        } catch (error) {
            return response.status(500)
        }
    }

    async getDownloadPPPEmployee(request, response) {

        const {
            idUser
        } = request.query;
       
        if (!idUser) {
            return response.status(404).json({ body: 'missing information' })
        }
        
        try {

            const resultUser = await Employee.getUserInfoPPP(idUser)

            ejs.renderFile(join(__dirname, `../../view/resourcers/pdfUser.ejs`), { 
                nameCompany: resultUser[0].nm_usuario,
                cnpj: resultUser[0].cd_cnpj,
                CNAE: resultUser[0].cd_cnae,
                nameEmployee: resultUser[0].nm_funcionario,
                PIS: resultUser[0].cd_pis,
                office: resultUser[0].nm_cargo,
                activity: resultUser[0].ds_atividade
            }, (err, html) => {
                if (err) {
                    console.log(err)
                    return response.status(500).json({ message: 'Error in Server' });
                }

                const options = {
                    format: 'A4',
                }

                pdf.create(html, options).toFile(join(__dirname, `../../../pdf/pdfUser${idUser}.pdf`), (error, res) => {
                    if (!error) {
                        return response.status(200).json({ message: 'PDF Generated' })
                    } else {
                        return response.status(500).json({ message: 'Fail in Generated' })
                    }
                })
            })

        } catch (error) {
            console.log(error)
            return response.status(500)
        }
    }
    async postCreatedPPP(request, response) {
       
        if (!request.body) {
            return response.status(404).json({ body: 'missing information' })
        }
        try {
            const result = await Employee.created_ppp(request.body)
            
            return response.status(200).json(result)
        } catch (error) {
            console.log(error)
            return response.status(500)
        }

    }
    

    async downloadPDF(request, response) {
        const {
            id
        } = request.params;

        if (!id) {
            return response.status(404).json({ body: 'missing information' })
        }

        try {
            response.type('pdf')
            response.download(join(__dirname, `../../../pdf/pdfUser${id}.pdf`))
            
            return response.status(200)
        } catch (error) {
            console.log(error)
            return response.status(500)
        }


    }

}
export default new CreatedUserEmployee();
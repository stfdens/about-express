const muridService = require('../service/MuridService');
const postdata = require('../validations/MuridValidation');

class MuridController {
    static async addData(req, res) {
        try {
            const { error } = postdata.validate(req.body);
            if(!error) {
                await muridService.AddMurid(req.body);
                res.status(200).json({
                    message: 'data berhasil ditambahkan'
                });
            } else {
                res.status(400).json({
                    message: error.message
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Maaf terjadi kesalahan pada server kami'
            })
        }
    }

    static async getData(req, res) {
        try {
            const {error} = await postdata
            const datas = await muridService.getMurid();
            res.status(200).json({
                data: datas,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Maaf terjadi kesalahan pada server kami'
            })
        }
    }
    
    static async getDataByNama(req, res) {
        try {
            const datas = await muridService.getMuridByNama(req.params);
            res.status(200).json({
                data: datas,
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Maaf terjadi kesalahan pada server kami'
            })
        }
    }

    static async updateMuridByName(req, res){
        try {
            await muridService.updateMurid(req.params, req.body)
            res.status(200).json({
                message: 'murid berhasil di update'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Maaf terjadi kesalahan pada server kami'
            })
        }
    }

    static async deleteMuridByName(req, res){
        try {
            await muridService.deleteMuridByName(req.params)
            res.status(200).json({
                message: 'murid berhasil di delete'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Maaf terjadi kesalahan pada server kami'
            })
        }
    }
}

module.exports = MuridController;

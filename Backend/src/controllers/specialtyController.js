import SpecialtyService from "../services/specialtyService"

let createSpecialty = async(req, res) => {
    try
    {
        let infor = await SpecialtyService.createSpecialty(req.body)
        return res.status(200).json(infor)
    }catch(e)
    {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllSpecialties = async(req, res) => {
    try
    {
        let infor = await SpecialtyService.getAllSpecialties()
        return res.status(200).json(infor)
    }catch(e)
    {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailSpecialtiesById = async(req, res) => {
    try
    {
        let infor = await SpecialtyService.getDetailSpecialtiesById(req.query.id, req.query.location)
        return res.status(200).json(infor)
    }catch(e)
    {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createSpecialty,
    getAllSpecialties,
    getDetailSpecialtiesById,
}
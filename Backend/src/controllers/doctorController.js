import doctorSerVice from "../services/doctorService"

let getTopDoctorHome = async(req, res) => {
    let limit = req.query.limit
    if (!limit)limit = 10
    try
    {
        let response = await doctorSerVice.getTopDoctorHome(+limit) // +limit : convert str to int
        return res.status(200).json(response)
    }
    catch(e)
    {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllDoctors = async(req, res) => {
    try
    {
        let doctors = await doctorSerVice.getAllDoctors()
        return res.status(200).json(doctors)
    }catch(e)
    {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postInforDoctors = async(req, res) => {
    try
    {
        let response = await doctorSerVice.saveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    }catch(e)
    {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailDoctorById = async(req, res) => {
    try
    {
        let infor = await doctorSerVice.getDetailDoctorById(req.query.id)
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

let bulkCreateSchedule = async(req, res) => {
    try{
        let infor = await doctorSerVice.bulkCreateSchedule(req.body)
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

let getScheduleByDate = async(req, res) => {
    try{
        let infor = await doctorSerVice.getScheduleByDate(req.query.doctorId, req.query.date)
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

let getExtraInforDoctorById = async(req, res) => {
    try{
        let infor = await doctorSerVice.getExtraInforDoctorById(req.query.doctorId)
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

let getProfileDoctorById = async(req, res) => {
    try{
        let infor = await doctorSerVice.getProfileDoctorById(req.query.doctorId)
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

let getListPatientForDoctor = async(req, res) => {
    try{
        let infor = await doctorSerVice.getListPatientForDoctor(req.query.doctorId, req.query.date)
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

let sendRemedy = async(req, res) => {
    try{
        let infor = await doctorSerVice.sendRemedy(req.body)
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
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctors: postInforDoctors,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy,
}
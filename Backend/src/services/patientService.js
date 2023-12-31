import db from "../models/index"
require('dotenv').config()
import _, { reject, result } from 'lodash'
import emailService from "./emailService"
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
} 

let postBookAppointment = (data) => {
    return new Promise (async(resolve, reject) => {
        try{
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName || !data.selectedGender || !data.address)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else{
                let token = uuidv4()
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                // upsert patient
                // console.log("check data: ", data);
                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    defaults: {
                        email: data.email,  
                        roleId: 'R3',
                        address: data.address,
                        gender: data.selectedGender,
                        firstName: data.fullName
                    }

                })

                console.log("check user db: ", user[0]);
                // create a booking record
                if (user && user[0])
                {
                    await db.Booking.findOrCreate({
                        where: {patientId: user[0].id},
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                            patientId: user[0].id,
                            token: token
                        }

                    }) 
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                })
            }
        }
        catch(e)
        {
            reject(e)
        }
    })
}

let verifyBookAppointment = (data) => {
    return new Promise (async(resolve, reject) => {
        try{
            if (!data.token || !data.doctorId)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else
            {
                let appointment = await db.Booking.findOne({
                    where: 
                    {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false // dùng raw: false thì ms có thể update đc và trả về 1 sequelize (raw: true trả về 1 object)
                })
                if (appointment)
                {
                    appointment.statusId = 'S2'
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Update appointment succeed!'
                    })
                }
                else
                {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist!'
                    })
                }
            }
        }catch(e)
        {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment,
    verifyBookAppointment,
}
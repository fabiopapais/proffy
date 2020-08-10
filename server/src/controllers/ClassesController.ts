import { Request, Response } from 'express'
require('dotenv').config()

import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(req: Request, res: Response) {
        const filters = req.query

        if (!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({ error: "Missing filters" })
        }

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        const timeInMinutes = convertHourToMinutes(time as string)

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
            .where('classes.subject', '=', subject)  
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

            const serializedClasses = classes.map(serializedClass => {
                return {
                    ...serializedClass,
                    avatar: `http://${process.env.DOMAIN}:3333/uploads/${serializedClass.avatar}`
                }
            })
        
        return res.json(serializedClasses)
    }

    async create(req: Request, res: Response) {
        const { name, whatsapp, bio, subject, cost, schedule } = req.body
        const avatar = req.file.filename

        const transaction = await db.transaction()

        try {
            const insertedUsersId = await transaction('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            })
            const user_id = insertedUsersId[0]

            const insertedClassesId = await transaction('classes').insert({
                subject,
                cost: Number(cost),
                user_id
            })
            const class_id = insertedClassesId[0]

            const classSchedule = JSON.parse(schedule).map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })

            await transaction('class_schedule').insert(classSchedule)

            await transaction.commit()

            return res.status(201).send("Sucess")
        } catch (err) {
            await transaction.rollback()
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}
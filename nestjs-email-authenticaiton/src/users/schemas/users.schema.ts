import { MongooseModule } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({

    id: String,
    data: {type: Date, default: Date.now},
    name: String,
    surname: String,
    email: String, 
    phone: String,
    password: String,
    birthdaydate: Date, 
    roles: [],
    auth: {
        email: {
            valid: { type: Boolean, default: false}
        },
        facebook: {
            userId: String,
        },
        google: {
            userId: String,
        }
    },
    settings: {},
    photos: {
        profilePic: {},
        gallery: {},


    }


})
import { MongooseModule } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({

    id: String,
    name: String,
    surname: String,
    email: String, 
    phone: String,
    birthDate: Date, 
    roles: [],
    auth: {
        email: {
            type: Boolean, default: false
        },
        facebook: {
            userId: String,
        },
        google: {
            userId: String,
        }
    },
    photos: {
        photoPic: {type: String},

    }




})
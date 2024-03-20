import { Document } from 'mongoose';


export interface User extends Document {
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthdaydate: Date,
    password: string;
    roles: string[],
    auth: {
        email: {
            valid: boolean,
        },
        facebook: {
            userId: string 
        },
        gmail: {
            userId: string
        }
    },
    settings: {

    },
    photos: {
        profilePic: Photo;
        gallary: Photo[];
    }
}


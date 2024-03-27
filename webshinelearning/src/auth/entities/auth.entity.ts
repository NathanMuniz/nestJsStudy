import { Column, Entity } from "typeorm";

export type Role = {
    USER: 'user',
    ADMIN: 'admin'
}

@Entity()
export class AuthEntity {

    @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string; 

    @Column()
    phoneNumber: string; 

    @Column()
    password: string; 

    @Column()
    isActivated: boolean;

    @Column({
        default: 'user'
    })
    Role: Role;


}

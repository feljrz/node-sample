import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("users")
class User{

    @PrimaryColumn()
    readonly id: string;

    @Column() /*@Column("name") caso o atributo tenha nome diferente na tabela*/
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { User }
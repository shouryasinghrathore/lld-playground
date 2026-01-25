import { Slot } from "./Slots";


export class Doctor{
    constructor(public DoctorId:string, public name:string ,public specialization:string ,public slots:Slot[]){}
}
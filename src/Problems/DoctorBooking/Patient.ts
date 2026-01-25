import { Appointment } from "./Appointment";

export class Patient {
    private appointments: Appointment[] = [];
    constructor(public patientId: string, public name: string) { }
    addAppointment(appointment:Appointment) {
        this.appointments.push(appointment)
    }
    removeAppointment(appointmentId:string){
        this.appointments = this.appointments.filter((app)=>app.appointmentId!= appointmentId);
    }
}
import { Appointment } from "./Appointment";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Slot } from "./Slots";
import crypto from "crypto";

export class AppointmentService{
    createBooking( slot:Slot,doctor:Doctor,patient:Patient){
        if(!slot.isAvailable()){
            throw new Error("already booked slot")
        }
        slot.book();
        const appointment = new Appointment(crypto.randomUUID(),doctor.DoctorId,patient.patientId,slot.slotId)
        appointment.confirm();
        patient.addAppointment(appointment);
        return appointment;
    }
    cacelBooking(appointment:Appointment,slot:Slot){
         appointment.cancel(); 
         slot.release();
    }
}
console.log(crypto.randomUUID())
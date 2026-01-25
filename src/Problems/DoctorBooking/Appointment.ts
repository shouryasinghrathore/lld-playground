import { AppointmentStatus } from "./AppointmentStatus";

export class Appointment {
    public status: AppointmentStatus = AppointmentStatus.CREATED;
    constructor(public appointmentId: string, public doctorId: string, public patientId: string, public slotId: string) { }
    confirm() {
        this.status = AppointmentStatus.CONFIRMED;
    }

    cancel() {
        if (this.status === AppointmentStatus.CANCELLED) {
            throw new Error("Already cancelled");
        }
        this.status = AppointmentStatus.CANCELLED;
    }
}
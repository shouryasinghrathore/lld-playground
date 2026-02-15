import { HospitalFactory } from "./factory";

const hospital = new HospitalFactory();
const apollo = hospital.createHospital("apollo");
apollo.bookAppointment()

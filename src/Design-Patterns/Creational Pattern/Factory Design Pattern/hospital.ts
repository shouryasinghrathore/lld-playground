abstract class Hospital {
    abstract bookAppointment(): void;
    abstract cancelAppointment(): void;
}

export class ApolloHospital extends Hospital {
    bookAppointment() {
        console.log("appointment booked apollo hospital")
    }
    cancelAppointment() {
        console.log("appointment cancelled apollo hospital")
    }
}

export class MedicoverHospital extends Hospital {
    bookAppointment() {
        console.log("appointment booked medicover hospital")
    }
    cancelAppointment() {
        console.log("appointment cancelled medicover hospital")
    }
}
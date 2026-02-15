import { ApolloHospital, MedicoverHospital } from "./hospital";

export class HospitalFactory {
    createHospital(type: string) {
        switch (type.toLowerCase()) {
            case "apollo":
                return new ApolloHospital();
            case "medicover":
                return new MedicoverHospital();
            default:
                throw new Error("NO HOSPITAL FOUND");
        }
    }
}
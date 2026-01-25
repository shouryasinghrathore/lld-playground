export class Slot {
    private booked = false
    constructor(public slotId: string, public doctorId: string, public readonly startTime: Date,
        public readonly endTime: Date) { }

    book() {
        if (this.booked) {
            throw new Error("Slot already booked");
        }
        this.booked = true;
    }
    release() {
        this.booked = false;
    }
    isAvailable(): boolean {
        return !this.booked;
    }
}
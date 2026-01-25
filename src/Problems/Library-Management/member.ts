import { Book } from './book';

export class Member {
    private borrowedBooks: Book[] = [];
    constructor(private name: string,
        private memberId: string,
        private phoneNumber: string,
     
    ) { }

    public getName(): string {
        return this.name;
    }

    public getMemberId(): string {
        return this.memberId;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public returnBook(book: Book): void {
     const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
        }   
    }
    public borrowBook(book: Book): void {
        this.borrowedBooks.push(book);
    }

    public getBorrowedBooks(): Book[] {
        return this.borrowedBooks;
    }
}
import { Book } from './book';
import { Member } from './member';

export class LibraryManager {
    private static instance: LibraryManager;
    private books: Map<string, Book> = new Map();
    private members: Map<string, Member> = new Map();
    private MAX_BOOKS_PER_MEMBER = 5;
    private LOAN_DURATION_DAYS = 14;
    private constructor() { }

    static getInstance(): LibraryManager {
        if (!LibraryManager.instance) {
            LibraryManager.instance = new LibraryManager();
        }
        return LibraryManager.instance;
    }


    public addBook(book: Book): void {
        this.books.set(book.getIsbn(), book)
    }

    public removebook(isbn: string) {
        this.books.delete(isbn)
    }

    public getBook(isbn: string): Book | undefined {
        return this.books.get(isbn);
    }

    public registerMember(member: Member) {
        this.members.set(member.getMemberId(), member);
    }

    public unregisterMember(memberId: string) {
        this.members.delete(memberId);
    }

    public getMember(memberId: string): Member | undefined {
        return this.members.get(memberId);
    }

    public borrowBook(memberId: string, isbn: string): void {
        const member = this.members.get(memberId);
        const book = this.books.get(isbn);
        if (member && book) {
            if (member?.getBorrowedBooks().length <= this.MAX_BOOKS_PER_MEMBER) {
                if (book.getAvailability()) {
                    member.borrowBook(book);
                    book.setAvailability(false);
                    console.log(`Book ${book.getTitle()} borrowed by member ${member.getName()}`);
                } else {
                    throw new Error("Book is not available");
                }
            }
            else {
                throw new Error("Member has reached the maximum limit of borrowed books");
            }
        } else {
            throw new Error("Member or Book not found");
        }
    }
    public returnBook(memberId: string, isbn: string): void {
        const member = this.members.get(memberId);
        const book = this.books.get(isbn);
        if (member && book) {
            member.returnBook(book);
            book.setAvailability(true);
            console.log(`Book ${book.getTitle()} returned by member ${member.getName()}`);
        } else {
            throw new Error("Member or Book not found");
        }
    }

    public searchBooksByKeyword(keyword: string): Book[] {
        const res = Array.from(this.books.values()).filter(book => book.getAuthor().includes(keyword) || book.getTitle().includes(keyword))
        return res;
    }

}
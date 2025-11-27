export class Book {
    available: boolean = true;
    constructor(private title: string, private author: string, private isbn: string, private publicationYear: number) {
    }

    getIsbn(): string {
        return this.isbn;
    }
    getTitle(): string {
        return this.title;
    }
    getAuthor(): string {
        return this.author;
    }
    getPublicationYear(): number {
        return this.publicationYear;
    }
    getAvailability(): boolean {
        return this.available;
    }

    setAvailability(status: boolean): void {
        this.available = status;
    }
    
}
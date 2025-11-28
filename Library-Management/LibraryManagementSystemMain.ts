import { Book } from './book';
import { LibraryManager } from './LibraryManger';
import { Member } from './member';
const lib = LibraryManager.getInstance();

lib.addBook(new Book("life journey", "shourya", "a123", 2020));
lib.addBook(new Book("my journy", "kavya singh", "a1234", 2020));
lib.addBook(new Book("roses lilly", "jay singh", "a1234", 2020));


lib.registerMember(new Member("shourya", "m123", "9876543210"));
lib.registerMember(new Member("shourya", "m1234", "9876543219"));

lib.borrowBook("m123", "a123");
lib.returnBook("m123", "a123");

console.log("Available books after return:");

console.log(lib.searchBooksByKeyword("li"));
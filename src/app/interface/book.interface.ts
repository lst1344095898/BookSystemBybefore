
export interface Book {
    bookid: string;
    authorName: string;
    bookName: string;
    educationName: string;
    quantity: number;
}
export interface BookTop {
    bookName: string;
    authorName: string;
    borrowTimes: number;
}
export interface UserTop {
    userName: string;
    borrowTimes: number;
}
export interface BorrowBookInfo {
    userid: string;
    bookid: string;
    authorName: string;
    bookName: string;
    educationName: string;
    startTime: string;
}


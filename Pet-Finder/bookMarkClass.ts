import { BookMark } from "./types";
import { localStorage } from "./localstorage";

export class BookMarkList {
  private bookMarkList: BookMark = {};
  constructor() {
    const storedBookMarks = localStorage.getItem("BookMarkList");
    if (storedBookMarks) {
      this.bookMarkList = JSON.parse(storedBookMarks);
    }
  }

  getBookMark(petId: number) {
    return this.bookMarkList.hasOwnProperty(petId);
  }

  // Method for adding bookmark to the bookMarkList
  addBookmark(petName: string, petId: number) {
    const bookMark_exist = this.getBookMark(petId);
    if (bookMark_exist) return null;

    this.bookMarkList = { ...this.bookMarkList, [petId]: petName };

    // Saving bookMarkList after adding to local storage
    localStorage.setItem("BookMarkList", JSON.stringify(this.bookMarkList));
  }

  // Method to remove bookmark
  removeBookMark(petId: number) {
    const bookMark_exist = this.getBookMark(petId);
    if (!bookMark_exist) return false;

    delete this.bookMarkList[petId];

    // Saving bookmarkList after removing to local storage
    localStorage.setItem("BookMarkList", JSON.stringify(this.bookMarkList));
  }

  // Displaying list of bookmark
  displayBookMarkList() {
    return Object.values(this.bookMarkList);
  }
}

// creating instance
export const bookMarkList: BookMarkList = new BookMarkList();

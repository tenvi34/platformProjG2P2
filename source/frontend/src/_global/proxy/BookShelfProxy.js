import ServerProxy from './ServerProxy';

class BookShelfProxy {
    static async createBookShelf(title, isShared=false) {
        await ServerProxy.request("put", "bookShelf", "bookShelfs/createBookShelf", {
            "title": title, 
            "isShared": isShared
        })
    }
}

export default BookShelfProxy
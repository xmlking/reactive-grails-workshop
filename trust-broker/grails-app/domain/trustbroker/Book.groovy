package trustbroker

import org.bson.types.ObjectId

class Book {
    ObjectId id
    String title
    Date releaseDate
    String ISBN
    Double price
    static constraints = {
        releaseDate nullable: true
        ISBN(nullable: true, blank: true)
        price nullable: true
    }
}
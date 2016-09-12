import grangular.Book
import grangular.Todo

class BootStrap {

    def init = { servletContext ->
        // Check whether the data already exists.
        if(!Todo.count().toBlocking().first()) {
            createTodos()
        }
        if(!Book.count().toBlocking().first()) {
            createBooks()
        }
    }
    def destroy = {
    }

    private void createTodos() {
        println "Creating Todo Entities... "
        5.times {
            new Todo(description: "Todo ${it+1}").save().toBlocking().first()
        }
    }
    private void createBooks() {
        println "Creating Book Entities... "
        5.times {
            new Book(title: "Book  ${it+1}", ISBN: "BOOK  ${it+1}", releaseDate: new Date(), price: 35.45 +it).save().toBlocking().first()
        }
    }
}

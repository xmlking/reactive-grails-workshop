import grangular.Todo

class BootStrap {

    def init = { servletContext ->
        // Check whether the data already exists.
        if(!Todo.count().toBlocking().first()) {
            createEntities()
        }
    }
    def destroy = {
    }

    private void createEntities() {
        println "Creating Todo Entities... "
        5.times {
            new Todo(description: "Todo ${it+1}").save().toBlocking().first()
        }
    }
}

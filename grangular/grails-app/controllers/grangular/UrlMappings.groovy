package grangular

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        "/"(view: '/index')
        "500"(view: '/error')
        "404"(view: '/notFound')
        "/api/todos"(resources:'todo')
        "/api/pendingTodos"(controller: 'todo', action: 'pending')
        "/api/guest/stream"(resources:'stream')
        "/api/books"(resources:'book')
        "/api/test"(controller:"book", action: 'testAction',  method:"GET")
    }
}

package grangular

import grails.rx.web.RxController
import grails.validation.ValidationException
import groovy.transform.CompileStatic

import static org.springframework.http.HttpStatus.*
import static rx.Observable.*
import grails.rx.web.*

@CompileStatic
class BookController implements RxController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        zip( Book.list(params), Book.count() ) { List bookList, Number count ->
            rx.render view:"index", model:[bookList: bookList, bookCount: count]
        }
    }

    def show() {
        Book.get((Serializable)params.id)
    }

    def save() {
        rx.bindData(new Book(), request)
                .switchMap { Book book ->
            if(book.hasErrors()) {
                just(
                    rx.respond( book.errors, view:'create')
                )
            }
            else {
                book.save(flush:true)
                        .map { Book savedBook ->
                    rx.respond savedBook, [status: CREATED, view:"show"]
                }
                .onErrorReturn { Throwable e ->
                    if(e instanceof ValidationException) {
                        rx.respond e.errors, view:'create'
                    }
                    else {
                        log.error("Error saving entity: $e.message", e)
                        return INTERNAL_SERVER_ERROR
                    }
                }
            }

        }
    }

    def update() {
        def request = this.request
        Book.get((Serializable)params.id)
                    .switchMap { Book book ->
            rx.bindData( book, request )
                    .switchMap { Book updatedBook ->
                !updatedBook.hasErrors()? updatedBook.save() : updatedBook
            }
        }
        .map { Book book ->
            if(book.hasErrors()) {
                rx.respond book.errors, view:'edit'
            }
            else {
                rx.respond book, [status: OK, view:"show"]
            }
        }
        .switchIfEmpty(
            just( rx.render(status: NOT_FOUND) )
        )
        .onErrorReturn { Throwable e ->
            if(e instanceof ValidationException) {
                rx.respond e.errors, view:'edit'
            }
            else {
                log.error("Error saving entity: $e.message", e)
                return INTERNAL_SERVER_ERROR
            }
        }
    }

    def delete() {
        Book.get((Serializable)params.id)
                    .switchMap { Book book ->
            book.delete()
        }
        .map {
            rx.render status: NO_CONTENT
        }
    }
}

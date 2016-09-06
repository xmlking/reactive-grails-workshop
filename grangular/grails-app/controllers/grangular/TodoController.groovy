package grangular

import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.annotation.Secured
import grails.rx.web.RxController
import grails.validation.ValidationException
import groovy.transform.CompileStatic

import org.springframework.web.bind.annotation.CrossOrigin

import static groovy.transform.TypeCheckingMode.*
import static org.springframework.http.HttpStatus.*
import static rx.Observable.*
import grails.rx.web.*

@CompileStatic
//@CrossOrigin(origins = "http://localhost:3000")
@Secured('ROLE_USER')
class TodoController implements RxController {
    def springSecurityService
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @CompileStatic(SKIP)
    def index(Integer max) {
        def user = springSecurityService.principal
        log.debug( user.username)
//        log.debug( user.organizationId )
        params.max = Math.min(max ?: 10, 100)
        zip( Todo.list(params), Todo.count() ) { List todoList, Number count ->
            rx.render view:"index", model:[todoList: todoList, todoCount: count]
        }
    }

    def show() {
        Todo.get((Serializable)params.id)
    }

    def save() {
        rx.bindData(new Todo(), request)
                .switchMap { Todo todo ->
            if(todo.hasErrors()) {
                just(
                    rx.respond( todo.errors, view:'create')
                )
            }
            else {
                todo.save(flush:true)
                        .map { Todo savedTodo ->
                    rx.respond savedTodo, [status: CREATED, view:"show"]
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
        Todo.get((Serializable)params.id)
                    .switchMap { Todo todo ->
            rx.bindData( todo, request )
                    .switchMap { Todo updatedBook ->
                !updatedBook.hasErrors()? updatedBook.save() : updatedBook
            }
        }
        .map { Todo todo ->
            if(todo.hasErrors()) {
                rx.respond todo.errors, view:'edit'
            }
            else {
                rx.respond todo, [status: OK, view:"show"]
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
        Todo.get((Serializable)params.id)
                    .switchMap { Todo todo ->
            todo.delete()
        }
        .map {
            rx.render status: NO_CONTENT
        }
    }
}

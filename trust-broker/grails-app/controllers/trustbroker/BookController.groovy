package trustbroker


import grails.rest.*
import grails.converters.*
import grails.plugin.springsecurity.annotation.Secured
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = "http://localhost:3000")
@Secured('ROLE_USER')
class BookController extends RestfulController {
    def springSecurityService

    static responseFormats = ['json', 'xml']
    BookController() {
        super(Book)
    }
    def testAction() {
        def user = springSecurityService.principal
        log.error( user.firstName)
        log.error( user.organizationId)
        log.error( springSecurityService.currentUser?.organization?.name)
        render "test done"
    }
}

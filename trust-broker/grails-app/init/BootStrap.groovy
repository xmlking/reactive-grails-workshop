import grails.mongodb.geo.Point
import trustbroker.*

class BootStrap {

    def init = { servletContext ->
        // Check whether the data already exists.
        if(!User.count()) {
            createUsers()
        }
    }
    def destroy = {
    }

    private void createUsers() {
        Role superRole = new Role(authority: 'ROLE_SUPERADMIN').save(flush: true, failOnError:true)
        Role adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true, failOnError:true)
        Role userRole = new Role(authority: 'ROLE_USER').save(flush: true, failOnError:true)
        User superUser = new User(firstName: 'super', lastName: 'demo', email: 'super@demo.com', username: 'super', password: 'super123').save(flush: true, failOnError:true)
        User adminUser = new User(firstName: 'sumo', lastName: 'demo', email: 'sumo@demo.com', username: 'admin', password: 'admin123').save(flush: true, failOnError:true)
        User basicUser = new User(firstName: 'fn_basic', lastName: 'ln_basic', email: 'basic@demo.com', username: 'user', password: 'user123').save(flush: true, failOnError:true)
        UserRole.create superUser, superRole, true
        UserRole.create adminUser, adminRole, true
        UserRole.create basicUser, userRole, true

        def sumoOrg = new Organization(
                name: 'CrossBusiness',
                workAddress: new Address(street: '1234 main st', city: 'Riverside', state: 'CA', zipCode: 92503, location: new Point(50, 50) ),
                billingAddress: new Address(street: '1234 billing st', city: 'Riverside', state: 'CA', zipCode: 92505, location: new Point(150, 150) )
        )
                .addToUsers(firstName: 'fn_basic1', lastName: 'ln_basic1', email: 'basic1@demo.com', username: 'basic1', password: 'basic123')
                .addToUsers(firstName: 'fn_basic2', lastName: 'ln_basic2', email: 'basic2@demo.com', username: 'basic2', password: 'basic123')
                .save(flush: true, failOnError:true)
        sumoOrg.users.each {
            UserRole.create it, userRole, true
        }

        def demoOrg = new Organization(
                name: 'DumoBusiness',
                workAddress: new Address(street: '1234 main st', city: 'Riverside', state: 'CA', zipCode: 92503, location: new Point(50, 50) ),
                billingAddress: new Address(street: '1234 billing st', city: 'Riverside', state: 'CA', zipCode: 92505, location: new Point(150, 150) )
        )
                .addToUsers(firstName: 'fn_basic3', lastName: 'ln_basic3', email: 'basic3@demo.com', username: 'basic3', password: 'basic123')
                .save(flush: true, failOnError:true)
        demoOrg.users.each {
            UserRole.create it, userRole, true
        }

    }

}

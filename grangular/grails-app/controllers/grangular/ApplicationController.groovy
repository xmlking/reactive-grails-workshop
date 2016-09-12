package grangular

import grails.core.GrailsApplication
import grails.plugin.springsecurity.annotation.Secured
import grails.util.Environment
import grails.plugins.*

@Secured(["permitAll"])
class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager

    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }
}

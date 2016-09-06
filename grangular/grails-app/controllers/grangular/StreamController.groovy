package grangular

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*
import grails.rx.web.Rx
import grails.rx.web.RxController
import groovy.transform.CompileStatic
import rx.Subscriber
import rx.Observable

@CompileStatic
@Secured(["permitAll"])
class StreamController implements RxController {
	static responseFormats = ['json', 'xml']

    def index() {
        Rx.stream "ticktock", Observable.create({ Subscriber subscriber ->
            for(i in (0..5)) {
                if(i % 2 == 0) {
                    subscriber.onNext(
                            rx.render("Tick")
                    )
                }
                else {
                    subscriber.onNext(
                            rx.render("Tock")
                    )

                }
                sleep 1000
            }
            subscriber.onCompleted()
        }  as Observable.OnSubscribe<String>)
    }

    def indexOld() {
        Rx.stream { Subscriber subscriber ->
            for(i in (0..5)) {
                if(i % 2 == 0) {
                    subscriber.onNext(
                            rx.render("Tick")
                    )
                }
                else {
                    subscriber.onNext(
                            rx.render("Tock")
                    )

                }
                sleep 1000
            }
            subscriber.onCompleted()
        }
    }
}

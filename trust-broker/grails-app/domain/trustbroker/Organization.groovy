package trustbroker

import grails.mongodb.geo.Point
import org.bson.types.ObjectId

enum StatusType {
    ACTIVE("active"),
    INACTIVE("inactive"),
    PENDING("pending")

    final String name
    StatusType(String name) {
        this.name = name
    }
}

class Organization {

    static hasMany = [users: User]

    ObjectId id
    String name
    StatusType status = StatusType.ACTIVE
    Address workAddress
    Address billingAddress
    static embedded = ['workAddress', 'billingAddress']

    static constraints = {
        name unique: true, blank: false, size: 2..50
    }
    static mapping = {
        name index:true
    }
}

class Address {
    String street
    String city
    String state
    String zipCode
    Point location

    static constraints = {
        street blank: false
        city blank: false
        state blank: false, size: 2..2, inList: ['AL', 'AK', 'AR', 'AZ', 'CA',
                                                 'CO', 'CT' ,'DE' ,'FL', 'GA',
                                                 'HI', 'LA' ,'ID', 'IL' ,'IN',
                                                 'KS', 'KY', 'LA', 'MA', 'ME',
                                                 'MD', 'MI', 'MN', 'MO', 'MS',
                                                 'MT', 'NE', 'NC', 'ND', 'NH',
                                                 'NJ', 'NM', 'NV', 'NY', 'OH',
                                                 'OK', 'OR', 'PA', 'RI', 'SC',
                                                 'SD', 'TN', 'TX', 'UT', 'VT',
                                                 'VA', 'WA', 'DC', 'WV', 'WI', 'WY']
        zipCode blank: false, size: 5..5, validator: {val, obj -> val?.isNumber()}
    }
    static mapping = {
        location geoIndex:'2dsphere'
    }
}



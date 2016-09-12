package grangular

import grails.gorm.rx.mongodb.RxMongoEntity
import org.bson.types.ObjectId

class Todo implements RxMongoEntity<Todo> {
    ObjectId id
    String description
    boolean done = false
}

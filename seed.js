var StatusENUMS  = {
    ACTIVE : "ACTIVE",
    COMPLETE: "COMPLETE",
    DELETED: "DELETED"
}
var todos = {
    1 : {title: "Understand Git", status: StatusENUMS.ACTIVE},
    2 : {title: "Install Webstorm ", status: StatusENUMS.ACTIVE},
    3 : {title: "Learn CSS", status: StatusENUMS.ACTIVE},
    4 : {title: "Some Todo 1", status: StatusENUMS.DELETED},
    5 : {title: "Some Todo 2", status: StatusENUMS.DELETED},
    6 : {title: "Async JS", status: StatusENUMS.COMPLETE},
    7 : {title: "Install WebStorm", status: StatusENUMS.COMPLETE},
    8 : {title: "Understand Callbacks", status: StatusENUMS.COMPLETE}
}

var nex_todo_id = 9;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : nex_todo_id
}
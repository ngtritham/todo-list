// Remove

let removeTask = (currentElement) => {
    let currentTask = $(currentElement).parent().parent().parent();
    let taskId = currentTask.attr('id');
    // Xóa task khỏi list hiện tại
    currentTask.remove();

    $.ajax({
        url: "/removeTask",
        type: "POST",
        dataType: "json",
        data: {
            taskId: taskId
        },
        success: (msg) => {
            console.log("Removing succeed !!!")
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log("Removing failed !!!")
        }
    });
}

let toggleAddChildTaskModal = (currentElement) => {
    let currentTask = $(currentElement).parent().parent().parent();
    let parent_id = currentTask.attr('id');

    document.cookie = "parent_id=" + parent_id;
    $("#addChildTaskModal").modal();
}

let toggleEditTaskModal = (currentElement) => {
    let currentTask = $(currentElement).parent().parent().parent();
    let currentId = currentTask.attr('id');

    document.cookie = "taskEdittingId=" + currentId;
    $("#editTaskModal").modal();
}
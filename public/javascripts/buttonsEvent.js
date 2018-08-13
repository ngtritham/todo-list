// Remove

let removeTask = (currentElement) => {
    let currentTask = $(currentElement).parent().parent().parent();
    let taskId = currentTask.attr('id');
    // Xóa task khỏi list hiện tại
    currentTask.remove();

    console.log("current task: ", currentTask);
    console.log("task ID: ", taskId);
    $.ajax({
        url: "/removeTask",
        type: "POST",
        dataType: "json",
        data: {
            taskId: taskId
        },
        success: (msg) => {
            console.log("Removing succeed !!!");
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log("Removing failed !!!");
        }
    });
}

let toggleAddChildTaskModal = (currentElement) => {
    let currentTask = $(currentElement).parent().parent().parent();
    let parent_id = currentTask.attr('id');
    console.log("Add chile parent id: ", parent_id);
    //document.cookie = "parent_id=" + parent_id;
    $("#addChildTaskModal").modal();
    $("#parent_id").val(parent_id);
}

let toggleEditTaskModal = (currentElement) => {
    let currentTask = $(currentElement).parent().parent().parent();
    let currentId = currentTask.attr('id');

    //document.cookie = "taskEdittingId=" + currentId;
    $("#editTaskModal").modal();
    $("#taskId").val(currentId);
}

let toggleUploadThumbnailModal = (currentElement) => {
    let currentTask = $(currentElement).parent().parent().parent();
    let currentId = currentTask.attr('id');

    console.log("Upload thumbnail task ID: ", currentId);
    $("#uploadThumbnailModal").modal();
    $("#task_upload_id").val(currentId);
}
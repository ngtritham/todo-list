$(document).on('click', '.task', function (event) {
    event.stopPropagation();

    let taskId = $(this).attr('id');

    let isChecked = $(this).hasClass("checked");
    let status = !isChecked === true ? 1 : 0;
    console.log(status);

    if (!isChecked) {
        $(this).addClass("checked");
    } else {
        $(this).removeClass("checked");
    }
    //console.log(taskId + "  " + status);
    $.ajax({
        url: "/updateStatus",
        type: "POST",
        dataType: "text",
        data: {
            taskId: taskId,
            status: status
        },
        success: (msg) => {
            console.log("Checking succeed !!!");
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log("Checking failed !!!");
        }
    });
});


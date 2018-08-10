$(document).on('click', '.contentFrame', function (event) {
    event.stopPropagation();

    let taskId = $(this).parent().parent().attr('id');

    let isChecked = $(this).hasClass("checked");
    let status = !isChecked === true ? 1 : 0;
    let status_log = '';
    // console.log("task");
    // console.log(status);
    console.log(taskId + "  " + status);
    if (!isChecked) {
        $(this).addClass("checked");
        status_log = 'Checked';
    } else {
        $(this).removeClass("checked");
        status_log = 'Pending';
    }

    $.ajax({
        url: "/updateStatus",
        type: "POST",
        dataType: "text",
        data: {
            taskId: taskId,
            status: status,
            status_log: status_log
        },
        success: (msg) => {
            console.log("Checking succeed !!!");
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log("Checking failed !!!");
        }
    });
});


let loadTask = (tasks, parent_id) => {
    let html = '';
    let tempArr = [];
    tasks.forEach(element => {
        if (element.parent_id === parent_id)
            tempArr.push(element);
    });


    if (tempArr.length > 0) {
        html += "<ul>";
        for (let i = 0; i < tempArr.length; i++) {
            html += "<li>" + "<div class='row'> <div class='col-xs-6'>";
            html += tempArr[i].content + "</div>";
            html += "<div class='col-xs-4'>" + tempArr[i].start_date + " - " + tempArr[i].end_date + "</div>";
            html += "<div class='col-xs-2'>";
            html += "<span class='option'><i class='fas fa-plus'></i><span>";
            html += "<span class='option'><i class='fas fa-pen'></i><span>";
            html += "<span class='option'><i class='fas fa-times'></i><span>";
            html += "<span class='option'><i class='fas fa-caret-down'></i><span>";
            html += "</div>";
            loadTask(tasks, tempArr[i].id);
            html += "</li>";
        }
        html += "</ul>";
    }

    return html;
}


$.ajax({
    url: "/showTask",
    type: "get",
    dataType: "json",
    success: function (result) {
        $("#taskList").append(loadTask(result, 0));
    }
});

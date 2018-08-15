let loadTasks = (tasks, parent_id) => {
    let tempArr = [];

    tasks.forEach(element => {
        if (element.parent_id === parent_id && element.status !== 2) {
            tempArr.push(element);
        }
    });


    if (tempArr.length < 1) {
        return;
        console.log("Không có task với parent_id = " + parent_id);
    }

    // Thêm node UL vào LI parent
    let ul = $("<ul></ul>");
    let parentNode = $("#" + parent_id).append(ul);

    // Thêm các node LI (Task) vào node UL trên
    tempArr.forEach(element => {
        let li = $("<li></li>");
        li.attr("id", element.id);
        //li.attr("onclick", "toggleChecked(this)");
        li.attr("class", "task");

        let row = $("<div></div>");
        row.addClass("row");

        // Show thumbnail 1 col
        let thumbnail = $("<div></div>");
        thumbnail.addClass('col-xs-1');
        thumbnail.addClass('thumbnailFrame');
        if (element.thumbnail_url) {
            let img = "<img src='" + element.thumbnail_url + "' class='thumnail img-rounded '>";
            thumbnail.append(img);
        }

        row.append(thumbnail);

        // Đổ content ra 5 col của LI
        let content = $("<div></div>");
        content.addClass("col-xs-5");
        content.addClass("contentFrame");
        if (element.status === 1) {
            content.addClass("checked");
        }
        content.append(element.content);

        row.append(content);

        // Đổ Duration ra 4 col tiếp theo của LI
        let duration = $("<div></div>");
        duration.addClass("col-xs-3");
        duration.addClass("durationFrame");
        duration.text(element.start_date + " - " + element.end_date);
        row.append(duration);

        // 2 col còn lại hiển thị các nút
        let bunttons = $("<div></div>");
        bunttons.addClass("col-xs-3");
        // Nút xóa
        let removeBtn = $("<span></span>");
        removeBtn.attr("class", "removeBtn");
        removeBtn.attr("onclick", "removeTask(this)");
        removeBtn.html("<i class='fas fa-times'></i>");

        // Nút thêm task con
        let addBtn = $("<span></span>");
        addBtn.attr("class", "addBtn");
        addBtn.attr("onclick", "toggleAddChildTaskModal(this)");
        addBtn.html("<i class='fas fa-plus'></i>");

        // Nút dropdown
        let dropdownBtn = $("<span></span>");
        dropdownBtn.attr("class", "dropdownBtn");
        dropdownBtn.html("<i class='fas fa-caret-down'></i>");

        // Nút edit
        let editBtn = $("<span></span>");
        editBtn.attr("class", "editBtn");
        editBtn.attr("onclick", "toggleEditTaskModal(this)");
        editBtn.html("<i class='fas fa-edit'></i>");

        //Nút upload
        let uploadBtn = $("<span></span>");
        uploadBtn.attr("class", "uploadBtn");
        uploadBtn.attr("onclick", "toggleUploadThumbnailModal(this)");
        uploadBtn.html("<i class='fas fa-upload'></i>");

        bunttons.append(uploadBtn);
        bunttons.append(editBtn);
        bunttons.append(dropdownBtn);
        bunttons.append(addBtn);
        bunttons.append(removeBtn);

        row.append(bunttons);

        li.append(row);
        $("#" + parent_id + " > ul").append(li);
        loadTasks(tasks, element.id);
    });
}


$.ajax({
    url: "/loadTask",
    type: "get",
    dataType: "json",
    success: function (result) {
        loadTasks(result, 0);
    }
});
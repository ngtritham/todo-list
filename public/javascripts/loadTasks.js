let loadTasks = (tasks, parent_id) => {
    let tempArr = [];
    tasks.forEach(element => {
        if (element.parent_id === parent_id) {
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
        li.text(element.content);
        // li.addClass("checked");
        //li.attr('onclick','toggleChecked()');
        $("#" + parent_id + " > ul").append(li);
        loadTasks(tasks, element.id);
    });
}

let addRemoveBtn = () => {
    let nodeList = $("li");
    for (let i = 0; i < nodeList.length; i++) {
        let span = $("<span></span>");
        let rmBtn = "<i class='fas fa-times'></i>";
        span.html(rmBtn);
        span.addClass("close");
        nodeList[i].append("X");
        console.log(span);
    }
}

// Toggle checked

let toggleChecked = () => {
    alert("check");
}

$("#0").click(function (event) {
    let isChecked = $(event.target).hasClass("checked");
    if(!isChecked){
        $(event.target).addClass("checked");
    }
    else{
        $(event.target).removeClass("checked");
    }
});

// let addClickEvent = () => {
//     let li = document.getElementsByTagName("li");
//     let isChecked;
//     for(let i = 0; i < li.length; i++){
//         isChecked = li[i].getAttribute("class") === "checked";
//         console.log(isChecked);
//     }
// }



$.ajax({
    url: "/showTask",
    type: "get",
    dataType: "json",
    success: function (result) {
        loadTasks(result, 0);
        //addRemoveBtn();
    }
});

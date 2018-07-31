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


// let testLoad = (tasks, parent_id) => {
//     let tempArr = [];
//     tasks.forEach(element => {
//         if (element.parent_id === parent_id) {
//             let node = document.createElement("LI");
//             let textnode = document.createTextNode(element.content);
//             node.appendChild(textnode);
//             document.getElementById(parent_id).appendChild(node);
//             tempArr.push(element);
//         }
//     });

//     if (tempArr.length < 1) {
//         return;
//         console.log("Không có task với parent_id = " + parent_id);
//     }
//     else {
//         for (let i = 0; i < tempArr.length; i++) {
//             console.log("ParentID = " + parent_id + " " + tempArr[i].id + " " + tempArr[i].content);
//             testLoad(tasks, tempArr[i].id);
//         }
//     }
// }

let testLoad = (tasks, parent_id) => {
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

    // // Thêm node UL vào LI parent
    // let ul = document.createElement("UL");
    // let parentNode = document.getElementById(parent_id);
    // parentNode.appendChild(ul);

    let ul = $("<ul></ul>");
    let parentNode = $("#" + parent_id).append(ul);

    // Thêm cái node LI (Task) vào node UL trên
    tempArr.forEach(element => {
        // let node = document.createElement("LI");
        // node.setAttribute("id", element.id)
        // let textnode = document.createTextNode(element.content);
        // node.appendChild(textnode);
        //document.getElementById(parent_id).childNodes().appendChild(node);
        //testLoad(tasks, parent.id);

        let node = $("<li></li>");
        node.attr("id", element.id);
        node.text(element.content);
        $("#" + parent_id + " > ul").append(node);
        testLoad(tasks, parent.id);
    });
}

$.ajax({
    url: "/showTask",
    type: "get",
    dataType: "json",
    success: function (result) {
        //$("#taskList").append(loadTask(result, 0));
        //$("#taskList").append(testLoad(result, 0));
        testLoad(result, 0);
    }
});

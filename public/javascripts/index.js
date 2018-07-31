let getParentIdFromCookie = () => {
    let cookie = document.cookie.split("=");
    let parent_id_cookies = Number(cookie[1]);
    $("#parent_id").attr("value", parent_id_cookies);
}

let = getTaskIdFromCookie = () => {
    let cookie = document.cookie.split("=");
    let taskId = Number(cookie[2]);
    $("#taskId").attr("value", taskId);
}
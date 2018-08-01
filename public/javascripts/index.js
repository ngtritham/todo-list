let getCookie = (name) => {
    let escape = (s) => {
        return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
    };
    let match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

let getParentIdFromCookie = () => {
    let parent_id_cookies = Number(getCookie("parent_id"));

    $("#parent_id").attr("value", parent_id_cookies);
}

let getTaskIdFromCookie = () => {
    let taskId = Number(getCookie("taskEdittingId"));
    $("#taskId").attr("value", taskId);
}

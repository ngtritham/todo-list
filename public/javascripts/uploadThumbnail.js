const input = document.getElementById("photo");
const reader = new FileReader;
let dataURL = null;
let base64 = null;

input.onchange = () => {
    //reader.abort();
    reader.readAsDataURL(input.files[0]);
}

reader.onload = (event) => {
    dataURL = reader.result;
    base64 = reader.result.split(",").pop();
    //console.log(dataURL);
    const task_id = $("#task_upload_id").val();
    $('#preview').attr('src', event.target.result);
    //console.log(task_id);
    $("#uploadBtn").click(() => {
        const data = {
            base64: dataURL,
            task_id: task_id
        };
        $.post('/uploadThumbnail', data, () => {});
        window.location.href = '/tasks';
    });
}
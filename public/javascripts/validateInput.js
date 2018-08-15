let current_date = moment().format('YYYY-MM-DD');
let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

$(document).ready(function () {
    $('#start_date').val(current_date);
    $('#child_start_date').val(current_date);
    $('#edit_start_date').val(current_date);

    $('#end_date').val(tomorrow);
    $('#child_end_date').val(tomorrow);
    $('#edit_end_date').val(tomorrow);
    $('#end_date').attr("min", tomorrow);
    $('#child_end_date').attr("min", tomorrow);
    $('#edit_end_date').attr("min", tomorrow);
});

// Đổi end_date mặc định khi start_date thay đổi
$('#start_date').change(event, () => {
    let new_start_date = $(event.target).val();
    let new_tomorrow = moment(new_start_date).add(1, 'days').format('YYYY-MM-DD');
    $('#end_date').val(new_tomorrow);
    $('#end_date').attr("min", new_tomorrow);
});

$('#child_start_date').change(event, () => {
    let new_start_date = $(event.target).val();
    let new_tomorrow = moment(new_start_date).add(1, 'days').format('YYYY-MM-DD');
    $('#child_end_date').val(new_tomorrow);
    $('#child_end_date').attr("min", new_tomorrow);
});

$('#edit_start_date').change(event, () => {
    let new_start_date = $(event.target).val();
    let new_tomorrow = moment(new_start_date).add(1, 'days').format('YYYY-MM-DD');
    $('#edit_end_date').val(new_tomorrow);
    $('#edit_end_date').attr("min", new_tomorrow);
});

let validateAddInput = (currentElement) => {
    let input_content = $('#content').val();
    let input_start_date = $('#start_date').val();
    let input_end_date = $('#end_date').val();
    let canSubmit = false;
    let isStartAfterEnd = moment(input_end_date).isAfter(input_start_date);

    if (input_content !== '' && isStartAfterEnd) {
        canSubmit = true;
    } else {
        if (input_content === '') {
            alert("Vui lòng nhập nội dung task !");
        } else {
            alert("Ngày nhập không hợp lệ !");
        }
    }

    if (canSubmit === true) {
        $('#formAdd').submit();
    } else {
        return;
    }
}

let validateAddChildInput = () => {
    let input_content = $('#child_content').val();
    let input_start_date = $('#child_start_date').val();
    let input_end_date = $('#child_end_date').val();
    let canSubmit = false;
    let isStartAfterEnd = moment(input_end_date).isAfter(input_start_date);

    if (input_content !== '' && isStartAfterEnd) {
        canSubmit = true;
    } else {
        if (input_content === '') {
            alert("Vui lòng nhập nội dung task !");
        } else {
            alert("Ngày nhập không hợp lệ !");
        }
    }

    if (canSubmit === true) {
        $('#formAddChild').submit();
    } else {
        return;
    }
}

let validateEditInput = () => {
    let input_content = $('#edit_content').val();
    let input_start_date = $('#edit_start_date').val();
    let input_end_date = $('#edit_end_date').val();
    let canSubmit = false;
    let isStartAfterEnd = moment(input_end_date).isAfter(input_start_date);

    if (input_content !== '' && isStartAfterEnd) {
        canSubmit = true;
    } else {
        if (input_content === '') {
            alert("Vui lòng nhập nội dung task !");
        } else {
            alert("Ngày nhập không hợp lệ !");
        }
    }

    if (canSubmit === true) {
        $('#formEdit').submit();
    } else {
        return;
    }
}

let validateUploadInput = () => {
    let id = $("#task_upload_id").val();

    let data = new FormData($("#formUploadThumbnail")[0]);

    $.ajax({
        type: 'POST',
        url: "/uploadThumbnail",
        data: data,
        processData: false,
        contentType: false,
        success: function (returnval) {
            // $("#show1").html(returnval);
            // $('#show1').show();
            console.log(returnval);
        }
    });
}
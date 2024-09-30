function checkSignup() {
    var email = document.getElementById('input_email');
    var password = document.getElementById('input_password');
    var emailError = document.getElementById('email_error');
    var passwordError = document.getElementById('password_error');

    emailError.textContent = "";
    passwordError.textContent = "";

    // Kiểm tra nếu email trống
    if (email.value == "") {
        emailError.textContent = "*Hãy nhập email";
        return false;
    }

    // Kiểm tra định dạng email
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = "*Hãy nhập email đúng";
        return false;
    }

    // Kiểm tra nếu mật khẩu trống
    if (password.value == "") {
        passwordError.textContent = "*Hãy nhập mật khẩu";
        return false;
    }

    return true; // Tất cả đều hợp lệ
}

$(document).ready(function() {
    $('.button').click(function(e) {
        e.preventDefault(); // Ngăn chặn submit form

        // Kiểm tra input trước khi gửi
        if (checkSignup()) {
            var email = $('#input_email').val();
            var password = $('#input_password').val();

            // Gửi dữ liệu qua Ajax
            $.ajax({
                url: '/ajaxLogin/app/controllers/others/controllerLogin.php', // Đường dẫn tương đối
                type: 'post',
                dataType: 'json', // Đợi phản hồi JSON
                data: {
                    email: email,
                    password: password
                }
            }).done(function(response) {
                if (response.success) {
                    // Chuyển hướng nếu đăng nhập thành công
                    window.location.href = response.redirect; // URL chuyển hướng
                } else {
                    // Hiển thị thông báo lỗi
                    $('.result').html(response.message);
                }
            }).fail(function() {
                $('.result').html('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
            });
        }
    });
});

import {signUp_db} from "../db/db.js";

$('#login_login').on('click',function () {
    let userName = $('#userName').val();
    let password = $('#inputLoginPassword6').val();

    let foundUser = signUp_db.find(user => user.fName === userName && user.password === password);

    if (foundUser) {
        Swal.fire({
            title: "Login Successfully!",
            icon: "success",
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'User Name Or Password are incorrect',
            icon: 'error',
            confirmButtonText: 'Ok'
        }).then((result)=>{
            $('#userName').val('');
            $('#inputLoginPassword6').val('');
        })
    }

})
import {signUp_db} from "../db/db.js";
import SignUpModel from "../model/SignUpModel.js";

$("#signUp_signUp").on('click',function () {
    let fName = $('#fName').val();
    let lName = $('#lName').val();
    let password = $('#inputPassword6').val();
    let cPassword = $('#confirmpassword').val();

    if (fName !== '' && lName !== '' && password !== '' && cPassword !== ''){
        if (password !== cPassword){
            Swal.fire({
                title: 'Error!',
                text: 'Password and Confirm Password Does not match',
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then((result)=>{
                if (result.isConfirmed){
                    $('#inputPassword6').val('');
                    $('#confirmpassword').val('');
                }
            })
            return
        }
    }else {
        Swal.fire({
            title: 'Error!',
            text: 'Some Field are Missing',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }




    // function validatePassword(password) {
    //     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    //     return regex.test(password);
    // }
    //
    // function checkPassword() {
    //     const pwd = document.getElementById("inputPassword6").value;
    //
    //     if (!validatePassword(pwd)) {
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'Password not Strong',
    //             icon: 'error',
    //             confirmButtonText: 'Ok'
    //         })
    //     }
    //
    // }


        let signUp_data = new SignUpModel(fName,lName,password,cPassword);

    signUp_db.push(signUp_data);

    console.log(signUp_db);

    Swal.fire({
        title: "Account Create Successfully!",
        icon: "success",
        draggable: true
    }).then((result)=>{
        if (result.isConfirmed){
            $('#signUpPage').css("display","none");
            $('#loginPage').css("display","block");
        }
    })

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }
})
import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

$("#customer_save").on('click',function (){
    let id = $('#id').val();
    let name = $('#name').val();
    let address = $('#address').val();
    let contact = $('#contact').val();

    if (id === '' || name === '' || address === '' || contact === ''){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }else {
        let customer_data = new CustomerModel(id,name,address,contact);

        customer_db.push(customer_data);

        console.log(customer_db);

        loadStudents();

        $('#id').val('');
        $('#name').val('');
        $('#address').val('');
        $('#contact').val('');

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
})

function loadStudents() {
    $('#customer_tbody').empty();
    customer_db.map((item,index) => {
        let id = item.id;
        let name = item.name;
        let address = item.address;
        let contact = item.contact;

        let data = `<tr>
                            <td>${index +1}</td>
                            <td>${name}</td>
                            <td>${address}</td>
                            <td>${contact}</td>
                        </tr>`

        $('#customer_tbody').append(data);
    })
}
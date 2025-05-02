import {item_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

$("#item-save").on('click',function (){
    let code = $('#code').val();
    let iName = $('#iName').val();
    let price = $('#price').val();
    let qty = $('#qty').val();

    if (code === '' || iName === ''|| price === '' || qty === ''){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }else {
        let item_data = new ItemModel(code,iName,price,qty);

        item_db.push(item_data);

        console.log(item_db);

        loadTableData();

        clear();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
})

function loadTableData(){
    $('#item_tbody').empty();

    item_db.map((item,index)=>{
        let code = item.code;
        let iName = item.iName;
        let price = item.price;
        let qty = item.qty;

        let data = `<tr>
                                <td>${index+1}</td>
                                <td>${iName}</td>
                                <td>${price}</td>
                                <td>${qty}</td>
                            </tr>`
        $('#item_tbody').append(data);
    })
}

let idx = -1;

$("#item_tbody").on('click', 'tr', function () {
    idx = $(this).index();
    console.log(idx);

    let obj = item_db[idx]
    console.log(obj);

    let code = obj.code;
    let iName = obj.iName;
    let price = obj.price;
    let qty = obj.qty;

    $("#code").val(code);
    $("#iName").val(iName);
    $("#price").val(price);
    $("#qty").val(qty);
})

$("#item_update").on('click',function () {
    if (idx === -1){
        alert("please select to Item")
        return
    }

    let code = $('#code').val();
    let iName = $('#iName').val();
    let price = $('#price').val();
    let qty = $('#qty').val();

    item_db[idx].code = code;
    item_db[idx].iName = iName;
    item_db[idx].price = price;
    item_db [idx].qty = qty;

    loadTableData();

    idx = -1
    clear();

    Swal.fire({
        title: "Updated Successfully!",
        icon: "success",
    });
})

$("#item_delete").on('click',function () {
    if (idx === -1){
        alert("select Items")
        return
    }
    Swal.fire({
        title: 'Are you sure?',
        text: "This Customer will be removed permanently.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'

    }).then((result)=>{
        if (result.isConfirmed){
            item_db.splice(idx,1);

            loadTableData();

            idx = -1;
            clear();

            Swal.fire({
                title: 'Deleted!',
                text: 'The Customer has been removed.',
                icon: 'success'
            });
        }
    })
})

function clear(){
    $('#code').val('');
    $('#iName').val('');
    $('#price').val('');
    $('#qty').val('');
}
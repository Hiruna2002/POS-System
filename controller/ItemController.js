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

        $('#code').val('');
        $('#iName').val('');
        $('#price').val('');
        $('#qty').val('');

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

$("#item_tbody").on('click', 'tr', function () {
    let idx = $(this).index();
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
import {orderDetails_db} from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";

$("#orderDetails_save").on('click',function (){
    let oId = $('#oId').val();
    let cId = $('#cId').val();
    let iCode = $('#iCode').val();
    let oQty = $('#oQty').val();
    let oPrice = $('#oPrice').val();

    if (oId === '' || cId === '' || iCode === '' || oQty === '' || oPrice === ''){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }else {
        let orderDetails_data = new OrderDetailsModel(oId,cId,iCode,oQty,oPrice);

        orderDetails_db.push(orderDetails_data);

        console.log(orderDetails_db);

        loadTableData()

        clear();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
})

function loadTableData(){
    $('#order_tbody').empty();

    orderDetails_db.map((item,index)=>{
        let oId = item.oId;
        let cId = item.cId;
        let iCode = item.iCode;
        let oQty = item.oQty;
        let oPrice = item.oPrice;

        let data = `<tr>
                                <td>${index+1}</td>
                                <td>${cId}</td>
                                <td>${iCode}</td>
                                <td>${oQty}</td>
                                <td>${oPrice}</td>
                            </tr>`
        $('#order_tbody').append(data);
    })
}

let idx = -1;

$("#order_tbody").on('click','tr',function (){
    idx = $(this).index();
    let obj = orderDetails_db[idx]

    let oId = obj.oId;
    let cId = obj.cId;
    let iCode = obj.iCode;
    let oQty = obj.oQty;
    let oPrice = obj.oPrice;

    $("#oId").val(oId);
    $("#cId").val(cId);
    $("#iCode").val(iCode);
    $("#oQty").val(oQty);
    $("#oPrice").val(oPrice);
})

$("#orderDetails_update").on('click',function () {
    if (idx === -1){
        alert("Select Orders for delete");
        return
    }

    let oId = $('#oId').val();
    let cId = $('#cId').val();
    let iCode = $('#iCode').val();
    let oQty = $('#oQty').val();
    let oPrice = $('#oPrice').val();

    orderDetails_db[idx].oId = oId;
    orderDetails_db[idx].cId = cId;
    orderDetails_db[idx].iCode = iCode;
    orderDetails_db[idx].oQty = oQty;
    orderDetails_db[idx].oPrice = oPrice;

    loadTableData();

    idx = -1;
    clear();

    Swal.fire({
        title: "Updated Successfully!",
        icon: "success",
    });
})

$("#orderDetails_delete").on('click',function () {
    if (idx === -1){
        alert("select Order Details");
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
            orderDetails_db.splice(idx,1);

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
    $('#oId').val('');
    $('#cId').val('');
    $('#iCode').val('');
    $('#oQty').val('');
    $('#oPrice').val('');
}
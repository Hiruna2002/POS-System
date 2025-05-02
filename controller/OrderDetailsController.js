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

        $('#oId').val('');
        $('#cId').val('');
        $('#iCode').val('');
        $('#oQty').val('');
        $('#oPrice').val('');

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }

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
})

$("#order_tbody").on('click','tr',function (){
    let idx = $(this).index();
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


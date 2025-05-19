import {order_db} from "../db/db.js";
import {customer_db} from "../db/db.js";
import {item_db} from "../db/db.js";

import CustomerModel from "../model/CustomerModel.js";
import ItemModel from "../model/ItemModel.js";
import OrderModel from "../model/OrderModel.js";


let idx = -1;

function loadOrderIds(){
    let count = order_db.length;
    $('#order_id').val(count+1);
}

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("order_id")) {
        loadOrderIds();
    }
    if (document.getElementById("order_date")){
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        $('#order_date').val(formattedDate);
    }


    const select = document.getElementById("order_cus_id");
    select.innerHTML = '<option disabled selected>Select Customer</option>';

    $('#order_cus_id').on('click',function () {

        while (select.options.length > 1) {
            select.remove(1);
        }

        customer_db.forEach(cus => {
            const option = document.createElement("option");
            option.value = cus.id;
            option.textContent = cus.id; // You can show ID + name
            select.appendChild(option);
        });
    })

    const selectItem = document.getElementById("order_item_id");
    selectItem.innerHTML = '<option disabled selected>Select Item</option>';

    $('#order_item_id').on('click',function () {

        while (selectItem.options.length > 1) {
            selectItem.remove(1);
        }

        // Loop through the array and add options
        item_db.forEach(item => {
            const optionNew = document.createElement("option");
            optionNew.value = item.code;
            optionNew.textContent = item.code; // You can show ID + name
            selectItem.appendChild(optionNew);
        });
        console.log("item data :", item_db);
    })

});

document.getElementById("order_cus_id").addEventListener("change", function () {
    const selectedId = this.value;
    const selectedCustomer = customer_db.find(cus => cus.id === selectedId);
    if (selectedCustomer) {
        console.log("Selected Customer:", selectedCustomer);
        // e.g. update form fields
        document.getElementById("cus_name").value = selectedCustomer.name;
        document.getElementById("cus_address").value = selectedCustomer.address;
        document.getElementById("cus_contact").value = selectedCustomer.contact;
    }
});

document.getElementById("order_item_id").addEventListener("change", function () {
    const selectedId = this.value;
    const selectedItem = item_db.find(item => item.code === selectedId);
    if (selectedItem) {
        console.log("Selected Item:", selectedItem);
        // e.g. update form fields
        document.getElementById("item_name").value = selectedItem.iName;
        document.getElementById("item_price").value = selectedItem.price;
        document.getElementById("item_qty").value = selectedItem.qty;
    }
});

$('#btn_add_item').on('click', function () {
    let itemPrice = $('#item_price').val();
    let qtyOnHand = $('#item_qty').val();
    let orderQty = $('#order_qty').val();
    let discount = $('#discount').val();
    let balance = $('#balance').val();

    let oId = $('#order_id').val();
    let cId = $('#order_cus_id').val();
    let code = $('#order_item_id').val();
    let date = $('#order_date').val();

    let total = itemPrice * orderQty;

    if (qtyOnHand < orderQty){
        Swal.fire({
            title: 'Error!',
            text: 'Out Of Stock',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

    }else {
        $('#tot').val(total);

    }

    let order_data = new OrderModel(oId,cId,code,date,orderQty,total);

    order_db.push(order_data);
    console.log("order data: ",order_db);



    loadTableData();



})

$('#btn_purchase').on('click',function () {
    let tot = $('#tot').val();
    let discount = $('#discount').val();

    $('#balance').val(tot-discount);
})



function loadTableData() {

    $('#order_tbody').empty();

    order_db.map((item,index)=>{
        let oId = $('#order_id').val();
        let cId = $('#order_cus_id').val();
        let code = $('#order_item_id').val();
        let date = $('#order_date').val();
        let qty = $('#order_qty').val();
        let total = $('#tot').val();

        let data = `<tr>
            <td>${index+1}</td>
            <td>${cId}</td>
            <td>${code}</td>
            <td>${date}</td>
            <td>${qty}</td>
            <td>${total}</td>
        </tr>`

        $('#order_tbody').append(data);
    })



}



//
// $("#order_save").on('click',function (){
//     if ($('#order_save').text()==="Save"){
//         let oId = $('#oId').val();
//         let cId = $('#cId').val();
//         let iCode = $('#iCode').val();
//         let oQty = $('#oQty').val();
//         let oPrice = $('#oPrice').val();
//
//         if (oId === '' || cId === '' || iCode === '' || oQty === '' || oPrice === ''){
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'Invalid Inputs',
//                 icon: 'error',
//                 confirmButtonText: 'Ok'
//             })
//             loadOrderIds();
//         }else {
//             let order_data = new OrderModel(oId,cId,iCode,oQty,oPrice);
//
//             order_db.push(order_data);
//
//             console.log(order_db);
//
//             loadTableData()
//
//             clear();
//
//             Swal.fire({
//                 title: "Added Successfully!",
//                 icon: "success",
//                 draggable: true
//             });
//             loadOrderIds();
//         }
//     }else {
//         if (idx === -1){
//             alert("Select Orders for delete");
//             return
//         }
//
//         let oId = $('#oId').val();
//         let cId = $('#cId').val();
//         let iCode = $('#iCode').val();
//         let oQty = $('#oQty').val();
//         let oPrice = $('#oPrice').val();
//
//         order_db[idx].oId = oId;
//         order_db[idx].cId = cId;
//         order_db[idx].iCode = iCode;
//         order_db[idx].oQty = oQty;
//         order_db[idx].oPrice = oPrice;
//
//         loadTableData();
//
//         idx = -1;
//         clear();
//
//         Swal.fire({
//             title: "Updated Successfully!",
//             icon: "success",
//         });
//         loadOrderIds();
//     }
// })
//
// function loadTableData(){
//     $('#order_tbody').empty();
//
//     order_db.map((item,index)=>{
//         let oId = item.oId;
//         let cId = item.cId;
//         let iCode = item.iCode;
//         let oQty = item.oQty;
//         let oPrice = item.oPrice;
//
//         let data = `<tr>
//                                 <td>${index+1}</td>
//                                 <td>${cId}</td>
//                                 <td>${iCode}</td>
//                                 <td>${oQty}</td>
//                                 <td>${oPrice}</td>
//                             </tr>`
//         $('#order_tbody').append(data);
//
//     })
// }
//
// $("#order_tbody").on('click','tr',function (){
//     idx = $(this).index();
//     let obj = order_db[idx]
//
//     let oId = obj.oId;
//     let cId = obj.cId;
//     let iCode = obj.iCode;
//     let oQty = obj.oQty;
//     let oPrice = obj.oPrice;
//
//     $("#oId").val(oId);
//     $("#cId").val(cId);
//     $("#iCode").val(iCode);
//     $("#oQty").val(oQty);
//     $("#oPrice").val(oPrice);
//
//     $('#order_save').css("background-color","red");
//     $('#order_save').text("Update");
// })
//
// $("#order_delete").on('click',function () {
//     if (idx === -1){
//         alert("select Order Details");
//         return
//     }
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "This Customer will be removed permanently.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, delete it!'
//
//     }).then((result)=>{
//         if (result.isConfirmed){
//             order_db.splice(idx,1);
//
//             loadTableData();
//
//             idx = -1;
//             clear();
//
//             Swal.fire({
//                 title: 'Deleted!',
//                 text: 'The Customer has been removed.',
//                 icon: 'success'
//             });
//             loadOrderIds();
//         }
//     })
// })
//

//
// function clear(){
//     $('#oId').val('');
//     $('#cId').val('');
//     $('#iCode').val('');
//     $('#oQty').val('');
//     $('#oPrice').val('');
// }
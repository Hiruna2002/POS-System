export default class OrderModel {
    constructor(oId,cId,code,date,method,qty,discount,balance,total) {
        this.oId = oId;
        this.cId = cId;
        this.code = code;
        this.date = date;
        this.method = method;
        this.qty = qty;
        this.discount = discount;
        this.balance = balance;
        this.total = total;
    }
}
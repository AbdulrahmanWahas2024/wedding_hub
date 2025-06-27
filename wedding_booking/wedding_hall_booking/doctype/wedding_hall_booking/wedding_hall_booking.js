// Copyright (c) 2025, Abdulrahman Wahas and contributors
// For license information, please see license.txt
// دالة اظهار تفاصيل الحوالة
frappe.ui.form.on("Wedding Hall Booking", {
 	payment_method: function(frm) {
    frm.toggle_display("transfer_details", frm.doc.payment_method === "حوالة");
  },
  onload: function(frm) {
    frm.toggle_display("transfer_details", frm.doc.payment_method === "حوالة");
  }
 });

 // This script is for the Wedding Hall Booking form in Frappe/ERPNext.
 // It handles the visibility of the transfer details field based on the selected payment method.
 // احتساب المبلغ المتبقي بناءً على المبلغ المتفق عليه والمدفوع
 frappe.ui.form.on("Wedding Hall Booking", {
  amount_paid: function(frm) {
    if (frm.doc.amount_agreed && frm.doc.amount_paid) {
      frm.set_value("amount_remaining", frm.doc.amount_agreed - frm.doc.amount_paid);
    }
  },
  amount_agreed: function(frm) {
    if (frm.doc.amount_agreed && frm.doc.amount_paid) {
      frm.set_value("amount_remaining", frm.doc.amount_agreed - frm.doc.amount_paid);
    }
  }
});
// اظهار تاريخ ويوم الحجز في جدول Booking Day   
frappe.ui.form.on('Booking Day', {
  booking_date: function(frm, cdt, cdn) {
    let child = locals[cdt][cdn];
    if (child.booking_date) {
      let date = new Date(child.booking_date);
      let dayName = date.toLocaleDateString('ar-EG', { weekday: 'long' });
      frappe.model.set_value(cdt, cdn, 'day_name', dayName);
    }
  }
});



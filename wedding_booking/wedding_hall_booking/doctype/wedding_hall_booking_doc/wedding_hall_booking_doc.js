// Copyright (c) 2025, Abdulrahman Wahas and contributors
// For license information, please see license.txt
// دالة اظهار تفاصيل الحوالة
frappe.ui.form.on("Wedding Hall Booking Doc", {
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
 frappe.ui.form.on("Wedding Hall Booking Doc", {
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

// This script is for the Wedding Hall Booking form in Frappe/ERPNext.
// It validates the booking dates against existing bookings for the same hall to prevent double bookings.
//منع الحجز بتاريخ محجوز مسبقاً
// frappe.ui.form.on("Wedding Hall Booking Doc", {
//   validate: function(frm) {
//     if (frm.doc.hall_name && frm.doc.booking_days && frm.doc.booking_days.length > 0) {
//       frappe.call({
//         method: "frappe.client.get_list",
//         async: false,
//         args: {
//           doctype: "Wedding Hall Booking Doc",
//           filters: {
//             hall_name: frm.doc.hall_name,
//             name: ["!=", frm.doc.name],
//             docstatus: ["<", 2]
//           },
//           fields: ["name", "booking_days"]
//         },
//         callback: function(r) {
//           if (r.message && r.message.length > 0) {
//             let bookings = r.message;
//             for (let existing of bookings) {
//               frappe.call({
//                 method: "frappe.client.get_list",
//                 async: false,
//                 args: {
//                   doctype: "Booking Day",
//                   filters: {
//                     parent: existing.name
//                   },
//                   fields: ["booking_date"]
//                 },
//                 callback: function(res) {
//                   let existing_dates = res.message.map(d => d.booking_date);
//                   for (let day of frm.doc.booking_days) {
//                     if (existing_dates.includes(day.booking_date)) {
//                       frappe.throw(`التاريخ ${day.booking_date} محجوز بالفعل للقاعة ${frm.doc.hall_name}`);
//                     }
//                   }
//                 }
//               });
//             }
//           }
//         }
//       });
//     }
//   }
// });


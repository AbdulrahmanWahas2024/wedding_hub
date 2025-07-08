// Copyright (c) 2025, Abdulrahman Wahas and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Hall Booking Deposit", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Wedding Hall Booking', {
    refresh(frm) {
        console.log("Wedding Hall Booking Form Refreshed");
        if (frm.doc.deposits && frm.doc.deposits.length > 0) {
            frm.doc.deposits.forEach(row => {
                console.log("Row Data:", row);
                console.log("Deposit Type Fieldname:", row.deposit_type); // تأكد من هذا الاسم
                console.log("Deposit Value Fieldname:", row.deposit_value); // تأكد من هذا الاسم
                console.log("Deposit Status Fieldname:", row.deposit_status); // تأكد من هذا الاسم
                console.log("Deposit Return Date Fieldname:", row.deposit_return_date); // تأكد من هذا الاسم
            });
        }
    }
});

// تأكد من أن هذا الـ DocType هو الصحيح (Hall Booking Deposit)
frappe.ui.form.on('Hall Booking Deposit', {
    deposit_type(frm, cdt, cdn) {
        const row = frappe.get_doc(cdt, cdn);
        console.log("Deposit Type Changed in row:", row.name, "Value:", row.deposit_type);
        handle_deposit_row_on_change(frm, row);
    },
    deposit_status(frm, cdt, cdn) {
        const row = frappe.get_doc(cdt, cdn);
        console.log("Deposit Status Changed in row:", row.name, "Value:", row.deposit_status);
        handle_deposit_row_on_change(frm, row);
    }
});

function handle_all_deposit_rows(frm) {
    if (!frm.doc.deposits || frm.doc.deposits.length === 0) return;
    frm.doc.deposits.forEach(row => {
        handle_deposit_row_on_change(frm, row);
    });
}

function handle_deposit_row_on_change(frm, doc_row) {
    if (!doc_row) return;

    const show_value = doc_row.deposit_type === "نقدي";
    const show_return_date = doc_row.deposit_status === "مسترد";

    console.log(`Row ${doc_row.name}: Type=${doc_row.deposit_type}, Status=${doc_row.deposit_status}`);
    console.log(`Will show deposit_value: ${show_value}`);
    console.log(`Will show deposit_return_date: ${show_return_date}`);

    frm.toggle_display(`deposits.${doc_row.name}.deposit_value`, show_value);
    frm.toggle_display(`deposits.${doc_row.name}.deposit_return_date`, show_return_date);

    // للتأكد من تحديث واجهة المستخدم فورًا
    // قد لا تكون هذه ضرورية ولكنها تساعد في بعض الحالات
    // frm.refresh_fields(); // هذه قد تؤدي إلى مشاكل إذا تم استدعاؤها بشكل متكرر
    
    // مسح القيمة إذا تم إخفاء الحقل
    if (!show_value) {
        if (doc_row.deposit_value !== null) { // امسح فقط إذا كان هناك قيمة
            frappe.model.set_value(doc_row.doctype, doc_row.name, 'deposit_value', null);
            console.log("Cleared deposit_value for row:", doc_row.name);
        }
    }
    if (!show_return_date) {
        if (doc_row.deposit_return_date !== null) { // امسح فقط إذا كان هناك قيمة
            frappe.model.set_value(doc_row.doctype, doc_row.name, 'deposit_return_date', null);
            console.log("Cleared deposit_return_date for row:", doc_row.name);
        }
    }
}
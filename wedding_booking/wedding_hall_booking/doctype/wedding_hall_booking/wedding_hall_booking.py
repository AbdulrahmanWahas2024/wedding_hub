# Copyright (c) 2025, Abdulrahman Wahas and contributors
# For license information, please see license.txt

# import frappe
# from frappe.model.document import Document
# class WeddingHallBooking(Document):
#     def validate(self):
#         validate(self, "validate")


#  class WeddingHallBooking(Document):
#  	pass
from frappe.model.document import Document




import frappe
from frappe import _
from frappe.utils import formatdate

def validate(self, method):
    frappe.msgprint("✅ تم تنفيذ كود التحقق داخل validate")  # هذا للتأكد فقط
    if not self.hall or not self.booking_days:
        return


def get_existing_bookings(hall, booking_name):
    """استرجاع كافة الحجوزات الأخرى لنفس القاعة"""
    return frappe.get_all("Wedding Hall Booking Doc",
        filters={
            "hall": hall,
            "name": ["!=", booking_name],
            "docstatus": ["<", 2]
        },
        fields=["name", "customer_name"]
    )

def get_booking_dates(booking_id):
    return frappe.get_all("Booking Day",
        filters={"parent": booking_id},
        fields=["booking_date"]
    )


    existing_bookings = get_existing_bookings(self.hall, self.name)
    current_dates = {d.booking_date for d in self.booking_days}

    for booking in existing_bookings:
        other_dates = {d.booking_date for d in get_booking_dates(booking.name)}
        intersect = current_dates & other_dates

        if intersect:
            conflict_date = list(intersect)[0]
            formatted_date = formatdate(conflict_date, "dd-MM-yyyy")
            raise frappe.ValidationError(_(
                f"⚠️ التاريخ {formatted_date} محجوز مسبقًا من قبل العميل {booking.customer_name} في الحجز رقم {booking.name}."
            ))

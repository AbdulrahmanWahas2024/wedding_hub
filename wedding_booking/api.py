import frappe
from frappe.utils import getdate

@frappe.whitelist()
def get_reserved_dates(hall):
    reserved = set()

    bookings = frappe.get_all("Wedding Hall Booking",
        filters={"hall": hall, "docstatus": ["<", 2]},
        fields=["name"]
    )

    for booking in bookings:
        days = frappe.get_all("Booking Day",
            filters={"parent": booking.name},
            fields=["booking_date"]
        )
        for d in days:
            reserved.add(str(d.booking_date))

    return list(reserved)

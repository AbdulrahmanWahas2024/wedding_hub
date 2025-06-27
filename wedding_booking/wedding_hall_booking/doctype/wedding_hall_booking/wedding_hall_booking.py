import frappe
from frappe import _
from frappe.utils import formatdate
from frappe.model.document import Document, getdate

class WeddingHallBooking(Document):
    def validate(self):
        frappe.msgprint("✅ تم تنفيذ كود التحقق داخل validate")  # اختياري للاختبار
   
        # if not self.hall or not self.booking_days:
        #     return

#         existing_bookings = get_existing_bookings(self.hall, self.name)
#         current_dates = {d.booking_date for d in self.booking_days}

#         for booking in existing_bookings:
#             other_dates = {d.booking_date for d in get_booking_dates(booking.name)}
#             intersect = current_dates & other_dates

#             if intersect:
#                 conflict_date = list(intersect)[0]
#                 formatted_date = formatdate(conflict_date, "dd-MM-yyyy")
#                 raise frappe.ValidationError(_(
#                     f"⚠️ التاريخ {formatted_date} محجوز مسبقًا من قبل العميل {booking.customer_name} في الحجز رقم {booking.name}."
#                 ))

# def get_existing_bookings(hall, booking_name):
#     """استرجاع كافة الحجوزات الأخرى لنفس القاعة"""
#     return frappe.get_all("Wedding Hall Booking",
#         filters={
#             "hall": hall,
#             "name": ["!=", booking_name],
#             "docstatus": ["<", 2]
#         },
#         fields=["name", "customer_name"]
#     )

# def get_booking_dates(booking_id):
#     """جلب تواريخ الحجز"""
#     return frappe.get_all("Booking Day",
#         filters={"parent": booking_id},
#         fields=["booking_date"]
#     )

                # تأكد من وجود القاعة وجدول الحجز
        # if not self.hall:
        #     frappe.msgprint("⚠️ لا توجد قاعة محددة")
        #     return

        # if not self.booking_days:
        #     frappe.msgprint("⚠️ لم يتم إدخال تواريخ الحجز")
        #     return

        # استخراج التواريخ من جدول Booking Day
        # current_dates = {d.booking_date for d in self.booking_days if d.booking_date}
        # frappe.msgprint(f"📅 التواريخ المدخلة: {current_dates}")
        # current_dates = {getdate(d.booking_date) for d in self.booking_days if d.booking_date}
        # frappe.msgprint(f"📅 التواريخ المدخلة: {current_dates}")


        # if not current_dates:
        #     frappe.msgprint("⚠️ لم يتم إدخال أي تاريخ صالح")
        #     return

        # # جلب الحجوزات السابقة لنفس القاعة
        # existing_bookings = frappe.get_all("Wedding Hall Booking",
        #     filters={
        #         "hall": self.hall,
        #         "name": ["!=", self.name],
        #         "docstatus": ["<", 2]
        #     },
        #     fields=["name", "customer_name"]
        # )

        # frappe.msgprint(f"🔍 عدد الحجوزات السابقة: {len(existing_bookings)}")

        # for booking in existing_bookings:
        #     booked_dates = frappe.get_all("Booking Day",
        #         filters={"parent": booking.name},
        #         fields=["booking_date"]
        #     )
        #     # other_dates = {d.booking_date for d in booked_dates if d.booking_date}
        #       # التحويل من str إلى date
        #     raw_dates = [d.booking_date for d in booked_dates if d.booking_date]
        #     other_dates = {getdate(date) for date in raw_dates}
        #     frappe.msgprint(f"📂 الحجز رقم {booking.name} - تواريخ: {other_dates}")

        #     # مقارنة التواريخ
        #     intersect = current_dates & other_dates
        #     if intersect:
        #         conflict_date = list(intersect)[0]
        #         formatted_date = formatdate(conflict_date, "dd-MM-yyyy")
        #         raise frappe.ValidationError(_(
        #             f"🚫 التاريخ {formatted_date} محجوز مسبقًا من قبل العميل {booking.customer_name} في الحجز رقم {booking.name}."
        #         ))

        # frappe.msgprint("✅ التحقق ناجح، لا يوجد تعارض في التواريخ")

# Copyright (c) 2013, New Indictrans Technologies pvt.ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from frappe import _
import frappe

def execute(filters=None):
	columns, data = [], []
	columns=get_colums()
	data=get_data(filters)
	return columns, data

def get_data(filters):
	#print filters.from_date,filters.to_date
	if filters.from_date and filters.to_date:
		return frappe.db.sql(""" select vendor_entry,
										invoice_no,
										booking_date,
										bill_amount,
										bill_details,
										balance_amount 
									from `tabBook Bill` 
										where 
	(booking_date between '{0}' and '{1}')""".format(filters.from_date,filters.to_date,get_condition(filters.select_type)),as_list=1,debug=1)
	else:
		return []	
	# if filters.from_date:
	# 	if filters.to_date:
			
	# 		if filters.select_type=="Payment Done":
				# return frappe.db.sql(""" select vendor_entry,invoice_no,booking_date,
				# 	bill_amount,bill_details,balance_amount from `tabBook Bill` 
				# 	where balance_amount=0 and (booking_date between {0}  {1}) """.format(filters.from_date,filters.to_date),as_list=1)
			
	# 		elif filters.select_type=="Payment Due":
	# 			return frappe.db.sql("""select vendor_entry,invoice_no,booking_date,
	# 				bill_amount,bill_details,balance_amount from `tabBook Bill`
	# 				where balance_amount>0 and (booking_date between {0} {1}) """.format(filters.from_date,filters.to_date),as_list=1)
			
	# 			# frappe.throw(_("Enter Payment Type"))
		
	
	# 	# frappe.throw(_("please Enter From Date"))



def get_colums():
	columns = [("Vendor Entry") + ":Link/Supplier:100"] +\
			  [("Invoice No") + ":Data:100"] + \
			  [("Booking Date") + ":Date:100"] + \
			  [("Bill Amount") + ":Data:100"] + \
			  [("Bill Details") + ":Data:500"] + \
			  [("Balance") + ":Currency:120"] 
			  
	return columns	





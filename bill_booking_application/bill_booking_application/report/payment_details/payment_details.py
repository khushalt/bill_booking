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
	if filters.from_date and filters.to_date and filters.select_type:
		return frappe.db.sql(""" select vendor_entry,
										invoice_no,
										booking_date,
										bill_amount,
										total,
										bill_details,
										balance_amount 
									from `tabBook Bill` 
										where 
	(booking_date between '{0}' and '{1}')and {2}""".format(filters.from_date,filters.to_date,get_condition(filters.select_type)),as_list=1,debug=1)
	else:
		return []	
	
			
def get_condition(filters_):

	if filters_:
		if filters_=="Payment Done":
			return "balance_amount=0"
		else:
			return "balance_amount>0"

def get_colums():
	columns = [("Vendor Entry") + ":Link/Supplier:100"] +\
			  [("Invoice No") + ":Data:100"] + \
			  [("Booking Date") + ":Date:100"] + \
			  [("Bill Amount") + ":Currency:100"] + \
			  [("Total Paid Amount") + ":Currency:100"] + \
			  [("Bill Details") + ":Data:500"] + \
			  [("Balance") + ":Currency:120"] 
	return columns	





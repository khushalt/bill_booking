# -*- coding: utf-8 -*-
# Copyright (c) 2015, New Indictrans Technologies pvt.ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from frappe.utils import nowdate
import frappe
from frappe import _
from frappe.model.document import Document
class InvalidLeaveApproverError(frappe.ValidationError): pass

class BookBill(Document):
	def validate(self):
	 	#if not self.get("__islocal"):
		print"########################################"
		#self.validate_leave_approver()
		
	# def validate_leave_approver(self):
	# 	print "################### APPROVER",self.approver,"Session User",frappe.session.user
	# 	print"##############################STATUS",self.docstatus
	# 	if(self.reminder):
	# 		self.send_email()

		

	# def on_submit(self):

	# 	if(self.approver==frappe.session.user):
	# 		print"@@@@@@@@@@@USER ARE THE SAME"
	# 	else:
	# 		frappe.throw(_("you dont have enough permissions to approve this document"))
		
	# 	if self.status != "Approved":
	# 		frappe.throw(_("Only Leave Applications with status 'Approved' can be submitted"))

	
	# def send_email(self):
	# 	current_date=frappe.utils.nowdate()
	# 	if(current_date==self.reminder):
	# 		print"#########################MAIL ID",self.reminder
	# 		#frappe.sendmail(recipients=self.approver, sender=None, subject=self.bill_details,message="as cool as i am")
	def on_update(self):
		print"######################################KHUSHAL",self.workflow_state
		pass

	def on_submit(self):
		if self.balance_amount>0:
			frappe.throw(_("Only Leave Applications with status 'Approved' can be submitted"))

# -*- coding: utf-8 -*-
# Copyright (c) 2015, New Indictrans Technologies pvt.ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from frappe.utils import nowdate
from frappe.utils.user import UserPermissions
from frappe import *
import frappe
from frappe import _
from frappe.model.document import Document
class InvalidLeaveApproverError(frappe.ValidationError): pass

class BookBill(Document):
	def validate(self):
		ls=[]
		ls.append(self.payments)
		print "#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",ls
	# 	# users=get_user().get_roles("Administartor")
		#print"$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
	 	
	def on_submit(self):
		#print"############################################",not self.balance_amount!=0,self.balance_amount
		if self.balance_amount>0:
			frappe.throw(_("Only Leave Applications with status 'Approved' can be submitted"))
		# else :
		# 	return True
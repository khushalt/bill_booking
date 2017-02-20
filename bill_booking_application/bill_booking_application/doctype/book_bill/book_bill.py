# -*- coding: utf-8 -*-
# Copyright (c) 2015, New Indictrans Technologies pvt.ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from frappe.utils import nowdate
from frappe.utils.user import UserPermissions
from frappe import *
from frappe.utils import user
import frappe
from frappe import _
from frappe.model.document import Document
class InvalidLeaveApproverError(frappe.ValidationError): pass

class BookBill(Document):
	def validate(self):
		users=get_enabled_system_users()
		roles=get_roles("khushal.t@indictranstech.com")
		
	 	
		
	def on_submit(self):
		if self.balance_amount>0:
			frappe.throw(_("Only Leave Applications with status 'Approved' can be submitted"))

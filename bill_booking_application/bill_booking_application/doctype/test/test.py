# -*- coding: utf-8 -*-
# Copyright (c) 2015, New Indictrans Technologies pvt.ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from frappe.utils import nowdate
import frappe
from frappe import _
from frappe.model.document import Document

class Test(Document):
	def validate(self):
		print "#################################################################"
	 	if not self.get("__islocal"):
	 		print"########################################",self.total,self.workflow_state
	
	def validate_leave_approver(self):
		print "################### APPROVER",self.approver,"Session User",frappe.session.user
		print"##############################STATUS",self.docstatus	

	pass

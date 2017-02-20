// Copyright (c) 2016, New Indictrans Technologies pvt.ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["Payment Details"] = {
	"filters": [
	{
		"fieldname":"from_date",
		"label": __(" From Date"),
		"fieldtype": "Date",
		"width": "80"
		
	},
	{
		"fieldname":"to_date",
		"label": __(" To Date"),
		"fieldtype": "Date",
		"width": "80"
	},

	{
		"fieldname":"select_type",
		"label":__("Select"),
		"fieldtype":"Select",
		"options": ["","Payment Done","Payment Due"]
	}
	]
}

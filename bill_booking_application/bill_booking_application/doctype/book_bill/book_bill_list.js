frappe.listview_settings['Book Bill'] = {
	add_fields: ["status", "vendor_entry","booking_date"],
	filters:[["status","=", "Approved by Finance Manager"]],
	get_indicator: function(doc) {
		console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",doc.status)
		return [__(doc.status), frappe.utils.guess_colour(doc.status),
			"status,=," + doc.status];
	}
};

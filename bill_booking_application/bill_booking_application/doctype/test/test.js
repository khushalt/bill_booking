// Copyright (c) 2016, New Indictrans Technologies pvt.ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Test', {
	 validate: function(frm,cdt,cdn){
		console.log("HIIIIIIIIIIIIIIIIIIIIII",frm.doc.status=="Approved")
	// 	if(!frm.doc.__islocal && frm.doc.status=="Approved" && frappe.session.user=='khushal.t@indictranstech.com'){
	// 		console.log("CONDITION SATISFIED")
	// 	}
		if(!frm.doc.__islocal && frm.doc.workflow_state=='Approved by Finance Manager' && frappe.session.user=='Administrator'){
			
			var row = locals[cdt][cdn];
			var fnl_ttl = 0;
			balance_value=frm.doc.bill_amount-frm.doc.payable_amount
			frm.set_value("balance_amount",balance_value) 
			if(frm.doc.payable_amount){
				var row = frappe.model.add_child(cur_frm.doc, "Payment Installment", "payments");
				row.payment=frm.doc.payable_amount
				row.date=frm.doc.booking_date
				row.remaining=frm.doc.balance_amount
				row.payment_type=frm.doc.payment_type
				refresh_field("payments");
				var temp="Draft"
		 	frm.set_value("workflow_state",temp) 
			}
	 }
		if(!frm.doc.__islocal && frm.doc.workflow_state=='Draft' && frappe.session.user=='khushal.t@indictranstech.com'){
			var temp="khushal.t@indictranstech.com"
			frm.set_value("workflow_state",temp)
			var temp="Draft"
		 	frm.set_value("workflow_state",temp) 
			var row = locals[cdt][cdn];
			var fnl_ttl = 0;
			balance_value=frm.doc.bill_amount-frm.doc.payable_amount
			frm.set_value("balance_amount",balance_value) 
			if(frm.doc.payable_amount){
				var row = frappe.model.add_child(cur_frm.doc, "Payment Installment", "payments");
				row.payment=frm.doc.payable_amount
				row.date=frm.doc.booking_date
				row.remaining=frm.doc.balance_amount
				row.payment_type=frm.doc.payment_type
				refresh_field("payments");
			}
		}
	 },
	
	refresh: function(frm) {

	},



	payable_amount:function(frm,cdt,cdn){
		if(frm.doc.balance_amount>0 || frm.doc.balance_amount==undefined){
			// var row = locals[cdt][cdn];
			// var fnl_ttl = 0;
			// balance_value=frm.doc.bill_amount-frm.doc.payable_amount
			// frm.set_value("balance_amount",balance_value) 
			// if(frm.doc.payable_amount){
			// 	var row = frappe.model.add_child(cur_frm.doc, "Payment Installment", "payments");
			// 	row.payment=frm.doc.payable_amount
			// 	row.date=frm.doc.booking_date
			// 	row.remaining=frm.doc.balance_amount
			// 	row.payment_type=frm.doc.payment_type
			// 	refresh_field("payments");
			// }
			
			$.each(cur_frm.doc.payments, function(i, d){
				fnl_ttl=fnl_ttl+d.payment*1
				//console.log("JAI HIND",fnl_ttl)
			}  )
			
			temp=frm.doc.bill_amount-fnl_ttl
			frm.set_value("total",fnl_ttl) 
			if(temp){
				frm.set_value("balance_amount",temp) 
			}
			else {
				frm.set_value("balance_amount","0")
			}
			row.remaining=temp
			refresh_field("payments");
			refresh_field("payable_amount");
			frm.set_value("payable_amount","")
			cur_frm.refresh_fields()
		}
		else if (frm.doc.balance_amount==0){
			console.log("BHAI PRINT HOJA")
			msgprint(__("You Have Cleared Your All Outstanding Amounts."));
		}

		refresh_field("payments");



	},

	approver:function(frm,cdt,cdn){
		// var fnl_ttl = 0;
		// var row = locals[cdt][cdn];
		// $.each(cur_frm.doc.payments, function(i, d){
		// 	console.log("jai hind",d.payment)	

		// 	fnl_ttl=fnl_ttl+d.payment*1
		// 	console.log("JAI HIND",fnl_ttl)
				
		// }  )
		// temp=frm.doc.bill_amount-fnl_ttl
		// frm.set_value("balance_amount",temp) 

	}	



	

});

frappe.ui.form.on('Payment Installment',{

	date:function(frm,cdt,cdn)
	{
		var fnl_ttl = 0;
		var row = locals[cdt][cdn];
		$.each(cur_frm.doc.payments, function(i, d){
			console.log("jai hind",d.payment)
			fnl_ttl=fnl_ttl+d.payment
			con
				
		}  )
	}

});
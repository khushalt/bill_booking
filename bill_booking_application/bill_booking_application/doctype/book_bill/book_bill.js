// Copyright (c) 2016, New Indictrans Technologies pvt.ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Book Bill', {
	validate: function(frm,cdt,cdn){
		var bill_amnt=frm.doc.bill_amount
		frm.set_value("grand_bill_total",bill_amnt)
		var fnl_ttl=0
		$.each(cur_frm.doc.payments, function(i, d){
			fnl_ttl=fnl_ttl+d.payment*1
			}  )
		frm.set_value("total",fnl_ttl) 
		frm.refresh_fields();
		if(!frm.doc.__islocal && frm.doc.workflow_state=='Rejected' && frappe.session.user=='Administrator'){
			var temp="Draft"
		 	frm.set_value("workflow_state",temp) 
		}
		if(!frm.doc.__islocal && frm.doc.workflow_state=='Approved by Finance Manager' && frappe.session.user=='Administrator'){
			var temp="Draft"
		 	frm.set_value("workflow_state",temp) 
		}
		
		console.log("SECOND CONDITION",frm.doc.workflow_state=='Draft' && frappe.session.user=="khushal.t@indictranstech.com" )
		if(!frm.doc.__islocal && frm.doc.workflow_state=='Draft' && frappe.session.user=="khushal.t@indictranstech.com" ){
			var temp1="Approved by Finance Manager"
			frm.set_value("workflow_state",temp1) 
		}
    },

	refresh: function(frm) {

	},

	onload:function(frm){
		if (!frm.doc.booking_date) {
			frm.set_value("booking_date", get_today());
		}

	},

	approver:function(frm){
		if(frm.doc.approver){
			frm.set_value("approver_name", frappe.user.full_name(frm.doc.approver));
		}
	},

	payable_amount:function(frm,cdt,cdn){
		if(frm.doc.bill_amount && frm.doc.payment_type){
			if(frm.doc.balance_amount>0 || frm.doc.balance_amount==undefined){
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
		else if (frm.doc.balance_amount==0 ){
			console.log("BHAI PRINT HOJA")
			msgprint(__("You Have Cleared Your All Outstanding Amounts."));
			 frm.set_value("payable_amount","")
		}

	}
	else {
		msgprint(__("select payment type first."));
		frm.set_value("payable_amount","")
		return false;
	}
}

});

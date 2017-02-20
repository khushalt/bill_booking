// Copyright (c) 2016, New Indictrans Technologies pvt.ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Book Bill', {
	// validate: function(frm,cdt,cdn){

	// 	var bill_amnt=frm.doc.bill_amount
	// 	var final_amount=0
	// 	frm.set_value("grand_bill_total",bill_amnt)
	// 	console.log("khuuhhkjkhkj")
	// 	if(frm.doc.payments && frm.doc.workflow_state=="Approved by Finance Manager"){
	// 		$.each(frm.doc.payments,function(i,v){
	// 			if(!v.stat){
	// 				v.stat="Approved by Finance Manager"
	// 				// final_amount+=final_amount+v.payment*1
	// 			}
	// 		})
	// 	}
	// 	// 	frm.set_value("total",final_amount)
	// },

	refresh: function(frm) {
			if(frm.doc.payments){
				console.log("HHHHHHHHHHHHH")
				var fnl_ttl=0
				$.each(cur_frm.doc.payments, function(i, d){
					fnl_ttl=fnl_ttl+d.payment*1
				} )
				frm.set_value("total",fnl_ttl)
				var grnd_ttl=frm.doc.bill_amount
				var total_=grnd_ttl-fnl_ttl
				console.log("BALANCE AND AMOUNT",fnl_ttl,"grand total",grnd_ttl)
				frm.set_value("balance_amount",total_)
				if(frm.doc.total==grnd_ttl){
					frm.set_value("balance_amount","0")
					refresh_field("balance_amount");
					console.log("BHAI AAJ HO JA TAYARTU")
				}
				if(frm.doc.balance_amount){
					var bllamnt=frm.doc.bill_amount
					frm.set_value("lance",frm.doc.balance_amount)
				}
				frm.refresh_fields();
		}
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

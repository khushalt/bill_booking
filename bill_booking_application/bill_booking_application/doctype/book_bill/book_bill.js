// Copyright (c) 2016, New Indictrans Technologies pvt.ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Book Bill', {
	//initiates before workflow 
	 validate: function(frm,cdt,cdn){

	 	var bill_amnt=frm.doc.bill_amount
		var final_amount=0
		frm.set_value("grand_bill_total",bill_amnt)
		
		if(frm.doc.payments && frm.doc.workflow_state=="Approved by Finance Manager" && frappe.session.user=="khushal.t@indictranstech.com"){
			$.each(frm.doc.payments,function(i,v){
				if(!v.stat){
					v.stat="Approved by Finance Manager"
					// final_amount+=final_amount+v.payment*1
				}
			})
		}
		if(frm.doc.payments){
		$.each(frm.doc.payments,function(i,v){
			if(v.stat=="Approved by Finance Manager"){
			final_amount=final_amount+v.payment
			}
		})
		}

	console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",final_amount)
	frm.set_value("total",final_amount)
	var get=frm.doc.grand_bill_total-final_amount
	frm.set_value("balance_amount",get)
	frm.set_value("lance",frm.doc.balance_amount)
	refresh_field("balance_amount")
	},

	refresh: function(frm) {
		refresh_field("payments")
		// var final_amount=0
		// $.each(frm.doc.payments,function(i,v){
		// 		if(v.stat=="Approved by Finance Manager"){
					
		// 			final_amount+=final_amount+v.payment*1
		// 		}
		// 	})
		// frm.set_value("total",final_amount)

		// 	if (frm.doc.bill_amount)
		// 		frm.set_value("grand_bill_total",frm.doc.bill_amount)	
		// 	if(frm.doc.payments){
		// 		// console.log("HHHHHHHHHHHHH")
		// 		var fnl_ttl=0
		// 		$.each(cur_frm.doc.payments, function(i, d){
		// 			fnl_ttl=fnl_ttl+d.payment*1
		// 		} )
		// 		frm.set_value("total",fnl_ttl)
		// 		var grnd_ttl=frm.doc.bill_amount
		// 		var total_=grnd_ttl-fnl_ttl
		// 		// console.log("BALANCE AND AMOUNT",fnl_ttl,"grand total",grnd_ttl)
		// 		frm.set_value("balance_amount",total_)
		// 		if(frm.doc.total==grnd_ttl){
		// 			frm.set_value("balance_amount","None")
		// 			refresh_field("balance_amount");
		// 			// console.log("BHAI AAJ HO JA TAYARTU")
		// 		}
		// 		if(frm.doc.balance_amount){
		// 			var bllamnt=frm.doc.bill_amount
		// 			frm.set_value("lance",frm.doc.balance_amount)
		// 		}
		// 		frm.refresh_fields();
		// }
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

	// payable_amount:function(frm,cdt,cdn){
	// 	if(frm.doc.bill_amount && frm.doc.payment_type){
	// 		if(frm.doc.balance_amount>0 || frm.doc.balance_amount==undefined){
	// 			var row = locals[cdt][cdn];
	// 			var fnl_ttl = 0;
	// 			balance_value=frm.doc.bill_amount-frm.doc.payable_amount
	// 			frm.set_value("balance_amount",balance_value) 
	// 			if(frm.doc.payable_amount){
	// 				var row = frappe.model.add_child(cur_frm.doc, "Payment Installment", "payments");
	// 				row.payment=frm.doc.payable_amount
	// 				row.date=frm.doc.booking_date
	// 				row.remaining=frm.doc.balance_amount
	// 				row.payment_type=frm.doc.payment_type
	// 				refresh_field("payments");
	// 			}
				
	// 			$.each(cur_frm.doc.payments, function(i, d){

	// 				fnl_ttl=fnl_ttl+d.payment*1
	// 				//console.log("JAI HIND",fnl_ttl)
	// 			}  )
				
	// 			temp=frm.doc.bill_amount-fnl_ttl
	// 			frm.set_value("total",fnl_ttl) 
	// 			if(temp){
	// 				frm.set_value("balance_amount",temp) 
	// 			}
	// 			else {
	// 				frm.set_value("balance_amount","0")
	// 			}
	// 			row.remaining=temp
	// 			refresh_field("payments");
	// 			refresh_field("payable_amount");
	// 			frm.set_value("payable_amount","")
	// 			cur_frm.refresh_fields()
	// 		}
	// 	else if (frm.doc.balance_amount==0 ){
	// 		// console.log("BHAI PRINT HOJA")
	// 		// msgprint(__("You Have Cleared Your All Outstanding Amounts."));
	// 		//  frm.set_value("payable_amount","")
	// 	}

	// }
	// else {
	// 	msgprint(__("select payment type first."));
	// 	frm.set_value("payable_amount","")
	// 	return false;
	// }
	// },

		make_payment:function(frm){
			
			var d=new frappe.ui.Dialog({
				fields: [
					{
						"fieldtype":"Select","label":__("Payment Type"), "fieldname":"payment_type","options":["Cash","Cheque","Online","Others"],"reqd":1,
							change:function(){
							}
					},
					{
					"fieldtype":"Data","label":__("Payable Amount"), "fieldname":"payable_amount",
						change:function(cdt,cdn){
							if(frm.doc.balance_amount>0 || frm.doc.balance_amount==undefined){
								
								console.log("Har Har Mahadev 3")	
								var fnl_ttl = 0;
								balance_value=frm.doc.bill_amount-cur_dialog.get_value("payable_amount")
								frm.set_value("balance_amount",balance_value)
								
								if(cur_dialog.get_value("payable_amount")){
									
									var row = frappe.model.add_child(cur_frm.doc, "Payment Installment", "payments");
									row.payment=cur_dialog.get_value("payable_amount")
									row.date=frm.doc.booking_date
									row.remaining=frm.doc.balance_amount
									row.payment_type=cur_dialog.get_value("payment_type")
									refresh_field("payments");	
								} 

								$.each(cur_frm.doc.payments, function(i, d){
									fnl_ttl=fnl_ttl+d.payment*1
									console.log("JAI HIND",fnl_ttl)
								})

	 							temp=frm.doc.bill_amount-fnl_ttl
								frm.set_value("total",fnl_ttl) 
								console.log("AAAAAAAA",temp)
	 							if(temp){
	 								frm.set_value("balance_amount",temp) 
 								}

 								// row.remaining=temp
								refresh_field("payments");
								cur_frm.refresh_fields()
							}

							else if (frm.doc.balance_amount==0 ){
	 							console.log("BHAI PRINT HOJA")
								msgprint(__("You Have Cleared Your All Outstanding Amounts."));
							  	frm.set_value("payable_amount","")
							}	
						}
					}
				]
			})
			d.show();
		}


});



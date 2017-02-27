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

	frm.set_value("total",final_amount)
	var get=frm.doc.grand_bill_total-final_amount
	frm.set_value("balance_amount",get)
	frm.set_value("lance",frm.doc.balance_amount)
	refresh_field("balance_amount")
	},

	refresh: function(frm) {
		refresh_field("payments")
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
	
	},

	make_payment:function(frm){

			var dialog =new frappe.ui.Dialog({
				fields: [
					{
						"fieldtype":"Select","label":__("Payment Type"), "fieldname":"payment_type","options":["Cash","Cheque","Online","Others"],"reqd":1,
							change:function(){
							}
					},
					{
					"fieldtype":"Data","label":__("Payable Amount"), "fieldname":"payable_amount",
						change:function(cdt,cdn){
							console.log("#########")
							if(frm.doc.balance_amount>0 || frm.doc.balance_amount==undefined){
								// var paymt=cur_dialog.get_value("payable_amount")
								paymt = dialog.fields_dict.payable_amount.get_value()
								payment_type = dialog.fields_dict.payment_type.get_value()
								console.log(paymt <= frm.doc.bill_amount)
								 if(cint(paymt) <= cint(frm.doc.bill_amount)){
									
									var fnl_ttl = 0;
									balance_value=frm.doc.bill_amount-paymt
									frm.set_value("balance_amount",balance_value)
									
									if(paymt){
										
										var row = frappe.model.add_child(cur_frm.doc, "Payment Installment", "payments");
										row.payment=paymt
										row.date=frm.doc.booking_date
										row.remaining=frm.doc.balance_amount
										row.payment_type=payment_type
										refresh_field("payments");	
									} 

									$.each(cur_frm.doc.payments, function(i, d){
										fnl_ttl=fnl_ttl+d.payment*1
										
									})

		 							temp=frm.doc.bill_amount-fnl_ttl
									frm.set_value("total",fnl_ttl) 
									
		 							if(temp){
		 								frm.set_value("balance_amount",temp) 
	 								}

	 								// row.remaining=temp
									refresh_field("payments");
									cur_frm.refresh_fields()
								}
								else {
								msgprint(__("Amount cannot be greater than bill amount."));
								 throw "cannot";
								
							}
							}

							else if (frm.doc.balance_amount==0 ){
	 							
								msgprint(__("You Have Cleared Your All Outstanding Amounts."));
							  	frm.set_value("payable_amount","")
							}	
						}
					}
				]
			})
			dialog.show();
		}
});



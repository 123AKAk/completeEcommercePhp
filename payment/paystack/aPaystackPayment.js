function makePayment(aemail, total, aname)
{
    aemail = document.getElementById(aemail).innerHTML;
    total = document.getElementById(total).value;
    aname = document.getElementById(aname).innerHTML;

    //console.log(aemail, aname);

    var handler = PaystackPop.setup({
        key: "pk_test_ed070dec26c5cac560e196ac4d05b506ebfd6f07",
        // key: "pk_live_e2c782b3b22c409117df30578afd9cf5c2dfd6db",
        email: aemail,
        amount: total,
        currency: "NGN",
        ref: "" + Math.floor(Math.random() * 1000000000 + 1), 
        // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
        custom_fields: [
            {
            display_name: aname,
            variable_name: "Thekan Products Payment",
            value: aemail,
            },
        ],
        },
        callback: function (response) {
        if (response.status == "success") 
        {
            let formdata = new FormData();
            formdata.append("namespace", "storeTransaction");
            formdata.append("txn_id", response.reference);
            formdata.append("final_total", total);

            let loca = "payment/paystack/payment_process.php";
            fetch(loca, { method: "POST", body: formdata })
            .then(res => res.text())
            .then(result => 
            {
                console.log(result);
                var suq = JSON.parse(result);
                if (suq.response == true) 
                {
                    if(suq.message != "")
                    alertify.set('notifier','position', 'top-right');
			        alertify.success(suq.message);
                }
                else
                {
                    alertify.set('notifier','position', 'top-right');
			        alertify.error(suq.message);
                }

            });
            
            console.log("success. transaction ref is " + response.reference);
        }
        else {
            alertify.error("Payment was not Successful");
        }
        // order(a);
        // location.href = "ending";
        },
        onClose: function () {
            console.log("Paystack Payment Window closed");
            alertify.set('notifier','position', 'top-right');
            alertify.error("Payment Cancelled");
        },
    });
    handler.openIframe();
}
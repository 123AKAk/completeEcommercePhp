
$( "#addToCartIframe" ).submit(function(event)
{
    // alert($( "#eypid" ).val() +" | "+ $( "#p_qty" ).val() +" | "+ $( "#size_id" ).val() +" | "+ $( "#color_id" ).val() +" | "+ $( "#p_current_price" ).val() +" | "+ $( "#p_name" ).val() +" | "+ $( "#p_featured_photo" ).val());

    $.post('addToCartIframe.php', {
        form_add_to_cart: "submit",
        eypid: $( "#eypid" ).val(),
        p_qty: $( "#p_qty" ).val(),
        size_id: $( "#size_id" ).val(),
        color_id: $( "#color_id" ).val(),
        p_current_price: $( "#p_current_price" ).val(),
        p_name: $( "#p_name" ).val(),
        p_featured_photo: $( "#p_featured_photo" ).val()
    },
    function(result)
    {
        //alert(result);
        var suq = JSON.parse(result);
        if (suq.response == true)
        {
            if(suq.message != "")
            {
                alertify.set('notifier','position', 'top-right');
                alertify.success(suq.message);
            }
        } 
        else
        {
            if(suq.response == false)
            {
                alertify.set('notifier','position', 'top-right');
                //on user click disappears
                alertify.error(suq.message, "", 0);
            }
            else
            {
                alertify.set('notifier','position', 'top-right');
                alertify.message(suq.message);
                reset();
            }
        }

        $("#divrefresh").load(location.href + " #divrefresh");
        $("#cartBtnRefresh").load(location.href + " #cartBtnRefresh");
    });
    event.preventDefault();
});


// $( "#bnewslettre-form" ).submit(function( event ) 
// {
//     var aemail = $( "#bnewsletteremail" ).val();
    
//     let formdata = new FormData();
//     formdata.append("email", $( "#bnewsletteremail" ).val());

//     let loca = "assets/subnewsletter.php";
//     fetch(loca, { method: "POST", body: formdata })
//     .then(res => res.text())
//     .then(data => 
//     {
//         var result = JSON.parse(data);
//         $( "#bmsgspan" ).text( result.message ).show().fadeOut( 5000 );
//     });
        
//     event.preventDefault();
// }); 
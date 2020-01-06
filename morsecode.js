var mc_letters = ['.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..']
var mc_numbers = ['.----', '..---', '...--', '....-', '.....', '-....', '--...', '---..', '----.', '-----']
$(document).ready(function() {
	$('.mc_text').keypress(function (e) {
	    var regex = new RegExp("^[a-zA-Z0-9]+$");
	    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	    if (regex.test(str) || e.which == 32) {
	        return true;
	    }
	    e.preventDefault();
	    return false;
	});
	
	
	$(".mc_text").change(function() {
		var ip = $(".mc_text").val().toLowerCase();
        var op = "";
        var isNumber = /^\d+$/;
        for (i = 0; i < ip.length; i++) {
			if(ip[i] == " ")
				op += "/ ";
			else {
            	if (isNumber.test(ip[i])) {
            	    if(ip[i] == 0)
						op += mc_numbers[9] + " ";
					else
						op += mc_numbers[ip[i] - 1] + " ";
				}
            	else
            	    op += mc_letters[ip.charCodeAt(i) - 97] + " ";
			}
        }
        $(".mc_output_code").text(op);
	});

    $(".mc_code").change(function() {
        var ip = $(".mc_code").val();
        var iparr = ip.split(" ");
        var op = "";
        for (i = 0; i < iparr.length; i++) {
			if(iparr[i] == "/")
				op += " ";
			else {
            	var index = $.inArray(iparr[i], mc_letters);
				if(index == -1) {				
					if($.inArray(iparr[i], mc_numbers) == 9)
						op += "0";
					else
						op += $.inArray(iparr[i], mc_numbers) + 1;
				}
				else
            		op += String.fromCharCode(97 + index);
			}
        }
        $(".mc_output_text").text(op);
    });
});

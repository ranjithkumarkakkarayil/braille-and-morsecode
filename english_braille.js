// Unified english braille code
var letters = ["1", "12", "14", "145", "15", "124", "1245", "125", "24", "245", "13", "123", "134", "1345", "135", "1234", "12345", "1235", "234", "2345", "136", "1236", "2456", "1346", "13456", "1356"]
var numbers = ["245", "1", "12", "14", "145", "15", "124", "1245", "125", "24"]
var others = {
    ",": "2",
    ";": "23",
    ":": "25",
    ".": "256",
    "?": "236",
    "!": "235",
    "'": "3",
    "(": "5 126",
    ")": "5 345",
    "/": "456 34",
    "-": "36",
    "_": "6 36",
    "&": "4 12346",
    "*": "5 35",
    "@": "4 1",
    "©": "45 14",
    "®": "45 1235",
    "™": "45 2345",
    "°": "45 245",
    "%": "46 356",
    "+": "5 235",
    "-": "5 36",
    "=": "5 2356",
    "×": "5 236",
    "÷": "5 34",
    ".": "46"
}

// Dot positions
var x1 = 24,
    x2 = 40;
var y1 = 16,
    y2 = 32,
    y3 = 48;

// Dot sizes
var w = 64;
var h = 64;
var radius = 5;

// Regex
var isNumber = /^\d+$/;
var isLetter = /^[a-zA-Z()]+$/;
var hasSpace = /\s/g;

$(document).ready(function() {

    $(".braille_text").change(function() {

        $("#br_output_code").empty();


        var ip = $(".braille_text").val();

        var br_array = [];
        for (i = 0; i < ip.length; i++) {
            if (isNumber.test(ip[i])) {
                if (!isNumber.test(ip[i - 1]))
                    br_array.push("3456");
                br_array.push(numbers[ip[i]]);
            } else {
                if (isLetter.test(ip[i])) {
                    if (ip[i] == ip[i].toUpperCase()) {
                        br_array.push("6");
                        br_array.push(letters[ip.toLowerCase().charCodeAt(i) - 97]);
                    } else
                        br_array.push(letters[ip.charCodeAt(i) - 97]);
                } else {

                    var othrs = "";
                    Object.keys(others).forEach(function eachKey(key) {
                        othrs = others[ip[i]];
                    });

                    if (othrs) {
                        if (hasSpace.test(othrs)) {
                            var iparr = othrs.split(" ");
                            for (j = 0; j < iparr.length; j++)
                                br_array.push(iparr[j]);
                        } else
                            br_array.push(othrs);
                    }
                }
            }
        }

        var br_op = [];
        for (i = 0; i < br_array.length; i++) {
            var letter = br_array[i];

            var letter_dot = '<svg id="' + ip[i] + '" ';
            letter_dot += 'width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
            letter_dot += '<rect x="0" y="0" width="' + w + '" height="' + h + '" ';
            letter_dot += 'fill="none" stroke-width="1" stroke=""/>';

            for (j = 0; j < letter.length; j++) {
                switch (letter[j]) {
                    case "1":
                        letter_dot += draw_br_dots(x1, y1);
                        break;
                    case "2":
                        letter_dot += draw_br_dots(x1, y2);
                        break;
                    case "3":
                        letter_dot += draw_br_dots(x1, y3);
                        break;
                    case "4":
                        letter_dot += draw_br_dots(x2, y1);
                        break;
                    case "5":
                        letter_dot += draw_br_dots(x2, y2);
                        break;
                    case "6":
                        letter_dot += draw_br_dots(x2, y3);
                        break;
                }
            }
            letter_dot += '</svg>';

            br_op.push(letter_dot);
        }

        for (i = 0; i < br_op.length; i++) {
            var op = document.createElement("div");
            op.className = "braille";
            op.innerHTML += br_op[i];
            $("#br_output_code").append(op);
        }

    });

    setup_braille_selection();

    $(".br_select").click(function() {
        var val = $(this).attr("data-value");
        var txtnum = $("input[name='txtnum']:checked").val();
        var selval = "";
        if (txtnum == "number") {
            selval = val.split('/')[1];
        } else {
            if ($("#chk_uppercase").is(':checked'))
                selval = val.split('/')[0].toUpperCase();
            else
                selval = val.split('/')[0];
        }

    });
});

function draw_br_dots(cx, cy) {
    var svg_path = '';
    svg_path += '<path d="M ' + cx + ',' + cy + ' ';
    svg_path += 'm -' + radius + ',0 ';
    svg_path += 'a ' + radius + ',' + radius + ' 0 1,0 ' + radius * 2 + ',0 ';
    svg_path += 'a ' + radius + ',' + radius + ' 0 1,0 -' + radius * 2 + ',0 ';
    svg_path += 'z' + '"/>';
    return svg_path;
}

function setup_braille_selection() {
    var brs = [];
    var br_others = [];
    for (i = 0; i < letters.length; i++) {
        var ltr = letters[i];

        var braille = '<svg id="br_' + i + '" ';
        braille += 'width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
        braille += '<rect x="0" y="0" width="' + w + '" height="' + h + '" ';
        braille += 'fill="none" stroke-width="1" stroke=""/>';

        for (j = 0; j < ltr.length; j++) {
            switch (ltr[j]) {
                case "1":
                    braille += draw_br_dots(x1, y1);
                    break;
                case "2":
                    braille += draw_br_dots(x1, y2);
                    break;
                case "3":
                    braille += draw_br_dots(x1, y3);
                    break;
                case "4":
                    braille += draw_br_dots(x2, y1);
                    break;
                case "5":
                    braille += draw_br_dots(x2, y2);
                    break;
                case "6":
                    braille += draw_br_dots(x2, y3);
                    break;
            }
        }
        braille += '</svg>';
        brs.push(braille);
    }

    var other_list = Object.values(others).join(',')
    var other_keys = Object.keys(others).join(',');

    var otherlist = other_list.split(",");

    for (i = 0; i < otherlist.length; i++) {
        var letter = otherlist[i];

        var braille = '<svg id="br_' + i + '" ';
        braille += 'width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
        braille += '<rect x="0" y="0" width="' + w + '" height="' + h + '" ';
        braille += 'fill="none" stroke-width="1" stroke=""/>';

        for (j = 0; j < letter.length; j++) {
            switch (letter[j]) {
                case "1":
                    braille += draw_br_dots(x1, y1);
                    break;
                case "2":
                    braille += draw_br_dots(x1, y2);
                    break;
                case "3":
                    braille += draw_br_dots(x1, y3);
                    break;
                case "4":
                    braille += draw_br_dots(x2, y1);
                    break;
                case "5":
                    braille += draw_br_dots(x2, y2);
                    break;
                case "6":
                    braille += draw_br_dots(x2, y3);
                    break;
            }
        }
        braille += '</svg>';
        br_others.push(braille);

    }

    for (i = 0; i < brs.length; i++) {
        var op = document.createElement("div");
        op.className = "braille br_select";

        var att = document.createAttribute("data-value");
        if (i < 9) {
            op.innerHTML += brs[i] + "<br/><center>" + String.fromCharCode(97 + i) + " / " + parseInt(i + 1) + "</center>";
            att.value = String.fromCharCode(97 + i) + "/" + parseInt(i + 1);

        } else if (i == 9) {
            op.innerHTML += brs[i] + "<br/><center>" + String.fromCharCode(97 + i) + " / 0</center>";
            att.value = String.fromCharCode(97 + i) + "/0";
        } else {
            op.innerHTML += brs[i] + "<br/><center>" + String.fromCharCode(97 + i) + "</center>";
            att.value = String.fromCharCode(97 + i) + "/" + String.fromCharCode(97 + i);
        }

        op.setAttributeNode(att);
        $("#br_container").append(op);
    }

    for (i = 0; i < br_others.length; i++) {
        var op = document.createElement("div");
        op.className = "braille br_select";

        var att = document.createAttribute("data-value");

        op.innerHTML += br_others[i] + "<br/><center>" + other_keys.split(",")[i] + "</center>";
        att.value = other_keys.split(",")[i] + "/" + other_keys.split(",")[i];

        $("#br_container").append(op);
    }


}
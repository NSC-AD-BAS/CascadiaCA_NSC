/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    //sets a function to the addmore button that generates more html for another
<<<<<<< HEAD
    //sponso
    $("#timeStart").timepicker({
        disableTextInput: true,
        timeFormat: 'H:i:s',
        noneOption: true
    });
    $("#timeStart").on("click", function () {
        //$("timeStart").timepicker.show();
    });
    $("#timeEnd").timepicker({
        disableTextInput: true,
        timeFormat: 'H:i:s',
        noneOption: true
    });
    $("#timeEnd").on("click", function () {
        //$("timeEnd").timepicker.show();
    });
    $("#dateStart").datepicker({
        dateFormat: "yy-mm-dd",
        showAnim: "fade",
        showButtonPanel: true
    });
    $("dateStart").on("click", function () {
        $("dateStart").datepicker().show();
    });
    $("#dateEnd").datepicker({
        dateFormat: "yy-mm-dd",
        showAnim: "fade",
        showButtonPanel: true
    });
    $("dateEnd").on("click", function () {
        $("dateEnd").datepicker().show();
    });
    
    $("#more_sponsors").click(function (e) {
        e.preventDefault();
        addSponsors();
=======
    //sponsor
    $("#addMore").click(function (e) {
        e.preventDefault();
        //adds more sponsors
        $("#fieldList").append("<li>&nbsp;</li>");
        $("#fieldList").append(
                "<li>Organization Name*:<input type='text' name=\n\
                            'organization_name[]' required></li>");
        $("#fieldList").append(
                "<li>Organization Website*:<input type='text' name=\n\
                            'organization_website[]'></li>");

>>>>>>> e8604ab836e8f7d97c0da7363f99999ea3b22192
    });
    //need function that generates the clickbox when html dropdown selected
    $("#type").change(function (e) {
        e.preventDefault();
        //resets the subtype, so that it doesn't duplicate if we change the 
        //value in the dropdown list
        $(".subtype").empty().append("SubTypes*:<div class='subtypes'></div><br>");
        //gets the type from the text
        var $s = $("#type option:selected").text();
        //checks which type was selected
        //values in the value tag will be submitted into database, will need to 
        //figure out how to parse the shortened versions of the tags into
        //text
        $(".subtypes").append(createChecklist($s));
        console.log(createChecklist($s));
    });

    $("#topic").change(function (e) {
        e.preventDefault();
        //resets the subtype, so that it doesn't duplicate if we change the 
        //value in the dropdown list
        $(".subtopic").empty().append("Subtopics*:<div class='subtopics'></div><br>");
        //gets the type from the text
        var $s = $("#topic option:selected").text();
        //checks which type was selected
        $(".subtopics").append(createChecklist($s));
        console.log(createChecklist($s));
    });
<<<<<<< HEAD
    var sponsor = 1;
    function addSponsors() {
        sponsor++;
        var currentSponsor = document.getElementById('sponsors')
        var nextSponsor = document.createElement("div");
        nextSponsor.innerHTML =
                '<div class="label">Sponsor ' + sponsor + ':</div><div class="content">\n\
            <span>Organization Name*:<input type="text"  name="organization_name[]" value=""/>\n\
            </span><span>Organization Website*:<input type="text"  name="organization_website[]" \n\
            value=""/></span></div>';
        currentSponsor.appendChild(nextSponsor)
    }

=======
    
>>>>>>> e8604ab836e8f7d97c0da7363f99999ea3b22192
    function createChecklist(t) {
        var attrCount;
        var str = "";
        if (t === 'Fossil Fuel') {
            attrCount = 4;
        } else if (t === 'Other' || t === 'Legislative/Regulatory' || t === 'Transport' ||
                t === 'Alternate Energy') {
            attrCount = 5;
        } else if (t === 'Action' || t === 'Knowledge' || t === 'Involvement') {
            attrCount = 6;
        }
        //subtype 0 is other 
        for (var i = 1; i <= attrCount; i++) {
            var subCount = getSub(t) + i;
            str += "<input type='checkbox' name='" + getSub(t) + "[]' value='";
            str += (getLabelText(t, i) + "'> ");
            str += "<label for='";
            str += (subCount + "'> ");
            str += (getLabelText(t, i));
            str += ("</label><br>");
        }
        //adds the other portion 
        str += "<input type='checkbox' name='" + getSub(t) + "[]' value='Other'>\n\
                <label for='" + getSub(t) + "0'>Other</label><br>";
        return str;
    }
    function getSub(t) {
        if (t === 'Other' || t === 'Legislate/Regulatory' || t === 'Transport' ||
                t === 'Alternate Energy' || t === 'Fossil Fuel') {
            return "subtopic";
        } else {
            return "subtype";
        }
    }

    function getLabelText(t, i) {
        if (t === 'Action') {
            switch (i) {
                case 1:
                    return "Rally | Marches";
                    break;
                case 2:
                    return "Kayaktivism";
                    break;
                case 3:
                    return "Hearings";
                    break;
                case 4:
                    return "Comment Period (ongoing)";
                    break;
                case 5:
                    return "In Person Lobbying";
                    break;
                case 6:
                    return "Direct Action | Civil Disobedience";
                    break;
            }
        } else if (t === 'Knowledge') {
            switch (i) {
                case 1:
                    return "Lecture | Talk | Speaker Event";
                    break;
                case 2:
                    return "Seminar | Conference";
                    break;
                case 3:
                    return "Forum | Panel";
                    break;
                case 4:
                    return "Movie/Film/Documentary";
                    break;
                case 5:
                    return "Training for Action";
                    break;
                case 6:
                    return "Workshops | Webinars";
                    break;
            }
        } else if (t === 'Involvement') {
            switch (i) {
                case 1:
                    return "Meetings | Fundraising";
                    break;
                case 2:
                    return "Letters to Representatives | Media";
                    break;
                case 3:
                    return "Art Builds | Flash Mobs | Music";
                    break;
                case 4:
                    return "Festivals & Fairs | Celebrations";
                    break;
                case 5:
                    return "Tabling | Phone Banking";
                    break;
                case 6:
                    return "Canvassing | Doorbelling";
                    break;
            }
        } else if (t === 'Fossil Fuel') {
            switch (i) {
                case 1:
                    return "Coal";
                    break;
                case 2:
                    return "Oil";
                    break;
                case 3:
                    return "Methane/LNG";
                    break;
                case 4:
                    return "Petroleum Products: e.g. Xylene, Methanol";
                    break;
            }
        } else if (t === 'Legislative/Regulatory') {
            switch (i) {
                case 1:
                    return "Carbon Pricing";
                    break;
                case 2:
                    return "Intl & Trade Agreements";
                    break;
                case 3:
                    return "TransportationSafety";
                    break;
                case 4:
                    return "Money Out of Politics";
                    break;
                case 5:
                    return "Mass Transit & Auto Fuel Efficieny";
                    break;
            }
        } else if (t === 'Transport') {
            switch (i) {
                case 1:
                    return "Export Terminals";
                    break;
                case 2:
                    return "Pipelines";
                    break;
                case 3:
                    return "Railroads/Trains";
                    break;
                case 4:
                    return "Airplanes";
                    break;
                case 5:
                    return "Marine Shipping";
                    break;
            }
        } else if (t === 'Alternate Energy') {
            switch (i) {
                case 1:
                    return "Nuclear Power";
                    break;
                case 2:
                    return "Solar Power";
                    break;
                case 3:
                    return "Other Energy: Geothermal, Hydroelectric, etc.";
                    break;
                case 4:
                    return "Wind";
                    break;
                case 4:
                    return "Conservation";
                    break;
            }
        } else if (t === 'Other') {
            switch (i) {
                case 1:
                    return "Justice & Equity";
                    break;
                case 2:
                    return "Trees, Soil, Agriculture";
                    break;
                case 3:
                    return "Divestment from Fossil Fuels";
                    break;
                case 4:
                    return "Investment in Non Fossil Energy";
                    break;
                case 4:
                    return "Sustainable Solutions";
                    break;
            }
        }
    }
});


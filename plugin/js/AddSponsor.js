/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    $("#addMore").click(function (e) {
        e.preventDefault();
        $("#fieldList").append("<li>&nbsp;</li>");
        $("#fieldList").append(
                "<li>Organization Name*:<input type='text' name=\n\
                            'organization_name' required></li>");
        $("#fieldList").append(
                "<li>Organization Website*:<input type='text' name=\n\
                            'organization_website'></li>");
    });
});

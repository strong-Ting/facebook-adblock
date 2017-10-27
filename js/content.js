function haveStr(str,search_str){
    var result = str.search(search_str);
    if(result == -1){
    return false
    }
    else{
    return true
    }
}


function when_change(){
//    $('div._4ikz:contains(贊助)').css('color','yellow');
    var ad_class = $('div._4ikz:contains(贊助)');
    var match = false;

    while(!match)
    {
        ad_class = ad_class.children();
        var idName = ad_class[0].id;
        if(idName === undefined){
            match = false;
        }
        else{
            match = haveStr(idName,'hyperfeed');
        }
        
    }
    for(var i = 0;i<ad_class.length;i++)
    {
        if(haveStr(ad_class[i].innerHTML,"贊助"))
        {
            ad_class[i].style.color = 'yellow';
        }
    }
//   ad_class[0].style.color = 'yellow';

}
$(document).bind('DOMSubtreeModified', function () {
    when_change();
});
var test = document.getElementById('pagelet_ego_pane');
test.style.display = 'none';

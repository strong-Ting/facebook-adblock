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
     //       ad_class[i].style.display = 'none';
            ad_class[i].style.color = 'yellow';
        }
    }

    }
var check_num = 0; //use class _5pcq to check new post add
var post_num = 0;
$(document).bind('DOMSubtreeModified', function () {
    var check_numTemp = $('._5pcq').length;
    var post_numTemp = document.getElementsByClassName('_5pbw _5vra').length - document.getElementsByClassName('_1qbu _5pbw _5vra').length - 1;
    if(check_numTemp>check_num){
    check_num = check_numTemp;
    when_change();
    console.log('old:'+post_num);
    console.log('new:'+post_numTemp);
    get_time(post_num,post_numTemp);
    post_num = post_numTemp;
    }
});
var test = document.getElementById('pagelet_ego_pane');
test.style.display = 'none';

var sponsor_array = [];
function get_time(post_num,post_numTemp){
    var time_class_obj =  $('span.fsm');
    var time_class = [];
    for(var i =0;i<time_class_obj.length;i++) // obj to array
    {
        time_class.push(time_class_obj[i]);
    }
    for(var i = 0 ;i<sponsor_array.length;i++)
    {
        time_class.splice(sponsor_array[i],0,"贊助貼文:"+sponsor_array[i]);
    } 
    for(var i = post_num;i<=post_numTemp;i++){
        try{
        console.log(time_class);
        var time_class_child =time_class[i].lastChild;
        var conect = time_class_child.href;
        var time = time_class_child.lastChild.title;
        console.log(i+":"+conect);
        console.log(i+":"+time);

        }
        catch(e){
        //    if(when_change()){
            var had = false;
            for(var j=0;j<sponsor_array.length;j++)
            {
                console.log('sponsor:'+sponsor_array[j],"i:"+i);
                if(sponsor_array[j]==i)
                {
                    had =true;
                }
            }
            if(!had){
                sponsor_array.push(i);
                time_class.splice(i, 0, "贊助貼文:"+i);  
            }
            console.log('贊助:'+i);

          //  }
        }   
    }
}



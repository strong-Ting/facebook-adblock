//hide side ad
document.getElementById('pagelet_ego_pane').style.display = 'none';

//listen post num add
var post_num = 0;
var check_num = 0;
$(document).bind('DOMSubtreeModified',function(){
    var post_numTemp = get_post_num();
    var check_numTemp = check_post_load();
    if(post_numTemp > post_num && check_numTemp > check_num){
        var time_now = new Date();
        console.log('load post:'+post_numTemp,'time:'+time_now.getTime());
        post_sponsor(post_num,post_numTemp);
    }
    post_num = post_numTemp;
//    console.log(post_numTemp);
});

function get_post_num(){
//    var post_condition_0 = $("div[id*='hyperfeed']");  //the condition cant work perfect
    var post_condition_1 = $("div[class*='_5jmm _5pat']");
    var post = post_condition_1 ;
    var post_num = post.length;
    return post_num;
}

function check_post_load(){
    var check = $('._5pcq');
    var check_num = check.length;
    return check_num;
}

//need to notice loading
var sponsor_num = 0;
function post_sponsor(post_num_changed,post_num_now)
{
    var post = $("div[class*='_5jmm _5pat']").find(':contains(贊助)');
    console.log("post_sponsor:" + post.length);
    if(post.length>sponsor_num)
    {
    for(var i=  post_num_changed;i<post_num_now;i++)
    {
        var ad = $("div[class*='_5jmm _5pat']").eq(i).find("div[id*='feed_subtitle']")//.find(':contains(贊助)');
        console.log(i);
        console.log($("div[class*='_5jmm _5pat']").eq(i));
        console.log(ad);
        if(ad.length > 0)
        {
            $("div[class*='_5jmm _5pat']").eq(i).css("color","yellow");
            console.log('changed');
        }
    }
    }
    sponsor_num = post.length;
}

//hide side ad
document.getElementById('pagelet_ego_pane').style.display = 'none';

//listen post num add
var post_num_changed = 0;
var post_num_now = 0;
var check_num = 0;
//to listen content area when the modified have sponsor to hide it!
$('#contentArea').on('DOMSubtreeModified',function(){
    var get_post_start_end = get_post_num(post_num_changed,post_num_now);
    post_num_changed = get_post_start_end.post_num_changed; 
    post_num_now = get_post_start_end.post_num_now;
    post_sponsor(post_num_changed,post_num_now);
    get_profileAndLink(post_num_changed,post_num_now);
});

function get_post_num(post_num_changed,post_num_now){
    var post = $("div[class*='_5jmm _5pat']");
    var post_num = post.length;
    if(post_num>post_num_now)
    {
        post_num_changed = post_num_now;
        post_num_now = post_num;

    }
    return {
        post_num_changed:post_num_changed,
        post_num_now:post_num_now
    };
}

function check_post_time_load(){
    var check = $('._5pcq');
    var check_num = 0;
    for (var i = check.length -1;i>0;i--)
    {
        if(check[i].href != undefined)
        {
            check_num++;
        }
    }
    return check_num;
}

//need to notice loading
var sponsor_num = 0;
function post_sponsor(post_num_changed,post_num_now)
{
    
    var sponsor_numTemp = $("div[class*='_5jmm _5pat']").find("div[id*='feed_subtitle']").children(':contains(贊助)');
    if(sponsor_numTemp.length>sponsor_num)
    {
        for(var i=  post_num_changed;i<=post_num_now;i++)
        {
            var ad = $("div[class*='_5jmm _5pat']").eq(i).find("div[id*='feed_subtitle']").children(':contains(贊助)');
            if(ad.length > 0)
            {
                $("div[class*='_5jmm _5pat']").eq(i).css("color","yellow");
                console.log('the post of sponsor:' + i);
            }
        }
    sponsor_num = sponsor_numTemp.length;
    }
}

var profile_num = 0;
function get_profileAndLink(post_num_changed,post_num_now)
{
    var profile_numTemp = $("div[class*='_5jmm _5pat']").find('.fwb.fcg').length;
    if(profile_numTemp > profile_num)
    {
        for(var i=  post_num_changed;i<=post_num_now;i++)
        {
            var profile = $("div[class*='_5jmm _5pat']").eq(i).find('.fwb.fcg');
            if(profile.length>0)
            {
                console.log('/////////////////////////////');
                    console.log('the '+i+' post:'+profile[0].innerText);
                    console.log('the '+i+' post:'+profile[0].lastChild.href);
                console.log('/////////////////////////////');
            }
/*            else
            {
                var profile_other = $("div[class*='_5jmm _5pat']").eq(i).find("div[class*='clearfix']").find('.fwn.fcg').find('.fcg').find('.fwb');
                 console.log('/////////////////////////////');
                    console.log('the '+i+' post:'+profile_other[0].innerText);
                    console.log('the '+i+' post:'+profile_other[0].lastChild.href);
                console.log('/////////////////////////////');
                

            }*/
        }
    }
    profile_num = profile_numTemp;
}

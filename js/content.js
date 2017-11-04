const block_slide = ()=>{
    try{
    $("#pagelet_ego_pane").hide();
    }
    catch(e){
        console.log('not have the slide ad')
    }
}

const dom_modified = ()=>{
    let jquery = 0;
    $("#pagelet_ego_pane").on('DOMSubtreeModified',function(){
        block_slide();
    });
    $("#stream_pagelet").on('DOMSubtreeModified',function(){
        let post = post_content(); 
        console.log(post.length);
    });
}

let post =(start,end)=> {
    let handle_num = start;
    const get_content = (handle)=>{
        let post = $('._5jmm._5pat._3lb4.d_1ox2hq53yy').eq(handle_num);
        if(post.find('the_post_done').length>0){
//            console.log('heve done');
        }
        else{
        handle(post);
        }
    };
    //when the post have been handled append a class,in order to check it.
    const done =(post)=>{
        let done = document.createElement("the_post_done");
        let messageNode = document.createTextNode('have done');
        //pElement.style.display='none'; 
        done.append(messageNode);
        post.append(done);
    };

    const is_sponsor = (post)=>{
        let sponsor = post.children(':contains(贊助)');

        if(sponsor.length > 0){
            post.css("color","yellow");
            console.log('the num:' +handle_num+'  is sponsor');
            done(post);
        }
        else{
            get_detail(post);
        }

            };
    const get_detail = (post)=>{
        let href='',
            author_name='',
            author_href='',
            time='';

        try{
            href = post.find('._5pcq')[0].href;
            try{
                let author =  post.find('.fwb');
                for(let i=author.length-1;i>=0;i--){
                    author_name = author_name +' , ' +author.eq(i).find('a').text();        
                    console.log(author.eq(i).find('a'));
                    author_href =author_href+' , '+author[i].lastChild.href;
                }
            }
            catch(e){
                console.log(e);
            }
            time = post.find('abbr._5ptz')[0].title;

            console.log('the num:'+handle_num);
            console.log('post_href:'+href);
            console.log('author_name:'+author_name);
            console.log('author_href:'+author_href);
            console.log('time:'+time);
            console.log('/////////////////////////////');

            done(post);
        }
        catch(e){
        //    console.log(e);
        }

    };

    for(handle_num;handle_num<=end;handle_num++){
        get_content(is_sponsor); 
    }
    
};

const get_post_num=(last_load,load)=>{
    let post = $('._5jmm._5pat._3lb4.d_1ox2hq53yy');
    let post_num = post.length - 1 ;
    if(post_num>load)
    {
        last_load = load;
        load = post_num;

    }
    return {
        last_load:last_load,
        load:load
    };
}



const dom_modified_2=()=>{
    const dom_listenser=(idName,mutationHandler)=>{
        let target = document.querySelector(idName);
        let config = { attributes: true, childList: true, characterData: true,subtree:true};
        let observer = new MutationObserver(mutationHandler);
        observer.observe(target, config);
    };
    let last_load =0;
    let load = 0;
    dom_listenser('#stream_pagelet',(mutations)=>{
        let num = get_post_num(last_load,load);
        last_load = num.last_load;
        load = num.load;
        console.log(last_load,load);
        post(last_load,load);
    });
}



const first_work = ()=>{
//    dom_modified();
    dom_modified_2();
    block_slide();
}

first_work();

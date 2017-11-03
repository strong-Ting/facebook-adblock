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
        handle(post);
    }

    const is_sponsor = (post)=>{
        let sponsor = post.children(':contains(贊助)');
        if(sponsor.length > 0){
            post.css("color","yellow");
            console.log(handle_num+'  is sponsor');
        }
        else{
            get_detail(post);
        }
    }
    
    const get_detail = (post)=>{
        let href='',
            author_name='',
            author_href='',
            time='';
        href = post.find('._5pcq')[0].href;
        author_name = post.find('.fwb.fcg')[0].innerText;        
        author_href = post.find('.fwb.fcg')[0].lastChild.href;
        time = post.find('abbr._5ptz')[0].title;
        
        console.log('post_href:'+href);
        console.log('author_name:'+author_name);
        console.log('author_href:'+author_href);
        console.log('time:'+time);
    }

    for(handle_num;handle_num<=end;handle_num++){
        get_content(is_sponsor); 
    }
    
}
post(0,1);

const dom_modified_2=()=>{
    const dom_listenser=(idName,mutationHandler)=>{
        let target = document.querySelector(idName);
        let config = { attributes: true, childList: true, characterData: true,subtree:true};
        let observer = new MutationObserver(mutationHandler);
        observer.observe(target, config);
    };

    dom_listenser('#stream_pagelet',(mutations)=>{
    });
}



const first_work = ()=>{
//    dom_modified();
    dom_modified_2();
    block_slide();
}
first_work();

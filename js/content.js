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

const dom_modified_2=()=>{
    const dom_listenser=(idName,mutationHandler)=>{
        let target = document.querySelector(idName);
        let config = { attributes: true, childList: true, characterData: true,subtree:true};
        let observer = new MutationObserver(mutationHandler);
        observer.observe(target, config);
    };

    dom_listenser('#stream_pagelet',(mutations)=>{
        let post = post_content();
        console.log(post.length);
    });
}

const post_content = ()=>{
    let post = $('._5jmm._5pat._3lb4.d_1ox2hq53yy');
    return post 
}

const first_work = ()=>{
//    dom_modified();
    dom_modified_2();
    block_slide();
}
first_work();

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
    const done =(post,num)=>{
        let done = document.createElement("the_post_done");
        let messageNode = document.createTextNode('have done the post num:'+num);
        //pElement.style.display='none'; 
        done.append(messageNode);
        post.append(done);
    };

    const is_sponsor = (post)=>{
        let sponsor = post.find('._5pcp').children(':contains(贊助)');

        if(sponsor.length > 0){
            post.css("color","yellow");
            console.log('the num:' +handle_num+'  is sponsor');
            done(post,handle_num);
        }
        else{
            get_detail(post);
        }

    };
    const get_detail = (post)=>{

        let href='',
            author_name='',
            author_href='',
            time='',
            detail={},
            author_detail={};

        try{
            href = post.find('._5pcq')[0].href;
        }
        catch(e){
      /*
            console.log(e);
            console.log(post.find('.fsm.fwn.fcg'));
            href = post.find('.fsm.fwn.fcg').children()[0].href;
    */
        }

        try{
            let author =  post.find('._5va4').find('.fwb');
            //console.log(author);
            for(let i=0;i<author.length;i++){
                if(i==0){
                    author_name = author.eq(i).find('a').eq(0).text();
                    author_href = author[i].lastChild.href;
                    }
                else{
/*
                        author_name = author_name +' , ' +author.eq(i).find('a').eq(0).text();        
                    //   console.log(author.eq(i).find('a'));
                        author_href =author_href+' , '+author[i].lastChild.href;
*/
                    author_name = author.eq(i).find('a').eq(0).text();
                    author_href = author[i].lastChild.href;

                    console.log('*************************');
                }
                author_detail[i]={'href':author_href,'name':author_name};
            }
        }
        catch(e){
            console.log(e);
        }

        try{
            time = post.find('abbr._5ptz')[0].title;
        }
        catch(e){
        }  
          
        detail[handle_num]={'href':href,'time':time,'author':author_detail};
           /* 
            console.log('the num:'+handle_num);
            console.log('post_href:'+href);
            console.log('author_name:'+author_name);
            console.log('author_href:'+author_href);
            console.log('time:'+time);
            */
        if(href!='' && time!=''){
            console.log(detail);
            console.log('/////////////////////////////');
        }
        done(post,handle_num);
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

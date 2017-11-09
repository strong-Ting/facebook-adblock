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

    let last_load =0;
    let load = 0; 

    $("#stream_pagelet").on('DOMSubtreeModified',function(){
       let num = get_post_num(last_load,load);
        last_load = num.last_load;
        load = num.load;
        console.log(last_load,load);
        post(last_load,load);
    });
}

let post =(start,end)=> {
    let handle_num = start;
    const get_content = (handle)=>{
        let post = $('._5jmm._5pat._3lb4').eq(handle_num);
        if(post.find('the_post_done').length>0){
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
            post_id='',
            content='',
            feedback={},
            detail={},
            author_detail={};


        try{
            post_id = post[0].id;
        }
        catch(e){
        }

        try{
            content = post.find('.userContent').text();
        }
        catch(e){
        }

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
/*
            for(let i=0;i<author.length;i++){
                if(i==0){
                    author_name = author.eq(i).find('a').eq(0).text();
                    author_href = author[i].lastChild.href;
                    }
                else{

                    author_name = author.eq(i).find('a').eq(0).text();
                    author_href = author[i].lastChild.href;

                    console.log('*************************');
                }
            }
*/
            author_name = author.eq(0).find('a').eq(0).text();
            author_href = author[0].lastChild.href;

            author_detail={'href':author_href,'name':author_name};

        }
        catch(e){
        }

        try{
            time = post.find('abbr._5ptz')[0].title;
        }
        catch(e){
        }  

        //catch feedback num    
        try{

            let feedback_sel = post.find('._57w');
            let comment = feedback_sel.find('._ipm._-56').text(); //a lot post can't get
            let share = post.find('.UFIShareLink').text();
            if(share == ""){
                share = feedback_sel.find('._ipm._2x0m').text();
            }

            let feel_sel = post.find('._3t54').find('._3emk');
            let feel = {};
            for(let i=0;i<feel_sel.length;i++){
                feel[i] = feel_sel.eq(i).attr('aria-label');
            }
            feedback = {'comment':comment,'share':share,'feel':feel};

        }
        catch(e){
        }        

        detail[handle_num]={'id':post_id,'href':href,'time':time,'author':author_detail,'content':content,'feedback':feedback};

        if(href!='' && time!=''){
            console.log(detail);
            console.log('/////////////////////////////');
            done(post,handle_num);
        }

    };

    for(handle_num;handle_num<=end;handle_num++){
        get_content(is_sponsor); 
    }
    
};

const get_post_num=(last_load,load)=>{
    let post = $('._5jmm._5pat._3lb4');
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
};

const dom_listenser=(idName,mutationHandler)=>{
        let target = document.querySelector(idName);
        let config = { attributes: true, childList: true, characterData: true,subtree:true};
        let observer = new MutationObserver(mutationHandler);
        observer.observe(target, config);
    };

const dom_modified_2=()=>{
    
    let last_load =0;
    let load = 0;
    dom_listenser('#contentArea',(mutations)=>{
        let num = get_post_num(last_load,load);
        last_load = num.last_load;
        load = num.load;
        console.log(last_load,load);
        post(last_load,load);
    });
};



const first_work = ()=>{
//    dom_modified();

    dom_listenser('body',(mutations)=>{
        mutations.forEach((mutation)=>{
            for(let i=0;i<mutation.removedNodes.length;i++ ){
                if(mutation.removedNodes[i].id == 'feedx_sprouts_container'){
                    console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
                    dom_modified_2();
                    block_slide();
                }
            }
        });
    });
    dom_modified_2();
    block_slide();
};

first_work();

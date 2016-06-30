/**
 * Created by Administrator on 2016/6/28.
 */
request=require('request');
var jsdom=require('jsdom').jsdom;
var document=jsdom('<html></html></html>',{});
var window=document.defaultView;
var $=require('jquery')(window);
function AmzonF(ISBN) {
    var url='https://www.amazon.cn/s/ref=nb_sb_noss?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Dstripbooks&field-keywords='+ISBN;
    var result={};
    request(url,function (error,res,body) {
        if(!error){
            var SUrl=$(body).find('#result_0 a').attr('href');
            request(SUrl,function (error,res,body) {
                result['书名']=$(body).find('#productTitle').text();
                author=[];
                $(body).find("#byline span.author.notFaded").each(function (id,item) {
                    // var key=$(item).find('span span').text().replace('(','').replace(')','').replace(',','');
                    //console.log(key);
                    //if( key=='作者'){
                    //    author.push($(item).find('a').text());
                    //}
                    var value=$(item).find('a').text();
                    var key=$(item).find("span span").text().replace(",","");
                    author.push(value+key);
                })
                result['作者']=author;
               $(body).find("#s_contents").children().each(function (id,item) {
                    key=$(item).children("h3").text().trim();
                    value=$(item).children("p").text().trim();
                   result[key]=value;
                })
                var len=$(body).find('#detail_bullets_id ul').children().length
                $(body).find('#detail_bullets_id ul').children().each(function (id,item) {
                    if(id==len-2)
                    {return false}
                    else{
                    var a=$(item).text().trim().replace("：",":").replace(/[\r\n]/g,"").split(":");
                    result[a[0]]=a[1]
                    }
                })
            })
            return result;
        }
    })

}
//AmzonF(9787532759064);
exports.AmazonF=AmzonF;
/*var option={
    url:"https://www.amazon.cn/S-J-J-%E8%89%BE%E5%B8%83%E6%8B%89%E5%A7%86%E6%96%AF/dp/B01FDEINM4/ref=sr_1_1?s=books&ie=UTF8&qid=1467103593&sr=1-1&keywords=9787508650951",
}
request(option,function (error,res,body) {
    var result={};
    result['书名']=$(body).find('#productTitle').text();
    author=[];
    translator=[];
    $(body).find("#byline span.author.notFaded").each(function (id,item) {
       // var key=$(item).find('span span').text().replace('(','').replace(')','').replace(',','');
        //console.log(key);
        //if( key=='作者'){
        //    author.push($(item).find('a').text());
        //}
        var value=$(item).find('a').text();
        var key=$(item).find("span span").text().replace(",","");
        author.push(value+key);
    })
    result['作者']=author;
    $(body).find('#detail_bullets_id li:lt(10)').each(function (id,item) {
        if(id!=3)
        {var a=$(item).text().trim().replace(/[\r\n]/g,"").split(":");
        result[a[0]]=a[1];}

    });
    var b=$(body).find('#detail_bullets_id li:eq(3)').text().split("：");
    result[b[0]]=b[1];
    result['评分']=$(body).find('#reviewStarsLinkedCustomerReviews span.a-icon-alt').text();
})*/
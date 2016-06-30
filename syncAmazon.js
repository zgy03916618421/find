/**
 * Created by Administrator on 2016/6/29.
 */
var syncRequest=require('sync-request');
var jsdom=require('jsdom').jsdom;
var document=jsdom('<html></html></html>',{});
var window=document.defaultView;
var $=require('jquery')(window);
function AmazonF(ISBN) {
    var result={};
    var author=[];
    var url='https://www.amazon.cn/s/ref=nb_sb_noss?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Dstripbooks&field-keywords='+ISBN;
    var res=syncRequest('GET',url);
    var body1=res.getBody().toString();
    var SUrl=$(body1).find('#result_0 a').attr('href');
    var Sres=syncRequest('GET',SUrl);
    var body=Sres.getBody().toString();
    result['书名']=$(body).find('#productTitle').text();
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
    return result;
}
exports.AmazonF=AmazonF;
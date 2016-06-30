/**
 * Created by Administrator on 2016/6/30.
 */
var syncRequest=require('sync-request');
function DBF(ISBN) {
    var url="https://api.douban.com/v2/book/isbn/"+ISBN;
    var res=syncRequest('GET',url);
    var body=res.getBody().toString();
    //console.log(res.statusCode);
    return body;
}
//DBF(9787569908046);
exports.DBF=DBF;
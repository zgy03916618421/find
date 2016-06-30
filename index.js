/**
 * Created by Administrator on 2016/6/29.
 */
var http=require("http");
var url=require('url');
var AmazonF=require('./syncAmazon');
var DBF=require('./syncDB')
http.createServer(function (req,res) {
  var pathname=url.parse(req.url).pathname;
   var  Index=pathname.lastIndexOf('/');
    var ISBN=pathname.substr(Index+1);
    //var result=DBF.DBF(ISBN);
    var final={};
    if(ISBN!="favicon.ico"){
        //final["Amazon"]=AmazonF.AmazonF(ISBN);
        final["DouBan"]=DBF.DBF(ISBN);
        var result=JSON.stringify(final);
        res.writeHeader(200,{
            'Content-Type':"application/json;charset=utf-8"
        })
        //var result=AmazonF.AmazonF(ISBN);
        res.write(result);
        //console.log(result);
        res.end();
    }

}).listen(3000);
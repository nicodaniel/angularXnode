//'use strict';
//
//angular.module('app').
//filter('truncate', function () {
//        return function (text, length, end) {
//            if (isNaN(length))
//                length = 10;
//
//            if (end === undefined)
//                end = "...";
//
//
//            if (text.length <= length || text.length - end.length <= length) {
//                return text;
//            }
//            else {
//                return String(text).substring(0, length-end.length) + end;
//            }
//
//        };
//    });

//
//angular.module('app').
//filter('urlsimplifier', function () {
//    return function (text, length, end) {
//     console.log("filter");
//     if(text.indexOf("/v1/actsofmanagement/")!=-1){
//    	var index =  text.indexOf("/v1/actsofmanagement/");
//    	console.log("param : ", text.substr(index));
//    	return text.substr(index);
//     }
//    };
//});
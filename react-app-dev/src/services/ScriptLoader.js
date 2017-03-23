//Found at http://stackoverflow.com/questions/1866717/document-createelementscript-adding-two-scripts-with-one-callback/1867135#1867135

/* Usage:
import ScriptLoader from '@services/ScriptLoader';
ScriptLoader([
   "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js",
   "http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js"
],function(){
    console.log('All things are loaded');
});
*/

export default (array,callback) => {
    var loader = function(src,handler){
        var script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = function(){
            script.onreadystatechange = script.onload = null;
            handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function run(){
        if(array.length!=0){
            loader(array.shift(), run);
        }else{
            callback && callback();
        }
    })();
}

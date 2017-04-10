function absPos(obj) {
  let curleft = 0;
  let curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return {x: curleft, y: curtop};
  }
}

function offsetFromParent(ele){
  let curleft = 0;
  let curtop = 0;
  if (ele.offsetParent) {
    curleft += ele.offsetLeft;
    curtop += ele.offsetTop;
    return {x: curleft, y: curtop};
  } else {
    return {x: 0, y: 0};
  }
}

export {absPos, offsetFromParent};

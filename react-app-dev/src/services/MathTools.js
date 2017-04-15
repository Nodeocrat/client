function polarToCartesian(theta, radius){
  return {
    x: radius*Math.cos(theta),
    y: radius*Math.sin(theta)
  };
}

export {polarToCartesian}

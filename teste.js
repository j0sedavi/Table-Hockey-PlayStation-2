function normalizeValue(rx, minOriginal, maxOriginal, minNew = 4, maxNew = 10) {
    if (rx < 0) {
      return -(minNew + ((rx - minOriginal) * (maxNew - minNew)) / (maxOriginal - minOriginal));
    } else if(rx > 0){
      return minNew + ((rx - minOriginal) * (maxNew - minNew)) / (maxOriginal - minOriginal);
    }else{
      return 0;
    }
  }
console.log(normalizeValue(-20, -127, 128));
console.log(normalizeValue(20, -127, 128));
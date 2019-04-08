//@flow
import { Dimensions } from 'react-native';
const {
  width, height, fontScale
} = Dimensions.get('window');

const IP6_WIDTH = 375;
const IP6_HEIGHT = 667;

const scaleByWidth = (size: number, baseWidth: number = IP6_WIDTH) => {
  return Math.floor((width / baseWidth) * size);
}
const scaleByHeight = (size: number, baseHeight: number = IP6_HEIGHT) => {
  return  Math.floor((height / baseHeight) * size);
}

const scale = (size: number) => {
  const screen = Dimensions.get('window');
  const phoneRatio = screen.height / screen.width;
  if (phoneRatio > 1.6) return scaleByHeight(size);
  return scaleByWidth(size);
};
const getFontSize = (size: number) => {
  if (width > 375) {
    return size + 2;
  }

  if (width > 360 && width <= 375) {
    return size + 1;
  }

  if (width > 340) {
    return size;
  }

  return size - 2;
};

export  {
    width,
    height,
    scaleByWidth,
    scaleByHeight,
    scale,
    getFontSize
}
export const uuid = () => {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
};

export const getCenterXY = (
  canvasWidth: number,
  canvasHeight: number,
  elementWidth: number,
  elementHeight: number,
) => {
  const x = canvasWidth / 2 - elementWidth / 2;
  const y = canvasHeight / 2 - elementHeight / 2;
  return [x, y];
};

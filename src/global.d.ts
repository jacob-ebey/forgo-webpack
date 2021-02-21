declare module "*.module.css" {
  const styles: { [key: string]: string };

  export default styles;
}

declare module "*.png" {
  const image: string;

  export default image;
}
declare module ".png?*" {
  const image: string;

  export default image;
}

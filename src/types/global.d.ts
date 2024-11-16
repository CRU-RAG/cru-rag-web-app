declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }
  declare module './svgPath' {
    const content: any; // Replace `any` with the correct type if known.
    export default content;
  }
  declare const __dirname: string;

  
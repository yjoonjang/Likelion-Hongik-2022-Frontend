// extend styled components script for TypeScript
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    // borderRadius: string;
    textColor:string;
    bgColor:string;

    colors?: {
      main: string;
      secondary: string;
    };
  }
}
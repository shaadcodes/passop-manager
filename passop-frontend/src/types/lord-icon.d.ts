import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        trigger?: "hover" | "click" | "loop" | "loop-on-hover" | "morph" | "in";
        delay?: string | number;
        colors?: string;
        stroke?: string | number;
        state?: string;
      };
    }
  }
}
import { rerender } from "forgo";
import type { ForgoComponentProps, ForgoRenderArgs } from "forgo";

type HeadProps = ForgoComponentProps & {
  title?: string;
};

function Head(_: HeadProps) {
  return {
    render({ title }: HeadProps, args: ForgoRenderArgs) {
      if (typeof window === "undefined") {
        return (
          <main head-ssr="head-ssr" style={{ display: "none" }}>
            <div head-title={title} />
          </main>
        );
      }

      if (title) {
        document.title = title;
      }

      return "";
    },
  };
}

export default Head;

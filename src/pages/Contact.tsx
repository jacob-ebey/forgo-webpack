import type { ForgoRenderArgs } from "forgo";

import Head from "@forgo/head";

function Contact() {
  return {
    render(_: unknown, args: ForgoRenderArgs) {
      return (
        <main>
          <Head
            title="Jacob Ebey | Contact"
            tags={[
              {
                key: "description",
                tag: "meta",
                attributes: {
                  name: "description",
                  content: "Want to contact me? Here is the place to do so.",
                },
              },
            ]}
          />
        </main>
      );
    },
  };
}

export default Contact;

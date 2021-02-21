import { ForgoCtorArgs } from "forgo";
import styles from "./contact.module.css";

const { author } = require("../../../package.json");

function Contact(_: unknown, { environment }: ForgoCtorArgs) {
  return {
    render() {
      const params = new URLSearchParams(
        environment.window.location.search || ""
      );
      const initialMessage = params.get("message");
      console.log(initialMessage);

      return (
        <div className={styles.wrapper}>
          <div className={styles.layout}>
            <div className={styles.content}>
              <h1 className={styles.title}>Get in touch</h1>
              <p className={styles.instructions}>
                Fill in the form to start a conversation
              </p>
            </div>

            <form className={styles.form} action={author.url} method="post">
              <div>
                <input
                  required
                  equired
                  aria-label="Name"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <input
                  required
                  aria-label="Email"
                  type="email"
                  name="_replyto"
                  id="email"
                  placeholder="Email"
                />
              </div>

              <div>
                <textarea
                  aria-label="Message"
                  name="message"
                  id="message"
                  placeholder="Message"
                  value={initialMessage || ""}
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
    },
  };
}

export default Contact;

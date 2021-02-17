import { rerender } from "forgo";
import type { ForgoRenderArgs } from "forgo";

import Head from "../head";

import styles from "./Timer.module.css";

function Timer() {
  let seconds = 0;

  return {
    render(props: any, args: ForgoRenderArgs) {
      if (typeof window !== "undefined") {
        setTimeout(() => {
          seconds++;
          rerender(args.element);
        }, 1000);
      }

      return (
        <div className={styles.timer}>
          <span>{seconds} secs have elapsed...</span>
        </div>
      );
    },
  };
}

export default Timer;

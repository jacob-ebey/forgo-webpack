import { Link } from "@forgo/router";

import styles from "./header.module.css";

function Header() {
  return {
    render() {
      return (
        <header className={styles.header}>
          <h1>
            <Link href="/">Jacob Ebey</Link>
          </h1>

          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </header>
      );
    },
  };
}

export default Header;

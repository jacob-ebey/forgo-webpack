import { rerender, ForgoRenderArgs, ForgoNode } from "forgo";
import type { JSX } from "forgo/jsx-runtime";

/*
  To be called when the url needs to be changed.
  You'd usually not call this directly; instead use the <Link /> component which will internally call this.
*/
export function navigateTo(url: string) {
  window.history.pushState({}, "", url);
  updateRoute();
}

/*
  Fixme - this is all messed up.
*/
export function goBack(steps = -1) {
  if (window.history.length > 1) {
    window.history.go(steps);
    updateRoute();
  }
}

/*
  We have to re-render Router's parent.
  So we go up on componentIndex
*/
export function updateRoute() {
  const elem = {
    ...routerRenderArgs.element,
    componentIndex: routerRenderArgs.element.componentIndex - 1,
  };

  // TODO: Figure out why this doesn't fallback to error boundaries in the component tree.
  try {
    rerender(elem);
  } catch (error) {
    if (error?.then) {
      (error as Promise<void>).then(() => rerender(elem));
    } else {
      throw error;
    }
  }
}

export type RouterProps = {
  children?: ForgoNode[];
};

let routerRenderArgs: ForgoRenderArgs;

export function Router(props: RouterProps) {
  return {
    render(props: RouterProps, args: ForgoRenderArgs) {
      routerRenderArgs = args;
      return <div style={{ display: "contents" }}>{props.children}</div>;
    },
  };
}

export type LinkProps = JSX.HTMLAttributes<HTMLAnchorElement> & {
  key?: any;
  href: string;
  children?: ForgoNode | ForgoNode[];
  style?: any;
  className?: string;
};

export function Link(props: LinkProps) {
  return {
    render(props: LinkProps) {
      return (
        <a {...props} onclick={createClickHandler(props.href)}>
          {props.children}
        </a>
      );
    },
  };
}

/*
  Useful for navigating to a url when a link or a button is clicked.
  But instead of using this directly, us the <Link /> component.
*/
function createClickHandler(url: string) {
  return (ev: MouseEvent) => {
    window.history.pushState({}, "", url);
    ev.preventDefault();
    updateRoute();

    window.scrollTo({ top: 0, left: 0 });
  };
}

/*
  Check if the url starts with a prefix.
*/

export type MatchResult = {
  matchedPath: string;
  params: { [key: string]: string };
  remainingPath: string;
};

export type MatchOptions = {
  exact: boolean;
};

export type Matcher = {
  match(pattern: string, options: MatchOptions): MatchResult | false;
  matchUrl(
    pattern: string,
    fn: (match: MatchResult) => ForgoNode
  ): ForgoNode | false;
  matchExactUrl(
    pattern: string,
    fn: (match: MatchResult) => ForgoNode
  ): ForgoNode | false;
};

export function createMatcher(window: Window) {
  function matchExactUrl(
    pattern: string,
    fn: (match: MatchResult) => ForgoNode
  ): ForgoNode | false {
    const result = match(pattern, { exact: true });
    return result === false ? false : fn(result);
  }

  function matchUrl(
    pattern: string,
    fn: (match: MatchResult) => ForgoNode
  ): ForgoNode | false {
    const result = match(pattern, { exact: false });
    return result === false ? false : fn(result);
  }

  function match(
    pattern: string,
    options: MatchOptions = { exact: true }
  ): MatchResult | false {
    const url = window.location.href;

    const lcaseUrl = url.toLowerCase();

    const fixedUrl = ["http://", "https://"].some((prefix) =>
      lcaseUrl.startsWith(prefix)
    )
      ? lcaseUrl
      : `${
          typeof window === "undefined"
            ? "http://localhost"
            : `${window.location.protocol}//${window.location.hostname}`
        }${lcaseUrl.startsWith("/") ? lcaseUrl : `/${lcaseUrl}`}`;

    const urlObject = new URL(fixedUrl);

    const pathnameParts = urlObject.pathname
      .split("/")
      .slice(1, urlObject.pathname.endsWith("/") ? -1 : undefined);

    const patternParts = pattern
      .toLowerCase()
      .split("/")
      .slice(1, pattern.endsWith("/") ? -1 : undefined);

    if (
      pathnameParts.length < patternParts.length ||
      (options.exact && pathnameParts.length !== patternParts.length)
    ) {
      return false;
    } else {
      const match: MatchResult = {
        params: {},
        matchedPath: "",
        remainingPath: urlObject.pathname,
      };

      for (let i = 0; i < patternParts.length; i++) {
        const patternPart = patternParts[i];
        const pathnamePart = pathnameParts[i];

        if (patternPart.startsWith(":")) {
          const paramName = patternPart.substring(1);
          match.params[paramName] = pathnamePart;
          match.matchedPath += `/${pathnamePart}`;
        } else {
          if (patternPart === pathnamePart) {
            match.matchedPath += `/${pathnamePart}`;
          } else {
            return false;
          }
        }
      }

      match.remainingPath = `/${pathnameParts
        .slice(patternParts.length)
        .join("/")}`;

      return match;
    }
  }

  return {
    matchExactUrl,
    matchUrl,
    match,
  };
}

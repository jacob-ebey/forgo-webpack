import { ForgoErrorArgs, rerender } from "forgo";
import type { ForgoComponent, ForgoComponentCtor, ForgoCtorArgs } from "forgo";

type DefaultForgoComponent<TProps> = { default: ForgoComponentCtor<TProps> };

type LazyResult<TProps> =
  | ForgoComponentCtor<TProps>
  | DefaultForgoComponent<TProps>;

type EmptyOrLastStateProps = {
  lastState: any;
};

function EmptyOrLastState(_: EmptyOrLastStateProps) {
  return {
    render({ lastState }: EmptyOrLastStateProps) {
      if (lastState) {
        return <div dangerouslySetInnerHTML={{ __html: lastState }} />;
      }

      return "";
    },
  };
}

type LazyOptions = {
  chunkName?: string;
};

function lazy<TProps>(
  loader: () => Promise<LazyResult<TProps>>,
  options?: LazyOptions
) {
  let Component: ForgoComponentCtor<TProps>;
  let promise: Promise<void> | undefined;

  function Lazy(
    _: TProps,
    { environment }: ForgoCtorArgs
  ): ForgoComponent<TProps> {
    if (!promise) {
      promise = loader().then((result: any) => {
        Component = result.default || result;
        promise = void 0;
      });
    }

    return {
      render(props: TProps) {
        if (promise && !Component) {
          throw promise;
        }

        const doc: {
          __FORGO_LAZY__: Set<string>;
        } = environment.document as any;
        doc.__FORGO_LAZY__ = doc.__FORGO_LAZY__ || new Set();

        if (options?.chunkName) {
          doc.__FORGO_LAZY__.add(options.chunkName);
        }

        return <Component {...props} />;
      },
    };
  }

  return Lazy;
}

export function error(getAppState: () => any) {
  return (props: any, args: ForgoErrorArgs) => {
    if (typeof window !== "undefined" && args.error?.then) {
      (args.error as Promise<void>).then(() => {
        const elem = {
          ...args.element,
          componentIndex: args.element.componentIndex - 1,
        };
        rerender(elem);
      });

      return <EmptyOrLastState lastState={getAppState()} />;
    }

    throw args.error;
  };
}

export default lazy;

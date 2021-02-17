import { rerender } from "forgo";
import type {
  ForgoComponent,
  ForgoComponentCtor,
  ForgoRenderArgs,
} from "forgo";

type DefaultForgoComponent<TProps> = { default: ForgoComponentCtor<TProps> };

type LazyResult<TProps> =
  | ForgoComponentCtor<TProps>
  | DefaultForgoComponent<TProps>;

function Empty() {
  return {
    render() {
      return <span style={{ display: "none" }} />;
    },
  };
}

type LazyComponentProps<TProps> = {
  Component: ForgoComponentCtor<TProps>;
  props: TProps;
  chunkName?: string;
};
function LazyComponent<TProps>(_: LazyComponentProps<TProps>) {
  return {
    render({ Component, props, chunkName }: LazyComponentProps<TProps>) {
      return (
        <>
          {typeof window === "undefined" ? (
            <span
              lazy-preload-chunkname={chunkName}
              style={{ display: "none" }}
            />
          ) : (
            ""
          )}
          <Component {...props} />
        </>
      );
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

  function Lazy(_: TProps): ForgoComponent<TProps> {
    if (!promise) {
      promise = loader().then((result: any) => {
        Component = result.default || result;
        promise = void 0;
      });
    }

    let rerenderRef: {};

    return {
      render(props: TProps, args: ForgoRenderArgs) {
        const renderRef = (rerenderRef = {});

        if (promise && !Component) {
          if (typeof window === "undefined") {
            throw promise;
          }

          promise.then(() => {
            if (renderRef === rerenderRef) {
              rerender(args.element);
            }
          });
        }

        if (!Component) {
          return <Empty />;
        }
        return (
          <LazyComponent
            Component={Component}
            props={props}
            chunkName={options?.chunkName}
          />
        );
      },
    };
  }

  return Lazy;
}

export default lazy;

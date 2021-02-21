import type { ForgoCtorArgs, ForgoEnvType } from "forgo";

type Tag = {
  key: string;
  tag: string;
  attributes: { [key: string]: string };
};

type HeadProps = {
  title?: string;
  tags?: Tag[];
};

function createOrUpdateMeta(
  environment: ForgoEnvType,
  key: string,
  tag: string,
  attributes: { [key: string]: string }
) {
  const forgoKey = `${tag}:${key}`;
  let element: HTMLElement | null = environment.document.querySelector(
    `${tag}[forgo-head="${forgoKey}"]`
  );

  const isNew = !element;

  if (!element) {
    element = environment.document.createElement(tag);
    element.setAttribute("forgo-head", forgoKey);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element!.setAttribute(name, value);
  });

  if (isNew) {
    environment.document.head.appendChild(element);
  }
}

function Head(_: HeadProps, { environment }: ForgoCtorArgs) {
  return {
    render({ title, tags }: HeadProps) {
      if (title) {
        environment.document.title = title;
      }

      if (tags) {
        tags.forEach(({ key, tag, attributes }) =>
          createOrUpdateMeta(environment, key, tag, attributes)
        );
      }

      return "";
    },
  };
}

export default Head;

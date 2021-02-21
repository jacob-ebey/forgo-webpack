import { rerender } from "forgo";
import type { ForgoNode, ForgoRenderArgs } from "forgo";

import { Link } from "@forgo/router";

import styles from "./services-section.module.css";

type Service = {
  key: string | number;
  href: string;
  text: ForgoNode;
  image: string;
  imageDescription: string;
};

type ServicesSectionProps = {
  heading: ForgoNode;
  services: Service[];
};

function ServicesSection(initialProps: ServicesSectionProps) {
  let activeService = initialProps.services[0];

  return {
    render({ heading, services }: ServicesSectionProps, args: ForgoRenderArgs) {
      const createHoverHandler = (service: Service) => () => {
        activeService = service;
        rerender(args.element);
      };

      return (
        <section className={styles.services}>
          <h1>{heading}</h1>

          <div className={styles.content}>
            <ul>
              {services.map((service) => (
                <li>
                  <Link
                    key={service.key}
                    href={service.href}
                    onmouseover={createHoverHandler(service)}
                  >
                    {service.text}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <img lazy={true} alt="" src={activeService.image} />
              <p>{activeService.imageDescription}</p>
            </div>
          </div>
        </section>
      );
    },
  };
}

export default ServicesSection;

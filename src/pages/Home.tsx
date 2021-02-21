import type { ForgoRenderArgs } from "forgo";

import Head from "@forgo/head";

import TextHero from "../components/text-hero/text-hero";
import ServicesSection from "../components/services-section/services-section";

const federatedArchitectureImage = require("../images/federated-architecture.png?width=560")
  .default;
const federatedGraphQLArchitectureImage = require("../images/federated-graphql-architecture.jpg?width=560")
  .default;
const targetingArchitectureImage = require("../images/targeting-architecture.png?width=560")
  .default;
const webpackLogoImage = require("../images/webpack-logo.gif").default;
const meImage = require("../images/me.jpeg?width=560").default;

function Home() {
  return {
    render(_: unknown, args: ForgoRenderArgs) {
      return (
        <main id="home">
          <Head title="Jacob Ebey | Home" />

          <TextHero
            intro="Welcome"
            heading={
              <span>
                Let's Make
                <br className="md:hidden" /> Waves Together!
              </span>
            }
            content={
              <p>
                I'm a developer specializing in full stack web development with
                a focus on developer experience. This means utilizing your
                existing tools like webpack to their full potential.
              </p>
            }
          />

          <ServicesSection
            heading="I want to..."
            services={[
              {
                key: "about",
                href: "/about",
                text: "Learn more about you",
                image: meImage,
                imageDescription:
                  "I'm a laid-back person but don't put up with BS.",
              },
              {
                key: "architecture",
                href: `/contact?message=${encodeURI(
                  "I want to rework my architecture!"
                )}`,
                text: "Rework my architecture",
                image: federatedArchitectureImage,
                imageDescription:
                  "An architecture utilizing module federation for independant team deployments.",
              },
              {
                key: "graphql",
                href: `/contact?message=${encodeURI(
                  "I want to learn how to graphql like a pro!"
                )}`,
                text: "GraphQL like a pro",
                image: federatedGraphQLArchitectureImage,
                imageDescription:
                  "A Module Federated Apollo Federation GraphQL service.",
              },
              {
                key: "federation",
                href: `/contact?message=${encodeURI(
                  "I want to utilize module federation!"
                )}`,
                text: "Utlize module federation",
                image: targetingArchitectureImage,
                imageDescription:
                  "A targeting and delivery system built on module federation.",
              },
              {
                key: "bundlers",
                href: `/contact?message=${encodeURI(
                  "I want to level up my bundler!"
                )}`,
                text: "Level up my bundler",
                image: webpackLogoImage,
                imageDescription: (
                  <span>
                    I'm <em>very</em> efficient with webpack and it's internals.
                  </span>
                ),
              },
            ]}
          />
        </main>
      );
    },
  };
}

export default Home;

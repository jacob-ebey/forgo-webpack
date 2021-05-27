import Head from "@forgo/head";

import Resume from "../components/resume/resume";

function ResumePage() {
  return {
    render() {
      return (
        <main>
          <Head
            title="Jacob Ebey | Resume"
            tags={[
              {
                key: "description",
                tag: "meta",
                attributes: {
                  name: "description",
                  content: "Interested in my services? Check out my resume.",
                },
              },
            ]}
          />

          <Resume
            email="jacob.ebey@live.com"
            experiences={[
              {
                bullets: [
                  "Realizing Module Federation patterns in Next.js to reduce full page reloads between micro-frontends.",
                  "Introducing an HOC pattern to enable re-use of core business logic such as authentication and \"My Bag\".",
                  "Maintaining and improving our internal CI/CD Next.js boilerplate.",
                ],
                company: "Lululemon",
                department: "Micro Web App Platform",
                overview:
                  "Establishing development patterns at the organization level to enable product teams to scale without growing pains.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "Released the first SSR chunk preloading system for Module Federated chunks to production.",
                  "Moved global page scripts out of Adobe to a module federation based system to enabled autonomy of ABT and SRE teams.",
                  "Enabling inline personalization and soft profile storage to product streams.",
                ],
                company: "Lululemon",
                department: "Personalization & Enablement",
                overview:
                  "Contributing to an in-house AB testing and delivery framework that utilizes Adobe Target and React lifecycles to deliver a seamless experience for guests.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "Designed the Module Federeated, Apollo Federation GraphQL Server architecture used in production.",
                  "Built an elevated CDP experience highlighting expanded inclusivity in legging sizes that was highlighted in Forbes Magazine",
                  'Expanded information avaliable in the PDP "Why we made this" section.',
                  "General accessibility improvements throughout the home, story, CDP, and PDP pages.",
                ],
                company: "Lululemon",
                department: "Content & Education",
                overview:
                  "Building out new experiences such as elevated CDP experiences and making the site generally more accessible for guests.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "Working within both ASP .Net Framework and ASP .Net Core projects.",
                  "Building an Electron application to assist in re-processing or writting off transactions.",
                  "Utilizing a GraphQL endpoint to minimize data transfer between the back-end and Electron application.",
                ],
                company: "Alaska Airlines",
                department: "Alaska Pay",
                overview:
                  "Contributing to the new payment processing system that spans Inflight and Airports while modernizing an existing legacy system that handles automated phone routing.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "Back-end is written in Node.JS (Typescript) utilizing GraphQL and Neo4j.",
                  "UX leverages React (hooks) and deferred rendering to deliver the best user experience possible",
                  "Easily add new or locate existing data-sets through a file-system like UX with advanced search capabilities.",
                ],
                company: "Microsoft",
                department: "AI & Knowledge",
                overview:
                  "Building a Data Catalog to allow exploration of data-sets owned by Microsoft allowing data-scientists to spend less time locating and prepping data, and more time gaining insights and building models.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "Aggregated data from multiple data-sources into a coherent data-model with GraphQL.",
                  "Back-end was built using ASP.Net Core and uses Azure Active Directory for s2s and user authentication.",
                  "UX leverages React and the Apollo Client to maintain a clean application state in a data heavy application.",
                ],
                company: "Microsoft",
                department: "AI & Knowledge",
                overview:
                  "Designed a graph visualization of the Microsoft Customer Master to allow exploration and deeper data insights.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "The UX leverages React/Redux creating reusable UX components and maintaining a clean application state in a data heavy application.",
                  "The WebAPI is built using ASP.Net Core and uses Azure Active Directory for s2s and user authentication.",
                ],
                company: "Microsoft",
                department: "Rewards",
                overview:
                  "Built and maintained a tool that allows teams such as marketing to configure everything from Quizzes to Rewards with the option to implement custom logic without needing to understand software.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "Xamarin Forms was chosen for the UX which lead to the need for the creation of many custom controls and platform specific renderers for iOS Android and UWP.",
                  "Prism was chosen to easily share business logic between platforms.",
                  "Created a thin abstraction around a few testing frameworks as no single one existed for all three platforms at the time allowing for consolidated UI tests.",
                ],
                company: "Microsoft",
                department: "Sales",
                overview:
                  "Built and maintained OneView, a tool to reduce prep time for sales calls by providing a holistic view of the business or entity by aggregating data from throughout the many orgs, as well as providing a layer of machine learning to increase sale chance.",
                title: "Software Engineer",
              },
              {
                bullets: [
                  "Developed features for the Intelli-MAX product suite such as the chamfer and spiral lead tools.",
                  "Played a major role in building out the core architecure of OMAX Intelli-CAM, the first 3D CAM application for Waterjet applications.",
                  "Build from the ground up an OpenGL renderer to support linux and mobile systems.",
                  "Developed a proof of concept monitoring application for Android and iOS.",
                  "Did the initial research into EtherCAT for what would become the next gen machine control scheme",
                ],
                company: "OMAX Corporation",
                department: "Software R&D",
                overview:
                  "As a general-purpose engineer, I worked on projects from 3D CAM applications, to mobile applications, to embedded machine control.",
                title: "Software Engineer",
              },
            ]}
            expertise={[
              "Javascript",
              "TypeScript",
              "Webpack Plugins",
              "Module Federation",
              "Large codebases",
              "Server Side Rendering",
              "Code Splitting",
              "Chunk Preloading",
              "React / Next.js",
              "GraphQL",
              "Vercel",
              "HTML / CSS / SASS",
              "Golang",
              "C# / .NET Core",
              "Linux / Windows",
            ]}
            location="Seattle, WA"
            name="Jacob Ebey"
            references={[
              {
                company: "Lululemon",
                name: "Zackary Jackson",
                title: "Principal Engineer, Director",
                quote:
                  "Jacob is still the best at module federation outside of the original three authors. That makes him the 4th most knowledgeable (if not higher). For an “outsider” that’s staggering.",
              },
              {
                company: "Microsoft",
                name: "Shane Patton",
                title: "Principal Software Engineer",
                quote:
                  "Jacob is a super capable full stack developer with broad knowledge and a ton of ingenuity. He has great design instincts; you can throw really hard problems at him and be confident in a high quality, thoughtful design and solution. Very quick learner and an excellent thinker. Produces elegant high quality code that simplifies future maintenance; actively refactors to improve.",
              },
            ]}
            summary="Self motivated engineer with 8+ years of experienced focused on developer experience and improving the lives of those around me."
            title="Software Engineer"
          />
        </main>
      );
    },
  };
}

export default ResumePage;

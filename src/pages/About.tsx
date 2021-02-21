import Head from "@forgo/head";

import TextHero from "../components/text-hero/text-hero";

function About() {
  return {
    render() {
      return (
        <main>
          <Head
            title="Jacob Ebey | About"
            tags={[
              {
                key: "description",
                tag: "meta",
                attributes: {
                  name: "description",
                  content: "Learn more about me.",
                },
              },
            ]}
          />

          <TextHero
            intro="Who am I?"
            heading="A question many ask themselves."
            content={
              <p>
                I'll try to give you some insights into who I am, at least from
                a professional point of view.
              </p>
            }
          />

          <TextHero
            heading="A FIRST Student"
            content={
              <>
                <p>
                  <a href="https://www.firstinspires.org/">FIRST Robotics</a> is
                  an amazing organization that introduces students to the worlds
                  of manufacturing, programming, arts and science. As a former
                  FIRST student and regional{" "}
                  <a href="https://www.firstinspires.org/robotics/ftc/deans-list">
                    Dean's List
                  </a>{" "}
                  winner, FIRST is where I got my head in the door and never
                  looked back.
                </p>
                <p>
                  Here I picked up soft skills such as teamwork and
                  collaboration along with had skills such as 3D modeling,
                  electrical diagram digestion and had my introduction to
                  programming via Arduino and TI Rio for robotics related tasks.
                </p>
                <p>
                  As a gesture to the community that introduced me to so much, I
                  along with others from our robotics team founded multiple
                  FIRST Lego League teams at our local elementary schools. After
                  providing the initial seed money and mentorship to get the
                  program off the ground, we were successfully able to hand it
                  off to the district.
                </p>
              </>
            }
          />

          <TextHero
            intro="Internship"
            heading="A Mechanical Engineer"
            content={
              <>
                <p>
                  After graduating high school through the running start program
                  I was able to land a payed intership at{" "}
                  <a href="https://www.omax.com/">OMAX Corporation</a>, an
                  abrasive waterjet manufactuer, as a mechanical engineer.
                </p>
                <p>
                  As an intern I would regularly recieve sketches of an idea
                  that would have to be flushed out, drawn up. The largest thing
                  I got to work on was a screen filter for the abrasive hoppers.
                </p>
                <p>
                  Along with the regular stuff I would often spend time after
                  work designing and manufacturing small parts for my car. I
                  sometimes miss the hands on work and freedom to produce
                  physical products with leftover raw materials.
                </p>
              </>
            }
          />

          <TextHero
            intro="Internship"
            heading="A Software Engineer"
            content={
              <>
                <p>
                  When interning at OMAX as a mechanical engineer I would spend
                  my lunch breaks working on computer vision challenges related
                  to the FIRST robotics challenge for the year. One lunch break
                  a software engineer from the company walked by, asked what I
                  was doing and proceded to "kidnap" me. Less than a week later
                  I was now a software engineering intern.
                </p>
                <p>
                  I started by developing utilities such as "chamfer" and spiral
                  lead-in tools for our 2D CAM software called Layout. After
                  proving my skills I was hired on fulltime as a Jr. Software
                  Engineer.
                </p>
              </>
            }
          />

          <TextHero
            heading={
              <span>
                A <em>Real</em> Software Engineer
              </span>
            }
            content={
              <>
                <p>
                  After being hired on full time I joined the 2 man team working
                  on a from scratch 3D CAM application that would become known
                  as{" "}
                  <a href="https://www.omax.com/software/intellicam">
                    IntelliCAM
                  </a>
                  . My work skills proved to be worth a promotion from Jr.
                  Engineer.
                </p>
                <p>
                  After some internal shuffling, layoffs, and management shifts
                  we ended up loosing our lead developer and the person
                  responsible for landing me on the team. This left me to lead
                  development on IntelliCAM and see it through to it's official
                  release.
                </p>
              </>
            }
          />

          <TextHero
            heading="Going Mobile"
            content={
              <>
                <p>
                  When working at OMAX on IntelliCAM, we developed in a
                  portable, cross platform fasion and explored mobile
                  development with the Xamarin framework. I wanted to continue
                  with this and found opportunity at Microsoft.
                </p>
                <p>
                  Here I was able to stretch my legs a bit developing custom
                  data visualization components and their corresponding iOS,
                  Android, and Windows Phone renderers. I also worked on a cross
                  platform UI testing toolkit for automation.
                </p>
              </>
            }
          />

          <TextHero
            heading="The Wild Web"
            content={
              <>
                <p>
                  After a descision at Microsoft came down to make the tool we
                  were developing a web only experience I was thrown into the
                  wild world of web development. Having past experience in PHP
                  from college I was feeling pretty confident...
                </p>
                <p>
                  The thing is I shouldn't have been. Getting thrown into an
                  enterprise level, multi-page, SSR'd React application was a
                  bit of a reality check. I had much to learn.
                </p>
                <p>
                  Many long nights of reading and hacking together small
                  projects quickly got me up to speed in modern web development
                  but lead to a new issue: A love of bundlers and the rabbit
                  hole that is optimization. Before the days of frameworks like
                  Next.js, you had to roll your own SSR and code splitting
                  solutions, something I am now an expert at.
                </p>
              </>
            }
          />

          <TextHero
            heading="Rewards!"
            content={
              <>
                <p>
                  The next major project I worked on was again with Microsoft,
                  but this time on the{" "}
                  <a href="https://www.microsoft.com/en-us/rewards">Rewards</a>{" "}
                  team.
                </p>
                <p>
                  Here I honed my front-end React skills building complex data
                  entry forms that allowed for business to easily work with 3rd
                  party partners in the program to setup rewards, quizes, etc.
                </p>
              </>
            }
          />

          <TextHero
            heading="Data Science"
            content={
              <>
                <p>
                  After working on Rewards I was transfered to be part of a new
                  team that was forming called the "AI &amp; Knowledge".
                </p>
                <p>
                  We would go on to build out two main tools, the first being a
                  undirected graph visualization of the Microsoft Customer
                  Master. This would be used by support staff and data
                  scientists alike to find patterns and gain a deeper insight
                  into customers.
                </p>
                <p>
                  The second tool was a Data Catalog that acted as a source of
                  truth for data sets owned by teams throughout the company. The
                  data sets would be marked with the relevant restrictions such
                  as GDPR as well as documenting the type of system the data is
                  stored in as well as the shape of the data. This was built
                  using GraphQL and Neo4j for the backend and the frontend I
                  used as a chance for my first exploration into React Hooks.
                </p>
              </>
            }
          />

          <TextHero
            heading="To The Air!"
            content={
              <>
                <p>
                  After leaving microsoft I wanted to explore engineering
                  outside of a software company, this landed me at Alaska
                  Airlines. Here I would contribute to the new payment
                  processing system that spans Inflight and Airports. This
                  included backend API work in ASP .Net Framework and ASP .Net
                  Core projects as well as an Electron application to assist in
                  re-processing or writting off transactions.
                </p>
                <p>
                  I also worked on modernizing an existing legacy system that
                  handles automated customer phone routing to the relevant
                  departements.
                </p>
              </>
            }
          />

          <TextHero
            heading="Yoga???"
            content={
              <>
                <p>
                  Now I'm not a yoga person by any means, but Lululemon has been
                  my favorite place to work. The tech and people are just
                  amazing!
                </p>
                <p>
                  Here I've developed everything from frontend customer facing
                  UI components, federated GraphQL architectures, Webpack
                  plugins, to A/B testing frameworks. Nothing is off limits and
                  I get to share my experience and knowledge with others.
                </p>
                <p>If you get the chance, work for Lululemon.</p>
              </>
            }
          />

          <TextHero
            heading="On The Side"
            content={
              <>
                <p>
                  Code is not just a work activity for me. I enjoy complex
                  systems. That's why on the side I enjoy working with bundlers
                  such as <a href="https://webpack.js.org/">Webpack</a> and{" "}
                  <a href="https://rollupjs.org/">Rollup</a>, as well as lighter
                  things like exploring upcoming frameworks, ssr patterns,
                  performance optimization, and more.
                </p>
                <p>
                  As a member of the{" "}
                  <a href="https://github.com/module-federation/">
                    Module Federation
                  </a>{" "}
                  organization I have developed non-public facing features such
                  as webpack runtime plugins to enable chunk streaming over
                  whatever protocol you prefer. This means you can runtime
                  federate your server rendered components over http just like
                  you do in the browser.
                </p>
                <p>
                  I have also developed federated chunk preloading utilities
                  that are in production at Lululemon running on the{" "}
                  <a href="https://nextjs.org/">Next.js</a> framework.
                </p>
                <p>
                  This site is also an experiment. It is a server side rendering{" "}
                  <a href="https://forgojs.org/">ForgoJS</a> application with a
                  custom webpack loader to enable code splitting and chunk
                  preloading.
                </p>
                <p>
                  I'm always doing R&amp;D. There are too many things to list
                  out and I'm always expanding. Hit me on twitter{" "}
                  <a href="https://twitter.com/ebey_jacob">@ebey_jacob</a> if
                  you want to talk and hear more.
                </p>
              </>
            }
          />
        </main>
      );
    },
  };
}

export default About;

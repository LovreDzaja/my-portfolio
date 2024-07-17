/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Loader from "../components/Loader";
import Head from "../models/Head";
import FollowCursor from "../components/FollowCursor";

const About = () => {
  return (
    <>
      <div className="w-full h-screen relative">
        <Canvas className="w-full h-screen bg-transparent" camera={{ near: 0.1, far: 1000 }}>
          <Suspense fallback={<Loader />}>
            <Lights />
            <Heads />
          </Suspense>
        </Canvas>
        <Content />
      </div>
    </>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} color="#db2777" />
      <pointLight intensity={0.5} color="#db2777" />
      <directionalLight intensity={0.5} color="#db2777" />
      <hemisphereLight skyColor="#c17a7a" groundColor="#db2777" />
      <spotLight color="#db2777" />
    </>
  );
};

const Heads = () => {
  const { viewport } = useThree();
  const halfWidth = viewport.width / 2;

  const positionLeft = [-halfWidth, 0, 0];
  const positionRight = [halfWidth, 0, 0];

  return (
    <>
      <Head position={positionLeft} rotation={[0, Math.PI - 0.5, 0]} />
      <Head position={positionRight} rotation={[0, 0.5, 0]} />
    </>
  );
};

const Content = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-8">
      <FollowCursor />
      <WorkExperience />
    </div>
  );
};

const WorkExperience = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 rounded-lg shadow-lg bg-white bg-opacity-40">
      <h1 className="text-rose-400 text-3xl font-bold text-center">/About</h1>
      <div className="space-y-6">
          <ExperienceItem
            title="Intern"
            company="Playnirvana Group"
            duration="July 2022 - September 2022"
            tasks={[
              "Worked on Web APIs, developed a C# console application for retrieving user location",
              "Built a webpage using ASP.NET MVC architecture.",
              "Utilized a PostgreSQL database, studied RabbitMQ, EntityFramework, and used Postman to verify API accuracy.",
            ]}
          />
          <ExperienceItem
            title="Intern"
            company="Seekandhit"
            duration="July 2023 - September 2023"
            tasks={[
              <>
              Worked on{" "}
              <a
                key="kiwi-link"
                href="https://www.kiwi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-800 underline"
              >
                Kiwi.com
              </a>
                , used various technologies such as React.js, TypeScript, JavaScript, and TailwindCSS for development
              </>,
              "Used Python for writing backend, Postman for data sending accuracy verification and testing.",
              "Utilized Git for integrating changes into the main project version.",
            ]}
          />
      </div>
    </div>
  );
};

const ExperienceItem = ({ title, company, duration, tasks }) => {
  return (
  <div className="border-l-4 border-rose-400 pl-4 mb-8">
        <h2 className="text-lg font-bold text-rose-700">{title} at {company}</h2>
        <p className="text-sm font-bold text-rose-600">{duration}</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="text-sm font-semibold text-rose-600">{task}</li>
          ))}
        </ul>
      </div>
  );
};

export default About;

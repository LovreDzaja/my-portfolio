/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Loader from "../components/Loader";
import Head from "../models/Head";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import FollowCursor from "../components/FollowCursor";

const Home = () => {
  return (
    <div className="w-full h-screen relative">
      <Canvas className="w-full h-screen bg-transparent" camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <Lights />
          <Heads />
        </Suspense>
      </Canvas>
      <Content />
    </div>
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

  let pos = viewport.width / 2 + 0.25;

  const positionLeft = [-pos, 0, 0];
  const positionRight = [pos, 0, 0];

  return (
    <>
      <Head position={positionLeft} rotation={[0, Math.PI, 0]} />
      <Head position={positionRight} rotation={[0, 0, 0]} />
    </>
  );
};

const Content = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      content: (
        <p className="mt-4 text-gray-700">
          I am Lovre , a web programmer with a specialization in web programming from the School for Design, Graphics, and Sustainable Construction. I have practical experience working as a web programmer intern at Playnirvana Group and Seekandhit.
        </p>
      ),
    },
    {
      id: 1,
      content: (
        <p className="mt-4 text-gray-700">
          My technical expertise includes JavaScript, React, Next.js, C# Web API development, ASP.NET, TypeScript, PHP, MySQL, PostgreSQL, HTML, CSS/SCSS, Android Studio, jQuery, jQueryUI, Three.js, and Python. I have also worked on notable projects like the development of a webpage using ASP.NET MVC and contributing to the <a className="text-rose-500 underline" href="https://www.kiwi.com/">Kiwi</a> website using React.js and TypeScript.
        </p>
      ),
    },
    {
      id: 2,
      content: (
        <p className="mt-4 text-gray-700">
          I have participated in various programming competitions, securing second place in Aspira College`s competition and first place in the Diamond Lab competition with the MatchKO team. My experiences have enriched my knowledge and fueled my passion for web development.
        </p>
      ),
    },
    {
      id: 3,
      content: (
        <p className="mt-4 text-gray-700">
          Feel free to add me on LinkedIn or drop a follow on Github 😅.
        </p>
      ),
    },
  ];

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="p-8 rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-rose-500 text-lg font-bold">/Home</h1>
        <FollowCursor />
        <AnimatePresence mode="wait">
          {steps.map(
            (step, index) =>
              index === currentStep && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
        <button
          onClick={nextStep}
          className="mt-6 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition"
        >
          Next
        </button>
        <div className="flex justify-center mt-6 space-x-4">
          <a href="https://hr.linkedin.com/in/lovre-d%C5%BEaja-102062233" className="text-blue-500">
            <FaLinkedin size={32} />
          </a>
          <a href="https://github.com/LovreDzaja" className="text-gray-700">
            <FaGithub size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;

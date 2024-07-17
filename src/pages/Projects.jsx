/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Loader from "../components/Loader";
import Head from "../models/Head";
import projectsData from "../projects.json";
import { extend } from "@react-three/fiber";
extend({Canvas})
import "../index.css";

const Projects = () => {
  return (
    <>
      <div className="w-full h-screen relative flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-screen overflow-hidden">
          <Canvas className="w-full h-full bg-transparent" camera={{ near: 0.1, far: 1000 }}>
            <Suspense fallback={<Loader />}>
              <Lights />
              <Heads />
            </Suspense>
          </Canvas>
        </div>
        <div className="w-full md:w-1/2 h-screen overflow-y-auto flex justify-center items-center">
          <ProjectCards />
        </div>
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
  const { size, viewport } = useThree();
  const [position, setPosition] = useState([0, 0, 0]);
  const [scale, setScale] = useState(0.2);

  useEffect(() => {
    const handleResize = () => {
      setPosition([0, -0.5, 0]);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewport.width, size.width]);

  return (
    <>
      <Head position={position} rotation={[0, 1.6, 0]} scale={[scale, scale, scale]} />
    </>
  );
};

const ProjectCards = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-rose-500 text-lg font-bold mt-4 mb-4 md:mt-0 md:mb-0">
        /Projects
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold text-rose-500 mb-2">{project.name}</h3>
            <p className="text-rose-400 font-bold">{project.description}</p>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="block mt-2 text-rose-500 hover:underline">View on GitHub</a>
          </div>
        ))}
      </div>
  </div>
  );
};

export default Projects;
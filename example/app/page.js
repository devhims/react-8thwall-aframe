'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ project }) => {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col h-full cursor-pointer'>
      <div className='h-48 w-full bg-gray-100 relative'>
        <model-viewer
          src={project.model}
          alt={`3D model for ${project.title}`}
          auto-rotate
          autoplay
          camera-controls
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div className='p-4 flex-grow'>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          {project.title}
        </h3>
        <p className='text-sm text-gray-500'>{project.description}</p>
      </div>
      <div className='bg-gray-50 px-4 py-3 mt-auto'>
        <a
          href={project.href}
          className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
        >
          View in AR &rarr;
        </a>
      </div>
    </div>
  );
};

export default function Home() {
  const projects = [
    {
      title: 'Animation Sample',
      description: 'Explore 8th Wall WebAR animations in React',
      href: '/animation',
      model: '/assets/dog.glb',
    },
    {
      title: 'Custom Component',
      description: 'Learn how to create custom A-Frame components',
      href: '/custom-component',
      model: '/assets/cube.glb',
    },
    {
      title: 'Interaction Example',
      description: 'Discover interactive WebAR experiences',
      href: '/interaction',
      model: '/assets/robot.glb',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-5xl font-bold text-center mb-6'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600'>
            react-8thwall-aframe
          </span>
        </h1>
        <h2 className='text-2xl font-semibold text-center mb-12 relative'>
          <span className='text-gray-700'>Interactive Examples</span>
          <span className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-500'></span>
        </h2>

        <div className='flex justify-center space-x-6 mb-12'>
          <Link
            href='https://github.com/devhims/react-8thwall-aframe'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300'
          >
            <Image
              src='/github.svg'
              alt='GitHub'
              width={20}
              height={20}
              className='mr-2'
            />
            GitHub
          </Link>
          <Link
            href='https://www.npmjs.com/package/react-8thwall-aframe'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-300'
          >
            <Image
              src='/package.svg'
              alt='npm'
              width={20}
              height={20}
              className='mr-2'
            />
            npm
          </Link>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

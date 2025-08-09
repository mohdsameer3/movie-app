import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16">
      <div className="wrapper max-w-5xl mx-auto">
        
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-block mb-10 text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent hover:opacity-80 transition"
        >
          ← Back to Home
        </Link>

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          About MovieApp
        </h1>

        {/* Card container */}
        <div className="bg-[#030014] backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 border border-white/10">
          <p className="text-gray-300 leading-relaxed text-lg">
            <span className="font-semibold text-white">MovieApp</span> is your gateway to the world of cinema. 
            We make it effortless to discover trending titles, search for any movie, 
            and explore detailed information powered by 
            <span className="text-gradient"> TMDB API</span>.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            Our mission is to create a smooth and visually immersive experience, 
            combining <span className="text-white">modern design</span> with fast, reliable movie data. 
            From blockbuster hits to indie treasures — we’ve got it all.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            Built with <span className="text-gradient">React</span>, 
            <span className="text-gradient"> Tailwind CSS</span>, and 
            <span className="text-gradient"> Appwrite</span>, MovieApp brings you 
            a next-gen platform for finding your next favorite movie — without the hassle.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;

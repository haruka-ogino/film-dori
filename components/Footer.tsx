import { FaLinkedin, FaGithubSquare, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="w-full p-4 mx-auto flex flex-wrap justify-between items-end">
      <section className="mr-[30px]">
        <h1>Made by Haruka Ogino</h1>
        <section className="footer-links mt-1 mx-2 text-[#4d3593]">
          <a
            className="flex items-center my-1 mx-0 p-0"
            href="mailto:harukariq@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaEnvelope size={24} className="text-[#4d3593]" />
            <p className="ml-[5px]">harukariq@gmail.com</p>
          </a>
          <a
            className="flex items-center my-1 mx-0 p-0"
            href="https://nz.linkedin.com/in/haruka-ogino-769540148"
            target="_blank"
          >
            <FaLinkedin size={28} className="text-[#4d3593]" />
            <p className="ml-[3px]">LinkedIn</p>
          </a>
          <a
            className="flex items-center my-1 mx-0 p-0"
            href="https://github.com/haruka-ogino"
            target="_blank"
          >
            <FaGithubSquare size={28} className="text-[#4d3593]" />
            {/* <FaGithubSquare size={28} className="text-[#4d3593]" /> */}
            <p className="ml-[3px]">GitHub</p>
          </a>
        </section>
      </section>

      <section className="flex flex-col mb-2 items-start">
        <h4 className="my-1">Website's GitHub Repo</h4>
        <a href="https://github.com/haruka-ogino/ghibli" target="_blank">
          <img
            className="h-7"
            src="https://img.shields.io/badge/GitHub-4d3593?style=fflat-square&logo=github"
            alt="github banner as a link to this site's repo"
          />
        </a>
        <h4 className="mt-1">This website was built using:</h4>
        <ul className="flex flex-wrap justify-center">
          <li>
            <img
              className="h-7 mr-2 mt-1"
              src="https://img.shields.io/badge/React-4d3593?style=fflat-square&logo=react"
              alt="react js banner"
            />
          </li>
          <li>
            <img
              className="h-7 mr-2 mt-1"
              src="https://img.shields.io/badge/Next.js-4d3593?style=fflat-square&logo=nextdotjs&logoColor=white"
              alt="next js banner"
            />
          </li>
          <li>
            <img
              className="h-7 mr-2 mt-1"
              src="https://img.shields.io/badge/Node.js-4d3593?style=fflat-square&logo=node.js"
              alt="node JS banner"
            />
          </li>
          <li>
            <img
              className="h-7 mr-2 mt-1"
              src="https://img.shields.io/badge/Tailwind_CSS-4d3593?style=fflat-square&logo=tailwind-css&logoColor=38B2AC"
              alt="tailwind banner"
            />
          </li>
          <li>
            <img
              className="h-7 mr-2 mt-1"
              src="https://img.shields.io/badge/Turso-4d3593?style=fflat-square&logo=turso"
              alt="turso banner"
            />
          </li>
        </ul>
      </section>
    </footer>
  )
}

export default function Footer() {
  return (
    <footer className="w-full mx-auto flex flex-wrap justify-between  mb-5">
      <h1>Made by Haruka Ogino</h1>
      <section className="flex flex-col items-center">
        <h4>Website's GitHub Repo</h4>
        <a href="https://github.com/haruka-ogino/ghibli" target="_blank">
          <img
            className="h-7"
            src="https://img.shields.io/badge/GitHub-224756?style=fflat-square&logo=github"
            alt="github banner as a link to this site's repo"
          />
        </a>
      </section>
    </footer>
  )
}

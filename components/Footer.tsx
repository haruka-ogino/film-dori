export default function Footer() {
  return (
    <footer className="w-8/12 flex justify-between absolute bottom-0 mb-5">
      <h1>Made by Haruka Ogino</h1>
      <section>
        <h4>Website's GitHub Repo:</h4>
        <a href="https://github.com/haruka-ogino/ghibli">
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

import GhibliLocations from '@/components/GhibliLocations'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome!</h1>
      {/* <p>
        A place where you can see films, characters, dishes and more from the
        Ghibli Studio films.
      </p>
      <p>
        Test your Ghibli knowledge with the quiz, or tease your brain with a
        jigsaw puzzle.
      </p> */}
      <p>
        The place where you can share locations that inspired your favourite
        films and tv shows!
      </p>
      <GhibliLocations />
    </main>
  )
}

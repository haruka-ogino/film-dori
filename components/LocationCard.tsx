import { Location } from '@/models/locations'
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa'

interface Params {
  location: Location
  title: string
  handleTagClick: (id: number) => void
  handleNameClick: (id: string) => void
  i: number
}

export default function LocationCard({
  location,
  title,
  handleTagClick,
  handleNameClick,
  i,
}: Params) {
  return (
    <section key={i} className="mt-10 flex flex-col w-full">
      <div className="flex flex-wrap justify-left align-center">
        <h2 className="text-4xl">{location.name}</h2>
        <p
          className="tag m-[5px_20px] p-[5px_10px] cursor-pointer"
          onClick={() => handleTagClick(location.tagId)}
        >
          {location.tag}
        </p>
      </div>
      <div className="relative flex justify-center m-3">
        {title === 'My Locations' && (
          <div className="absolute p-[5px_12px] m-[5px] self-end flex top-[-57px] right-0 tag">
            <button className="cursor-pointer hover:opacity-50 pr-4">
              <FaEdit size={25} />
            </button>
            <button className="cursor-pointer hover:opacity-50">
              <FaRegTrashAlt size={25} />
            </button>
          </div>
        )}
        <img src={location.image} alt={`Location of ${location.name}`} />
      </div>
      <p>{location.description}</p>
      <p>Google rating: {location.rating} ⭐️</p>
      <p>Address:</p>
      <p>
        <a href={location.url}>📍 {location.address}</a>
      </p>
      {title !== 'My Locations' ? (
        <p
          className="self-center hover:underline hover:cursor-pointer"
          onClick={() => handleNameClick(location.authId)}
        >
          By {location.username}
        </p>
      ) : (
        <p className="self-center">By {location.username}</p>
      )}
    </section>
  )
}

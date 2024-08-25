import { useDeleteLocation } from '@/hooks/useLocations'
import { Location } from '@/models/locations'
import { useState } from 'react'
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa'
import EditPopUp from './EditPopUp'

interface Params {
  location: Location
  title: string
  handleTagClick: (id: number) => void
  handleNameClick: (id: string) => void
  i: number
  authId: string
}

export default function LocationCard({
  location,
  title,
  handleTagClick,
  handleNameClick,
  authId,
}: Params) {
  const deleteLocation = useDeleteLocation()
  const [edit, setEdit] = useState(false)

  function handleDelete(id: string) {
    deleteLocation.mutate({ id, authId })
  }

  // const example = {
  //   address: 'Japan, 〒206-0013 Tokyo, Tama, Sakuragaoka, 4-chōme−４３−２５',
  //   authId: '110783889429574267521',
  //   description:
  //     'A neighborhood that inspired locations in "Whisper of the Heart"',
  //   id: 'ChIJmbzCFl_jGGAR98V28VrP0QI',
  //   image:
  //     'https://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/040/281/original/cover-photo.jpg',
  //   name: 'Iroha-zaka Slope',
  //   rating: 4.3,
  //   tag: 'ghibli',
  //   tagId: 1,
  //   url: 'https://maps.google.com/?cid=203171447713482231',
  //   userImg:
  //     'https://lh3.googleusercontent.com/a/ACg8ocKUGaeHdEfoH0Gnzt7zQEwLL_mFhsbttpEXptq7TmqGPSl_Ev8=s96-c',
  //   username: 'davidw',
  // }

  return (
    <>
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
        <div className="absolute p-[5px_12px] m-[5px] self-end flex top-[-57px] right-0 tag">
          <button
            className="cursor-pointer hover:opacity-50 pr-4"
            onClick={() => setEdit(true)}
          >
            <FaEdit size={25} />
          </button>
          <button
            className="cursor-pointer hover:opacity-50"
            onClick={() => handleDelete(location.id)}
          >
            <FaRegTrashAlt size={25} />
          </button>
        </div>
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
      {edit && <EditPopUp location={location} open={setEdit} />}
    </>
  )
}

'use client'
import SaveLocation from '@/components/SaveLocation'
import { useSearchGoogle } from '@/hooks/google-locations'
import { useAuth } from '@/hooks/useProviders'
import { GoogleSearchRes } from '@/models/google-locations'
import { useState } from 'react'

export default function Post() {
  const { session } = useAuth()

  const [inputState, setInputState] = useState('')
  const [locations, setLocations] = useState<GoogleSearchRes[]>([])
  const [showRes, setShowRes] = useState<boolean>(false)
  const [locationProp, setLocationProp] = useState<GoogleSearchRes>()
  const [saveLocation, setSaveLocation] = useState(false)

  const search = useSearchGoogle()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value
    setInputState(input)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    search.mutate(
      { searchInput: inputState },
      {
        onSuccess: (data) => {
          setLocations(data)
          setShowRes(true)
        },
      }
    )
    setInputState('')
  }

  function handleClick(i: number) {
    setLocationProp(locations[i])
    setSaveLocation(true)
  }

  return (
    <>
      <h1>Share a location!</h1>
      {/* <p>~ This page is under construction ~</p> */}
      {/* <p>~ Stay tuned for updates ~</p> */}
      {/* <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Curabitur sem cras,
        sed convallis commodo conubia ante aptent. Aliquet amet taciti maecenas
        imperdiet; curae himenaeos platea et. Cras orci leo senectus hac arcu
        torquent. Aptent convallis ut nostra aenean torquent phasellus. Dis
        vulputate platea imperdiet aliquet dolor ultricies. Blandit ex facilisis
        vestibulum venenatis vehicula semper. Finibus cursus vulputate libero
        dictum accumsan ultrices aenean adipiscing velit. Maximus ad mauris
        curae porta montes rhoncus taciti per eu. Praesent sociosqu senectus
        scelerisque morbi quis curabitur arcu. Dolor lacus et laoreet vitae,
        feugiat praesent libero. Curae vel conubia est nisi, quisque nostra.
        Eget primis erat aenean ullamcorper semper commodo facilisis nulla.
        Lacinia netus est id et interdum mi finibus taciti. Finibus felis donec
        posuere dictum non quisque. Per feugiat semper molestie platea dolor.
        Natoque faucibus natoque tortor tortor risus, nullam efficitur curabitur
        nec. Habitant fames ultrices inceptos mauris fringilla. Id fringilla
        nunc faucibus vitae viverra donec sed. Vestibulum etiam congue mollis;
        dapibus parturient mi. Facilisi per adipiscing curae proin quisque justo
        eleifend duis. Pellentesque habitant gravida ultrices phasellus
        consectetur lorem. Class taciti montes pretium in gravida sapien
        vestibulum. Montes varius iaculis mi nulla nostra ex sagittis.
        Ullamcorper molestie molestie nibh sapien, sed per. Quam tellus ex cras
        varius, netus proin. Aeuismod fringilla dignissim aliquet leo viverra
        aliquam suspendisse. Molestie mattis habitant sagittis congue facilisis
        molestie. Metus taciti mauris ante rutrum fusce ad. Purus molestie
        torquent duis eleifend class mattis donec. Cras elit molestie blandit,
        nullam libero semper nulla. Et faucibus eu himenaeos pretium nullam;
        ullamcorper lacinia. Amet magna felis cursus et aptent velit placerat
        conubia. Nullam et amet per aptent ipsum duis euismod lobortis. Mi nibh
        nisi risus phasellus, cras nulla turpis sit. Eget nascetur ridiculus
        montes aliquet elit egestas ad. Velit aenean fermentum sociosqu quis a
        iaculis magnis pharetra non. Aliquet urna malesuada donec vehicula
        pharetra pulvinar rutrum torquent non. Venenatis id cubilia curae
        sollicitudin consequat. Varius class elementum volutpat; nam nisl nisi
        ultrices ut. Pretium nam eros diam torquent molestie mauris at. Non
        potenti potenti ipsum lectus platea, ornare erat facilisis. Rhoncus dis
        tristique ornare per sapien pulvinar erat sociosqu habitasse. Platea
        sodales est hendrerit orci in suspendisse. Mattis suspendisse sem enim
        curae conubia hac facilisis. Lobortis magna aliquam blandit; vehicula
        sed conubia feugiat. Cursus praesent lectus tristique eleifend integer
        conubia nulla imperdiet. Lacinia ligula dolor nullam viverra facilisi;
        phasellus hendrerit felis. Senectus cras dapibus vestibulum elit
        curabitur placerat. Convallis suspendisse risus varius tristique
        hendrerit parturient quis vitae aenean. Ad lacinia purus per primis
        donec pellentesque rhoncus. Mi libero augue lobortis facilisis eu sapien
        arcu. Ridiculus platea varius tincidunt metus facilisis facilisi sem.
        Magnis habitant turpis varius quam ipsum. Magna orci ipsum porttitor
        habitant mauris vitae ultrices pulvinar volutpat. Dis ad torquent rutrum
        netus maximus litora ligula pretium. Magnis eros tristique lectus etiam
        orci aliquam sed. Fames curae ligula platea platea; amet ridiculus.
        Vestibulum sem adipiscing habitasse sapien sit maecenas scelerisque.
        Maecenas maecenas volutpat efficitur duis et gravida? Sociosqu elementum
        molestie placerat justo auctor purus. Integer sociosqu platea venenatis
        mi mollis erat dignissim dictum. Cubilia nulla magnis duis faucibus ac
        convallis sed blandit. Nibh viverra aptent aliquam etiam duis quam
        ultrices primis mi. Lobortis massa mus ornare libero nam nisl est.
        Mollis sodales condimentum rutrum ridiculus lobortis, ad facilisis.
        Turpis vel sodales, fusce elit sagittis lectus. Nam rutrum consequat
        morbi iaculis proin id vestibulum? Erat laoreet nisi adipiscing, curae
        egestas magna. Donec sociosqu ut sit quis justo interdum habitant
        pharetra primis. Suspendisse tristique odio massa convallis gravida.
        Condimentum nibh ipsum iaculis dolor luctus fringilla eu. Finibus
        feugiat rutrum magnis posuere diam consectetur senectus justo. Conubia
        laoreet ultricies maecenas urna sodales? Aenean efficitur sem interdum
        vivamus semper malesuada fringilla. Id mus fames cursus laoreet praesent
        auctor luctus semper. Fringilla faucibus congue vivamus lectus nec
        viverra. Et lobortis blandit sollicitudin dapibus, nisi nibh suscipit.
        Ornare odio dapibus faucibus etiam mattis suspendisse ac; metus iaculis.
        Platea netus hendrerit eget nascetur quisque parturient. Aptent
        ridiculus penatibus ante; gravida ipsum magnis lacus. Phasellus
        adipiscing nascetur purus nostra hac dictumst ad natoque. Per sit massa
        fusce proin quisque eleifend pulvinar? Faucibus habitant non lacus; a
        porttitor leo nec. Orci fermentum volutpat tortor imperdiet vulputate
        lorem sed.
      </p> */}
      {/* <p>Login to share locations and save your favourite locations.</p> */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-around flex-wrap max-w-96 m-5"
      >
        <input
          name="googleLocation"
          type="text"
          value={inputState}
          onChange={handleChange}
          placeholder="search location"
          className="m-3 pl-2 min-w-7/12  rounded-md"
        />
        <button type="submit" className="button-submit">
          Search
        </button>
      </form>
      {showRes && (
        <>
          <h1>Search results:</h1>
          <ul className="flex flex-col items-center w-full">
            {locations.map((location, i) => (
              <li key={i} className="li-style search_result">
                <div className="flex justify-between items-center">
                  <div>
                    <h2>{location.displayName}</h2>
                    <p>{location.formattedAddress}</p>
                  </div>
                  {session?.user ? (
                    <button
                      className="button-submit w-72"
                      onClick={() => handleClick(i)}
                    >
                      Save Location
                    </button>
                  ) : (
                    <p>Sign in to save location</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {saveLocation && <SaveLocation location={locationProp} />}
    </>
  )
}

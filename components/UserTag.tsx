import { Dispatch, SetStateAction } from 'react'

interface Props {
  username: string
  setId: Dispatch<SetStateAction<string>>
}

export default function UserInfo({ username, setId }: Props) {
  return (
    <div>
      <p className="px-2">locations by</p>
      <p className="bg-white px-2 rounded-full">
        {username}
        <button onClick={() => setId('x')}>
          <span className="ml-1 border-2 px-2 rounded-full border-[rgb(169,111,228)] hover:opacity-50">
            x
          </span>
        </button>
      </p>
    </div>
  )
}

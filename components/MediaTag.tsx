import { Dispatch, SetStateAction } from 'react'

interface Props {
  tag: string
  setTag: Dispatch<SetStateAction<number>>
}
export default function MediaTag({ tag, setTag }: Props) {
  return (
    <p className="gradient rounded-full w-fit m-0 px-2">
      {tag}
      <button onClick={() => setTag(0)}>
        <span className="ml-1 border-2 px-2 rounded-full hover:opacity-50">
          x
        </span>
      </button>
    </p>
  )
}

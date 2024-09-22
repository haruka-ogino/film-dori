import { Dispatch, SetStateAction } from 'react'

interface Props {
  open: Dispatch<SetStateAction<boolean>>
}
export default function ErrorMessage({ open }: Props) {
  return (
    <div className="flex flex-col justify-around my-[10px] mx-[5px] px-[15px] min-h-56 text-center">
      <h1>Sorry, you are experiencing an error.</h1>
      <button
        className="button-submit button-cancel max-w-40 self-center"
        onClick={() => open(false)}
      >
        Close
      </button>
    </div>
  )
}

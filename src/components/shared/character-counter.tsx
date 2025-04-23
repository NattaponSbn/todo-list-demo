
type CharacterCounterProps = {
    text?: string;
    maxLength?: number;
    className?: string;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({text, maxLength = 0, className}: CharacterCounterProps) => {
  return (
    <>
        <span className={`text-slate-400 font-normal ${className}`}>{ text?.length }/{ maxLength.toLocaleString() }</span>
    </>
  )
}

export default CharacterCounter;
const TestoLungo = inputText => {
  const [text, setText] = useState(inputText)
  const [truncated, setTruncated] = useState(false)

  const showAll = () => {
    setText(inputText)
    setTruncated(false)
  }

  if (inputText.length > 1000) {
    setText(inputText.substring(0, 200) + "...")
    setTruncated(true)
  }

  return `${text}${
    truncated ? (
      <button className="btn btn-link" onClick={() => showAll()}>
        tutto
      </button>
    ) : null
  }`
}

export default TestoLungo

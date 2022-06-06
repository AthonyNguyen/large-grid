export default function Cell({
  content,
  header,
  id,
  start,
  end,
  setStart,
  setEnd,
  setSelecting,
  selecting,
  copyContent,
  setSelectedArray,
  selectedArray,
}: any) {
  const beginSelection = (i: any) => {
    setSelecting(true);
    setStart(i);
    updateSelection(i);
  };

  const endSelection = (i = end) => {
    setSelecting(false);
    updateSelection(i);
  };

  const updateSelection = (i: any) => {
    if (selecting) {
      if ((end <= id && id <= start) || (start <= id && id <= end)) {
        setSelectedArray(...[new Set([...selectedArray, content])]);
      }
      setEnd(i);
    }
  };

  return (
    <>
      {header ? (
        <td
          key={id}
          className={
            (end <= id && id <= start) || (start <= id && id <= end)
              ? "Cell Cell-header selected"
              : "Cell Cell-header"
          }
          onMouseDown={() => beginSelection(id)}
          onMouseUp={() => endSelection(id)}
          onMouseMove={() => updateSelection(id)}
        >
          <div>{content}</div>
        </td>
      ) : (
        <td
          key={id}
          className={
            (end <= id && id <= start) || (start <= id && id <= end)
              ? "Cell selected"
              : "Cell "
          }
          onMouseDown={() => beginSelection(id)}
          onMouseUp={() => endSelection(id)}
          onMouseMove={() => updateSelection(id)}
        >
          <div>{content}</div>
        </td>
      )}
    </>
  );
}

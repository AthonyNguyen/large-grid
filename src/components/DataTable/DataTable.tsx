import * as React from "react";
import Cell from "../Cell";
import "./DataTable.css";
import { useEffect, useState } from "react";

const DataTable = ({ headings, rows }: any) => {
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("0");
  const [selectedArray, setSelectedArray] = useState<any>([]);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    const selectedArray = document.getElementsByClassName("selected");
    const content: string[] = [];
    for (let i = 0; i < selectedArray.length; i++) {
      const item = selectedArray[i] as HTMLElement | null;
      content.push(`${item?.innerText}`);
    }
    if (content.length && content.length % rows[0].length !== 0) {
      let i = 1;
      do {
        content.splice(rows[0].length * i, 0, "\n");
        i++;
      } while (content.length % rows[0].length > i);
    }
    navigator.clipboard.writeText(Array.from(content).join("\t"));
  }, [end]);

  const copyContent = () => {
    return navigator.clipboard.writeText(selectedArray);
  };

  const renderHeadingRow = (_: any, cellIndex: number) => {
    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headings[cellIndex]}
        header={true}
      />
    );
  };

  const renderRow = (_row: any, rowIndex: number) => {
    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell: any, cellIndex: number) => {
          const id = `${rowIndex}-${cellIndex}`;
          return (
            <Cell
              id={id}
              content={rows[rowIndex][cellIndex]}
              start={start}
              end={end}
              setStart={setStart}
              setEnd={setEnd}
              setSelecting={setSelecting}
              selecting={selecting}
              copyContent={copyContent}
              setSelectedArray={setSelectedArray}
              selectedArray={selectedArray}
            />
          );
        })}
      </tr>
    );
  };

  const theadMarkup = <tr key="heading">{headings.map(renderHeadingRow)}</tr>;

  const tbodyMarkup = rows.map(renderRow);

  return (
    <table className="Table">
      <thead>{theadMarkup}</thead>
      <tbody>{tbodyMarkup}</tbody>
    </table>
  );
};
export default DataTable;

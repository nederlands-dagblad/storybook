import DataFrame, { DataFrameProps } from "./dataFrame.tsx";

export interface DataFramesProps {
    frames: DataFrameProps[]
}

export function DataFrames(props: DataFramesProps) {
    const { frames } = props

    return (
        <div className="dataframes">
            {frames.map((frame, index) => (
                <DataFrame
                    key={frame.title || index}
                    {...frame}
                />
            ))}
        </div>
    )
}

export default DataFrames;
type ResultsCountProps = {
  totalNumberOfResult: number;
};

export default function ResultsCount({
  totalNumberOfResult,
}: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResult}</span> results
    </p>
  );
}

export default function ResultsCount({ count }: { count: number }) {
  return (
    <p className="count">
      <span className="count__number u-bold">{count}</span> results
    </p>
  );
}

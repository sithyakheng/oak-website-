export default function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-6 text-sm">
      <span>{label}</span>
      <span className="flex gap-1.5" role="img" aria-label={`${value} / 5`}>
        {[1, 2, 3, 4, 5].map((n) => <span key={n} className={`h-2.5 w-2.5 rounded-full ${n <= value ? 'bg-black' : 'border border-black/40'}`} />)}
      </span>
    </div>
  );
}

interface StatusCircleProps {
  value: number;
  label: string;
  color: string;
}

export default function StatusCircle({
  value,
  label,
  color,
}: StatusCircleProps) {
  return (
    <div className="text-center">
      <div
        className="w-[74px] h-[74px] rounded-full grid place-items-center mx-auto"
        style={{
          background: `conic-gradient(${color} ${
            value * 3.6
          }deg, #d9d9d9 0deg)`,
        }}
      >
        <div className="w-[54px] h-[54px] rounded-full bg-[#f5f7ff] grid place-items-center text-base font-bold">
          {value}%
        </div>
      </div>

      <div className="mt-3 text-[11px] flex items-center justify-center gap-1">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        {label}
      </div>
    </div>
  );
}
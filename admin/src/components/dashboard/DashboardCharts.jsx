function normalizeSeries(series = []) {
  const max = Math.max(...series.map((point) => point.value), 1);
  return series.map((point) => ({ ...point, ratio: point.value / max }));
}

export function LineChart({ series = [], height = 220, stroke = "#6366f1", fill = "rgba(99,102,241,0.12)" }) {
  const data = normalizeSeries(series);
  if (data.length === 0) {
    return <div className="flex h-[220px] items-center justify-center text-sm text-slate-400">No data yet</div>;
  }

  const width = 640;
  const pad = 24;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const step = data.length > 1 ? innerW / (data.length - 1) : innerW;

  const points = data.map((point, index) => {
    const x = pad + index * step;
    const y = pad + innerH - point.ratio * innerH;
    return `${x},${y}`;
  });

  const areaPoints = `${points.join(" ")} ${pad + innerW},${pad + innerH} ${pad},${pad + innerH}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = pad + innerH - ratio * innerH;
        return <line key={ratio} x1={pad} y1={y} x2={width - pad} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
      })}
      <polygon points={areaPoints} fill="url(#lineFill)" />
      <polyline points={points.join(" ")} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BarChart({ series = [], height = 220, barColor = "#6366f1" }) {
  const data = normalizeSeries(series);
  if (data.length === 0) {
    return <div className="flex h-[220px] items-center justify-center text-sm text-slate-400">No data yet</div>;
  }

  const width = 640;
  const pad = 24;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const gap = 6;
  const barW = Math.max(8, (innerW - gap * (data.length - 1)) / data.length);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = pad + innerH - ratio * innerH;
        return <line key={ratio} x1={pad} y1={y} x2={width - pad} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
      })}
      {data.map((point, index) => {
        const barH = Math.max(4, point.ratio * innerH);
        const x = pad + index * (barW + gap);
        const y = pad + innerH - barH;
        return <rect key={point.label} x={x} y={y} width={barW} height={barH} rx="4" fill={barColor} opacity="0.9" />;
      })}
    </svg>
  );
}

export function DonutChart({ segments = [], size = 180 }) {
  const total = segments.reduce((sum, item) => sum + item.count, 0) || 1;
  let offset = 0;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <circle cx="18" cy="18" r={radius} fill="none" stroke="#eef2ff" strokeWidth="4" />
        {segments.map((segment) => {
          const dash = (segment.count / total) * circumference;
          const circle = (
            <circle
              key={segment.name}
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="4"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <strong className="text-2xl font-bold text-slate-900">{total}</strong>
        <span className="text-xs text-slate-500">Total</span>
      </div>
    </div>
  );
}

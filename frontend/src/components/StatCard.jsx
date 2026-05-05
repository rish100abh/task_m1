const StatCard = ({ label, value, subtext }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
    <p className="mt-1 text-sm text-slate-400">{subtext}</p>
  </div>
);

export default StatCard;

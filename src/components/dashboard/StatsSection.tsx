export default function StatsSection() {
  const stats = [
    {
      title: "Completed",
      value: "84%",
      color: "text-green-500",
    },
    {
      title: "In Progress",
      value: "46%",
      color: "text-blue-500",
    },
    {
      title: "To Do",
      value: "13%",
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {stat.title}
          </p>

          <h2 className={`mt-2 text-4xl font-bold ${stat.color}`}>
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
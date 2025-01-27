"use client";
import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "./CustomTooltip";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const router = useRouter();
  const data = [
    { label: "Open Issues", value: open, fill: "#efbd93" },
    { label: "In-progress Issues", value: inProgress, fill: "#7562c2" },
    { label: "Closed Issues", value: closed, fill: "#469974" },
  ];

  const handleClick = (data: any) => {
    const status =
      data.activeLabel.split(" ")[0].toUpperCase() === "IN-PROGRESS"
        ? "IN_PROGRESS"
        : data.activeLabel.split(" ")[0].toUpperCase();
    router.push(`/issues?&status=${status}`);
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={data} onClick={handleClick}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar barSize="80" dataKey="value" activeBar={<Rectangle stroke="black" />} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;

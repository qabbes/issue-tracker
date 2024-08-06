import { Card, Text } from "@radix-ui/themes";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <Text className="text-md font-medium"> {`${label} : ${payload[0].value}`}</Text>
      </Card>
    );
  }

  return null;
};

export default CustomTooltip;
